v<template>
  <div class="history-page">

    <div class="history-top">
      <div class="history-summary">
        <div class="summary-stat">
          <div class="summary-stat-value">
            {{ store.totalScans }}
          </div>
          <div class="summary-stat-label">Total Analisis</div>
        </div>
        <div class="summary-stat">
          <div class="summary-stat-value">{{ eczemaCount }}</div>
          <div class="summary-stat-label">Eczema</div>
        </div>
        <div class="summary-stat">
          <div class="summary-stat-value">
            {{ psoriasisCount }}
          </div>
          <div class="summary-stat-label">Psoriasis</div>
        </div>
      </div>
    </div>

    <div class="search-bar">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="8"
          stroke="#727783" stroke-width="2"/>
        <path d="M21 21l-4.35-4.35"
          stroke="#727783" stroke-width="2"
          stroke-linecap="round"/>
      </svg>
      <input
        v-model="searchQuery"
        type="text"
        class="search-input"
        placeholder="Cari riwayat..."
      />
    </div>

    <!-- Modal: Detail tidak tersedia -->
    <Teleport to="body">
      <div
        v-if="showDetailModal"
        class="modal-overlay"
        @click.self="showDetailModal = false"
      >
        <div class="modal-card">
          <div class="modal-icon">ℹ️</div>
          <div class="modal-title">Detail Tidak Tersedia</div>
          <div class="modal-desc">
            Detail lengkap seperti visualisasi Grad-CAM
            dan penjelasan sistem hanya tersedia untuk
            scan terakhir dalam sesi ini.
          </div>
          <div class="modal-hint">
            Lakukan scan ulang dengan gambar yang sama
            untuk melihat detail analisis lengkap.
          </div>
          <div class="modal-actions">
            <button
              class="btn-modal-cancel"
              @click="showDetailModal = false"
            >
              Tutup
            </button>
            <RouterLink
              to="/scan"
              class="btn-modal-primary"
              @click="showDetailModal = false"
            >
              Ke Scan Kulit
            </RouterLink>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Modal: Konfirmasi hapus -->
    <Teleport to="body">
      <div
        v-if="deleteTarget"
        class="modal-overlay"
        @click.self="deleteTarget = null"
      >
        <div class="modal-card">
          <div class="modal-icon">🗑️</div>
          <div class="modal-title">Hapus Riwayat?</div>
          <div class="modal-desc">
            Riwayat
            <strong>{{ deleteTarget.nama_penyakit }}</strong>
            pada {{ deleteTarget.date }} akan dihapus
            secara permanen dan tidak dapat dikembalikan.
          </div>
          <div class="modal-actions">
            <button
              class="btn-modal-cancel"
              @click="deleteTarget = null"
              :disabled="isDeleting"
            >
              Batal
            </button>
            <button
              class="btn-modal-danger"
              @click="confirmDelete"
              :disabled="isDeleting"
            >
              {{ isDeleting ? 'Menghapus...' : 'Hapus' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Empty state -->
    <div
      v-if="filteredHistory.length === 0"
      class="empty-state"
    >
      <div class="empty-icon">
        <svg width="48" height="48"
          viewBox="0 0 24 24" fill="none">
          <path
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"
            stroke="#c2c6d4" stroke-width="1.5"
            stroke-linecap="round"/>
          <rect x="9" y="3" width="6" height="4" rx="1"
            stroke="#c2c6d4" stroke-width="1.5"/>
        </svg>
      </div>
      <p class="empty-title">Belum ada riwayat analisis</p>
      <p class="empty-desc">
        Mulai analisis gambar lesi kulit untuk melihat
        hasilnya di sini.
      </p>
      <RouterLink to="/scan" class="btn-primary">
        Mulai Analisis
      </RouterLink>
    </div>

    <!-- Daftar riwayat -->
    <div v-else class="history-list">
      <div
        v-for="item in filteredHistory"
        :key="item.id"
        class="history-item"
      >
        <div
          class="history-item-main"
          @click="viewDetail(item)"
        >
          <div class="history-thumb">
            <img
              v-if="item.image_base64"
              :src="`data:image/png;base64,${item.image_base64}`"
              :alt="`Scan ${item.nama_penyakit}`"
              class="history-thumb-img"
            />
            <div v-else class="history-thumb-placeholder">
              <svg width="24" height="24"
                viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18"
                  rx="2" stroke="#c2c6d4" stroke-width="1.5"/>
                <circle cx="8.5" cy="8.5" r="1.5"
                  stroke="#c2c6d4" stroke-width="1.5"/>
                <path d="M21 15l-5-5L5 21"
                  stroke="#c2c6d4" stroke-width="1.5"
                  stroke-linecap="round"/>
              </svg>
            </div>
          </div>

          <div class="history-info">
            <div class="history-condition">
              Deteksi {{ item.nama_penyakit }}
            </div>
            <div class="history-date">{{ item.date }}</div>
          </div>

          <div class="history-item-right">
            <span
              class="history-badge"
              :class="item.predicted_class === 'eczema'
                ? 'history-badge--eczema'
                : 'history-badge--psoriasis'"
            >
              {{ (item.confidence * 100).toFixed(0) }}%
            </span>
            <svg width="16" height="16"
              viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6"
                stroke="#727783" stroke-width="2"
                stroke-linecap="round"/>
            </svg>
          </div>
        </div>

        <button
          class="btn-delete"
          @click.stop="askDelete(item)"
          title="Hapus riwayat ini"
        >
          <svg width="16" height="16"
            viewBox="0 0 24 24" fill="none">
            <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"
              stroke="currentColor" stroke-width="2"
              stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed }          from 'vue'
import { RouterLink, useRouter }  from 'vue-router'
import { useSkinStore }           from '@/stores/counter'
import { supabase }               from '@/lib/supabase'

const store           = useSkinStore()
const router          = useRouter()
const searchQuery     = ref('')
const deleteTarget    = ref(null)
const isDeleting      = ref(false)
const showDetailModal = ref(false)   // ← INI YANG KURANG

const filteredHistory = computed(() => {
  const list = [...store.analysisHistory]
  if (!searchQuery.value) return list
  return list.filter(item =>
    item.nama_penyakit?.toLowerCase()
      .includes(searchQuery.value.toLowerCase())
  )
})

const eczemaCount = computed(() =>
  store.analysisHistory.filter(
    i => i.predicted_class === 'eczema'
  ).length
)

const psoriasisCount = computed(() =>
  store.analysisHistory.filter(
    i => i.predicted_class === 'psoriasis'
  ).length
)

function viewDetail(item) {
  // Coba load full_result dari item history
  const success = store.setResultFromHistory(item)

  if (success) {
    router.push({ name: 'result' })
  } else {
    showDetailModal.value = true
  }
}

function askDelete(item) {
  deleteTarget.value = item
}

async function confirmDelete() {
  if (!deleteTarget.value) return
  isDeleting.value = true

  try {
    const itemId = deleteTarget.value.id

    if (store.user.id) {
      const { error } = await supabase
        .from('scan_history')
        .delete()
        .eq('id', itemId)
        .eq('user_id', store.user.id)

      if (error) {
        console.error('Gagal hapus dari Supabase:', error)
      }
    }

    store.deleteHistory(itemId)
    deleteTarget.value = null

  } catch (err) {
    console.error('Error saat hapus:', err)
  } finally {
    isDeleting.value = false
  }
}
</script>

<style scoped>
.history-page {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.history-top {
  background-color: var(--color-surface-container-lowest);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-level-1);
  padding: var(--space-lg);
}

.history-summary {
  display: flex;
  gap: var(--space-xl);
}

.summary-stat-value {
  font-size: 28px;
  font-weight: 700;
  color: var(--color-primary);
}

.summary-stat-label {
  font-size: 13px;
  color: var(--color-on-surface-variant);
  margin-top: 2px;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  background-color: var(--color-surface-container-lowest);
  border: 1px solid var(--color-outline-variant);
  border-radius: var(--radius-default);
  padding: var(--space-sm) var(--space-md);
}

.search-input {
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  color: var(--color-on-surface);
  font-family: var(--font-family);
  width: 100%;
}

.search-input::placeholder { color: var(--color-outline); }

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-card {
  background-color: white;
  border-radius: var(--radius-xl);
  padding: var(--space-xl);
  width: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
  box-shadow: var(--shadow-level-2);
  text-align: center;
}

.modal-icon  { font-size: 36px; }

.modal-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-on-surface);
}

