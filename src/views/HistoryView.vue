<template>
  <div class="history-page">

    <div class="history-top">
      <div class="history-summary">
        <div class="summary-stat">
          <div class="summary-stat-value">{{ store.totalScans }}</div>
          <div class="summary-stat-label">Total Analisis</div>
        </div>
        <div class="summary-stat">
          <div class="summary-stat-value">
            {{ eczemaCount }}
          </div>
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

    <!-- Search bar -->
    <div class="search-bar">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="8" stroke="#727783" stroke-width="2"/>
        <path d="M21 21l-4.35-4.35" stroke="#727783" stroke-width="2" stroke-linecap="round"/>
      </svg>
      <input
        v-model="searchQuery"
        type="text"
        class="search-input"
        placeholder="Cari riwayat..."
      />
    </div>

    <!-- Kosong -->
    <div v-if="filteredHistory.length === 0" class="empty-state">
      <div class="empty-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke="#c2c6d4" stroke-width="1.5" stroke-linecap="round"/>
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
        @click="viewDetail(item)"
      >
        <!-- Thumbnail gambar dari scan -->
        <div class="history-thumb">
          <img
            v-if="item.image_base64"
            :src="`data:image/png;base64,${item.image_base64}`"
            :alt="`Scan ${item.nama_penyakit}`"
            class="history-thumb-img"
          />
          <div v-else class="history-thumb-placeholder">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="#c2c6d4" stroke-width="1.5"/>
              <circle cx="8.5" cy="8.5" r="1.5" stroke="#c2c6d4" stroke-width="1.5"/>
              <path d="M21 15l-5-5L5 21" stroke="#c2c6d4" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </div>
        </div>

        <div class="history-info">
          <div class="history-condition">
            Deteksi {{ item.nama_penyakit }}
          </div>
          <div class="history-meta">
            <span class="history-date">{{ item.date }}</span>
          </div>
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
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="#727783" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useSkinStore } from '@/stores/counter'

const store       = useSkinStore()
const router      = useRouter()
const searchQuery = ref('')

const filteredHistory = computed(() => {
  const list = [...store.analysisHistory].reverse()
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
  // Navigasi kembali ke result jika ada data
  if (store.analysisResult) {
    router.push({ name: 'result' })
  }
}
</script>

<style scoped>
.history-page {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

/* Summary stats */
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

/* Search */
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

.search-input::placeholder {
  color: var(--color-outline);
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

.empty-icon {
  opacity: 0.4;
}

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
  gap: var(--space-md);
}

.history-item {
  background-color: var(--color-surface-container-lowest);
  border-radius: var(--radius-lg);
  padding: var(--space-lg) var(--space-lg);
  display: flex;
  align-items: center;
  gap: var(--space-md);
  cursor: pointer;
  transition: background-color 0.15s ease;
  border: 1px solid var(--color-outline-variant);
}

.history-item:hover {
  background-color: var(--color-surface-container-low);
}

/* Thumbnail */
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
}

.history-condition {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-on-surface);
}

.history-date {
  font-size: 12px;
  color: var(--color-on-surface-variant);
  margin-top: 4px;
  display: block;
}

.history-item-right {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.history-badge {
  font-size: 12px;
  font-weight: 600;
  padding: 4px var(--space-sm);
  border-radius: var(--radius-full);
}

.history-badge--eczema {
  background-color: var(--color-secondary-container);
  color: var(--color-on-secondary-container);
}

.history-badge--psoriasis {
  background-color: var(--color-surface-container-high);
  color: var(--color-primary);
}
</style>