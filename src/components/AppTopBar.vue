<template>
  <div class="topbar">
    <div class="topbar-left">
      <h2 class="topbar-title">{{ pageTitle }}</h2>
      <p class="topbar-subtitle">{{ pageSubtitle }}</p>
    </div>

    <div class="topbar-right">
      <div
        class="user-info"
        @click="toggleDropdown"
        ref="userInfoRef"
      >
        <div class="user-avatar">
          <img
            v-if="store.user.photo"
            :src="store.user.photo"
            :alt="store.user.name"
            class="user-avatar-img"
          />
          <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" stroke="white" stroke-width="2"/>
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
              stroke="white" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <span class="user-name">
          {{ store.user.name || 'Pengguna' }}
        </span>
        <svg
          class="user-chevron"
          :class="{ 'user-chevron--open': isOpen }"
          width="14" height="14" viewBox="0 0 24 24" fill="none"
        >
          <path d="M6 9l6 6 6-6"
            stroke="#424752" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>

      <!-- Dropdown -->
      <div v-if="isOpen" class="dropdown" ref="dropdownRef">
        <div class="dropdown-profile">
          <div class="dropdown-avatar">
            <img
              v-if="store.user.photo"
              :src="store.user.photo"
              :alt="store.user.name"
              class="dropdown-avatar-img"
            />
            <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" stroke="white" stroke-width="2"/>
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
                stroke="white" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="dropdown-user-info">
            <div class="dropdown-name">
              {{ store.user.name || 'Pengguna' }}
            </div>
            <div class="dropdown-email">
              {{ store.user.email || '-' }}
            </div>
          </div>
        </div>

        <div class="dropdown-divider"></div>

        <button class="dropdown-logout" @click="handleLogout">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              stroke="#ba1a1a" stroke-width="2" stroke-linecap="round"/>
          </svg>
          Keluar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSkinStore } from '@/stores/counter'

const route    = useRoute()
const router   = useRouter()
const store    = useSkinStore()
const isOpen   = ref(false)
const userInfoRef = ref(null)
const dropdownRef = ref(null)

const pageMeta = {
  dashboard: { title: 'Dashboard',              subtitle: 'Pantau kesehatan kulit Anda dengan presisi.' },
  scan     : { title: 'Analisis Kesehatan Kulit', subtitle: 'Unggah foto lesi kulit untuk deteksi awal.' },
  result   : { title: 'Hasil Analisis',           subtitle: 'Hasil deteksi AI terhadap gambar yang diunggah.' },
  history  : { title: 'Riwayat Scan',             subtitle: 'Daftar seluruh analisis yang pernah dilakukan.' },
  guide    : { title: 'Panduan Penggunaan',        subtitle: 'Panduan lengkap penggunaan sistem deteksi kulit berbasis AI.' },
  about    : { title: 'Tentang DermAssist',        subtitle: 'Informasi sistem dan cara kerja AI kami.' },
}

const pageTitle    = computed(() => pageMeta[route.name]?.title    || 'DermAssist')
const pageSubtitle = computed(() => pageMeta[route.name]?.subtitle || '')

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function handleLogout() {
  store.logout()
  router.push({ name: 'login' })
}

function handleClickOutside(event) {
  if (
    userInfoRef.value &&
    !userInfoRef.value.contains(event.target) &&
    dropdownRef.value &&
    !dropdownRef.value.contains(event.target)
  ) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-md) var(--space-lg);
  background-color: var(--color-surface-container-lowest);
  border-bottom: 1px solid var(--color-outline-variant);
  position: sticky;
  top: 0;
  z-index: 50;
}

.topbar-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-on-surface);
  line-height: 1.2;
}

.topbar-subtitle {
  font-size: 13px;
  color: var(--color-on-surface-variant);
  margin-top: 2px;
}

.topbar-right {
  position: relative;
}

.user-info {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  cursor: pointer;
  padding: 6px var(--space-sm);
  border-radius: var(--radius-full);
  transition: background-color 0.15s ease;
  user-select: none;
}

.user-info:hover {
  background-color: var(--color-surface-container);
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-full);
  background-color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
}

.user-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-on-surface);
}

.user-chevron {
  transition: transform 0.2s ease;
}

.user-chevron--open {
  transform: rotate(180deg);
}

/* Dropdown */
.dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 240px;
  background-color: var(--color-surface-container-lowest);
  border: 1px solid var(--color-outline-variant);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-level-2);
  z-index: 200;
  overflow: hidden;
}

.dropdown-profile {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-md);
}

.dropdown-avatar {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  background-color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
}

.dropdown-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.dropdown-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-on-surface);
}

.dropdown-email {
  font-size: 12px;
  color: var(--color-on-surface-variant);
  margin-top: 2px;
  word-break: break-all;
}

.dropdown-divider {
  height: 1px;
  background-color: var(--color-outline-variant);
}

.dropdown-logout {
  width: 100%;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-md);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-error);
  font-family: var(--font-family);
  transition: background-color 0.15s ease;
  text-align: left;
}

.dropdown-logout:hover {
  background-color: var(--color-error-container);
}

@media (max-width: 768px) {
  .topbar {
    display: none;
  }
}
</style>