.modal-desc {
  font-size: 14px;
  color: var(--color-on-surface-variant);
  line-height: 1.6;
}

.modal-hint {
  font-size: 13px;
  color: var(--color-primary);
  background-color: var(--color-surface-container-low);
  border-radius: var(--radius-default);
  padding: var(--space-sm) var(--space-md);
  line-height: 1.5;
  width: 100%;
}

.modal-actions {
  display: flex;
  gap: var(--space-md);
  width: 100%;
}

.btn-modal-cancel {
  flex: 1;
  padding: var(--space-sm);
  border: 1px solid var(--color-outline-variant);
  border-radius: var(--radius-default);
  background: none;
  cursor: pointer;
  font-size: 14px;
  font-family: var(--font-family);
  color: var(--color-on-surface);
  transition: background-color 0.15s ease;
}

.btn-modal-cancel:hover {
  background-color: var(--color-surface-container);
}

.btn-modal-cancel:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-modal-primary {
  flex: 1;
  padding: var(--space-sm);
  border: none;
  border-radius: var(--radius-default);
  background-color: var(--color-primary);
  color: white;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  font-family: var(--font-family);
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.15s ease;
}

.btn-modal-primary:hover { opacity: 0.9; }

.btn-modal-danger {
  flex: 1;
  padding: var(--space-sm);
  border: none;
  border-radius: var(--radius-default);
  background-color: var(--color-error);
  color: white;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  font-family: var(--font-family);
  transition: opacity 0.15s ease;
}

