import { defineStore } from 'pinia'
import { supabase }    from '@/lib/supabase'

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

    // ── Simpan hasil analisis ─────────────────────────────
    async setResult(result) {
      const historyId = crypto.randomUUID()
      this.analysisResult = {
        ...result,
        _historyId: historyId
      }

      const newItem = {
        id              : historyId,
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
        full_result     : result,

        // URL gambar dari Storage (diisi setelah upload)
        image_url_original : null,
        image_url_heatmap  : null,
        image_url_overlay  : null,
      }

      this.analysisHistory.unshift(newItem)

      // Simpan ke Supabase
      if (this.user.id) {
        try {
          // 1. Upload gambar ke Storage dulu
          const { uploadImageToStorage } =
            await import('@/lib/storage.js')

          const [urlOriginal, urlHeatmap, urlOverlay] =
            await Promise.all([
              uploadImageToStorage(
                result.images?.original,
                this.user.id, historyId, 'original'
              ),
              uploadImageToStorage(
                result.images?.heatmap,
                this.user.id, historyId, 'heatmap'
              ),
              uploadImageToStorage(
                result.images?.overlay,
                this.user.id, historyId, 'overlay'
              ),
            ])

          // 2. Update URL di item lokal
          const idx = this.analysisHistory
            .findIndex(i => i.id === historyId)
          if (idx !== -1) {
            this.analysisHistory[idx].image_url_original = urlOriginal
            this.analysisHistory[idx].image_url_heatmap  = urlHeatmap
            this.analysisHistory[idx].image_url_overlay  = urlOverlay
          }

          // 3. Insert ke database dengan URL
          const { error } = await supabase
            .from('scan_history')
            .insert({
              id                 : historyId,
              user_id            : this.user.id,
              nama_penyakit      : result.classification.nama_penyakit,
              predicted_class    : result.classification.predicted_class,
              confidence         : result.classification.confidence,
              lokasi             : 'Tidak diketahui',
              image_base64       : result.images?.original || null,
              reasoning          : result.reasoning        || null,
              heatmap_analysis   : result.heatmap_analysis || null,
              images             : {
                original : urlOriginal,
                heatmap  : urlHeatmap,
                overlay  : urlOverlay,
              },
            })

          if (error) console.error('Supabase insert error:', error)

        } catch (err) {
          console.error('Gagal simpan ke Supabase:', err)
        }
      }
    },

    // ── Load riwayat dari Supabase ───────────────────────
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
          date: new Date(item.created_at).toLocaleDateString(
            'id-ID', {
              day: 'numeric', month: 'long', year: 'numeric'
            }
          ),
          timestamp   : item.created_at,
          // Rekonstruksi full_result dari data Supabase
          full_result: {
            classification: {
              predicted_class  : item.predicted_class,
              nama_penyakit    : item.nama_penyakit,
              confidence       : item.confidence,
              confidence_label : this.getConfidenceLabel(item.confidence),
              all_probabilities: {
                eczema   : item.predicted_class === 'eczema'
                          ? item.confidence : 1 - item.confidence,
                psoriasis: item.predicted_class === 'psoriasis'
                          ? item.confidence : 1 - item.confidence,
              },
            },
            reasoning       : item.reasoning        || {},
            heatmap_analysis: item.heatmap_analysis || {},
            ood             : {
              detected: false, level: null,
              pesan: '', saran: ''
            },
            // Pakai URL dari Storage, bukan base64
            images: {
              original : item.images?.original || null,
              heatmap  : item.images?.heatmap  || null,
              overlay  : item.images?.overlay  || null,
            },
          }
        }))

      } catch (err) {
        console.error('Gagal load history:', err)
      }
    },

    // ── Helper confidence label ───────────────────────────
    getConfidenceLabel(confidence) {
      if (confidence >= 0.90) return 'Sangat Tinggi'
      if (confidence >= 0.75) return 'Tinggi'
      if (confidence >= 0.60) return 'Sedang'
      return 'Rendah'
    },

    // ── Set result dari history item ─────────────────────
    setResultFromHistory(item) {
      if (!item.full_result) return false
      this.analysisResult = {
        ...item.full_result,
        _historyId: item.id
      }
      return true
    },

    // ── Hapus riwayat ────────────────────────────────────
    deleteHistory(itemId) {
      this.analysisHistory = this.analysisHistory.filter(
        item => item.id !== itemId
      )
      if (this.analysisResult?._historyId === itemId) {
        this.analysisResult = null
      }
    },

    clearResult() {
      this.analysisResult = null
    },
  },

  persist: {
    key    : 'dermassist-store',
    storage: localStorage,
    paths  : ['user'],
    // Tidak persist analysisHistory karena sudah di Supabase
    // Tidak persist analysisResult karena data base64 terlalu besar
  },
})