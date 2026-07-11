import { defineStore }  from 'pinia'
import { supabase }     from '@/lib/supabase'

export const useSkinStore = defineStore('skin', {
  state: () => ({
    analysisResult  : null,
    analysisHistory : [],
    isLoading       : false,
    error           : null,
    user: {
      id    : null,
      name  : '',
      email : '',
      photo : null,
      persist: {
        key    : 'dermassist-store',
        storage: localStorage,
        paths  : ['analysisHistory', 'user'],
        // Jangan persist analysisResult karena data base64
        // terlalu besar untuk localStorage
      }
    }
  }),

  getters: {
    lastScan: (state) => {
      if (state.analysisHistory.length === 0) return null
      return state.analysisHistory[0]
    },

    weeklyChartData: (state) => {
      const now   = new Date()
      const weeks = [0, 0, 0, 0]

      state.analysisHistory.forEach(item => {
        const date     = new Date(item.created_at || item.timestamp)
        const diffDays = Math.floor(
          (now - date) / (1000 * 60 * 60 * 24)
        )
        if      (diffDays <= 7)  weeks[3]++
        else if (diffDays <= 14) weeks[2]++
        else if (diffDays <= 21) weeks[1]++
        else if (diffDays <= 30) weeks[0]++
      })

      const maxVal = Math.max(...weeks, 1)

      return [
        { label: 'WEEK 1', value: Math.round((weeks[0] / maxVal) * 100), count: weeks[0] },
        { label: 'WEEK 2', value: Math.round((weeks[1] / maxVal) * 100), count: weeks[1] },
        { label: 'WEEK 3', value: Math.round((weeks[2] / maxVal) * 100), count: weeks[2] },
        { label: 'WEEK 4', value: Math.round((weeks[3] / maxVal) * 100), count: weeks[3] },
      ]
    },

    totalScans: (state) => state.analysisHistory.length,
  },

  actions: {
    

    // ── Auth ─────────────────────────────────────
    setUser(userData) {
      this.user = {
        id    : userData.id    || null,
        name  : userData.user_metadata?.full_name
                || userData.user_metadata?.name
                || userData.email?.split('@')[0]
                || 'Pengguna',
        email : userData.email || '',
        photo : userData.user_metadata?.avatar_url || null,
      }
    },

    async logout() {
      await supabase.auth.signOut()
      this.analysisResult  = null
      this.analysisHistory = []
      this.user = { id: null, name: '', email: '', photo: null }
    },

    // ── Scan Result ───────────────────────────────
    async setResult(result) {
      this.analysisResult = result

      const historyItem = {
        id              : Date.now(),
        timestamp       : new Date().toISOString(),
        created_at      : new Date().toISOString(),
        date            : new Date().toLocaleDateString('id-ID', {
          day: 'numeric', month: 'long', year: 'numeric'
        }),
        nama_penyakit   : result.classification.nama_penyakit,
        predicted_class : result.classification.predicted_class,
        confidence      : result.classification.confidence,
        lokasi          : 'Tidak diketahui',
        image_base64    : result.images?.original || null,
      }

      // Tambahkan di DEPAN array agar konsisten dengan order Supabase
      this.analysisHistory.unshift(historyItem)

      // Simpan ke Supabase jika user sudah login
      if (this.user.id) {
        try {
          const { error } = await supabase
            .from('scan_history')
            .insert({
              user_id         : this.user.id,
              nama_penyakit   : result.classification.nama_penyakit,
              predicted_class : result.classification.predicted_class,
              confidence      : result.classification.confidence,
              lokasi          : 'Tidak diketahui',
              image_base64    : result.images?.original || null,
              reasoning       : result.reasoning       || null,
              heatmap_analysis: result.heatmap_analysis || null,
            })

          if (error) console.error('Supabase insert error:', error)
        } catch (err) {
          console.error('Gagal simpan ke Supabase:', err)
        }
      }
    },

    // ── Load riwayat dari Supabase ────────────────
    async loadHistory() {
      if (!this.user.id) return

      try {
        const { data, error } = await supabase
          .from('scan_history')
          .select('*')
          .eq('user_id', this.user.id)
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Supabase load error:', error)
          return
        }

        this.analysisHistory = data.map(item => ({
          ...item,
          date: new Date(item.created_at).toLocaleDateString('id-ID', {
            day: 'numeric', month: 'long', year: 'numeric'
          }),
          timestamp: item.created_at,
        }))
      } catch (err) {
        console.error('Gagal load history:', err)
      }
    },

    clearResult() {
      this.analysisResult = null
    },

    deleteHistory(itemId) {
      this.analysisHistory = this.analysisHistory.filter(
        item => item.id !== itemId
      )
      // Jika result yang sedang ditampilkan adalah item yang dihapus
      if (this.analysisResult?._historyId === itemId) {
        this.analysisResult = null
      }
    },
  }
})