.btn-modal-danger:hover    { opacity: 0.9; }
.btn-modal-danger:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Empty state */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-xl);
  text-align: center;
}

.empty-icon   { opacity: 0.4; }

.empty-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-on-surface);
}

.empty-desc {
  font-size: 14px;
  color: var(--color-on-surface-variant);
  max-width: 320px;
  line-height: 1.6;
}

/* History list */
.history-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.history-item {
  background-color: var(--color-surface-container-lowest);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-level-1);
  border: 1px solid var(--color-outline-variant);
  display: flex;
  align-items: stretch;
  transition: background-color 0.15s ease;
}

.history-item:hover {
  background-color: var(--color-surface-container-low);
}

.history-item-main {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-md) var(--space-lg);
  flex: 1;
  cursor: pointer;
  min-width: 0;
}

.history-thumb {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-default);
  overflow: hidden;
  flex-shrink: 0;
  background-color: var(--color-surface-container);
  display: flex;
  align-items: center;
  justify-content: center;
}

.history-thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.history-thumb-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.history-info {
  flex: 1;
  min-width: 0;
}

.history-condition {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-on-surface);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.history-date {
  font-size: 12px;
  color: var(--color-on-surface-variant);
  margin-top: 4px;
}

.history-item-right {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  flex-shrink: 0;
}

.history-badge {
  font-size: 12px;
  font-weight: 600;
  padding: 4px var(--space-sm);
  border-radius: var(--radius-full);
  white-space: nowrap;
}

.history-badge--eczema {
  background-color: var(--color-secondary-container);
  color: var(--color-on-secondary-container);
}

.history-badge--psoriasis {
  background-color: var(--color-surface-container-high);
  color: var(--color-primary);
}

.btn-delete {
  padding: 0 var(--space-md);
  border: none;
  border-left: 1px solid var(--color-outline-variant);
  background: none;
  cursor: pointer;
  color: var(--color-outline);
  border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
  transition: background-color 0.15s ease, color 0.15s ease;
  display: flex;
  align-items: center;
  min-height: 100%;
}

.btn-delete:hover {
  background-color: var(--color-error-container);
  color: var(--color-error);
}
</style>