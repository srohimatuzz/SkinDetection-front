<template>
  <aside class="sidebar" :class="{ 'sidebar--open': isOpen }">

    <div class="sidebar-brand">
      <div>
        <div class="brand-name">DermAssist</div>
        <div class="brand-subtitle">Alat Diagnosis Klinis Awal</div>
      </div>
      <!-- Tombol tutup di mobile -->
      <button class="sidebar-close" @click="$emit('close')">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18M6 6l12 12"
            stroke="currentColor" stroke-width="2"
            stroke-linecap="round"/>
        </svg>
      </button>
    </div>

    <nav class="sidebar-nav">
      <RouterLink
        v-for="item in navItems"
        :key="item.name"
        :to="item.path"
        class="nav-item"
        :class="{ active: currentRoute === item.name }"
        @click="$emit('close')"
      >
        <span class="nav-icon" v-html="item.icon"></span>
        <span class="nav-label">{{ item.label }}</span>
      </RouterLink>
    </nav>

    <div class="sidebar-footer">
      <RouterLink to="/scan" class="btn-scan-new" @click="$emit('close')">
        Start New Scan
      </RouterLink>
    </div>

  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

defineProps({ isOpen: Boolean })
defineEmits(['close'])

const route        = useRoute()
const routeGroupMap = { result: 'scan' }
const currentRoute = computed(() =>
  routeGroupMap[route.name] || route.name
)

const navItems = [
  {
    name : 'dashboard',
    path : '/dashboard',
    label: 'Overview',
    icon : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>
      <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>
      <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>
      <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>
    </svg>`
  },
  {
    name : 'scan',
    path : '/scan',
    label: 'Scan Kulit',
    icon : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/>
      <path d="M20 20l-3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M11 8v6M8 11h6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  },
  {
    name : 'history',
    path : '/history',
    label: 'Riwayat Scan',
    icon : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
      <path d="M12 7v5l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  },
  {
    name : 'guide',
    path : '/guide',
    label: 'Panduan Aplikasi',
    icon : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" stroke="currentColor" stroke-width="2"/>
    </svg>`
  },
  {
    name : 'about',
    path : '/about',
    label: 'Tentang Aplikasi',
    icon : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
      <path d="M12 11v6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <circle cx="12" cy="8" r="0.5" fill="currentColor" stroke="currentColor" stroke-width="1.5"/>
    </svg>`
  },
]
</script>

<style scoped>
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  width: 220px;
  height: 100vh;
  background-color: var(--color-surface-container-lowest);
  border-right: 1px solid var(--color-outline-variant);
  display: flex;
  flex-direction: column;
  padding: var(--space-lg) var(--space-md);
  z-index: 160;
  transition: transform 0.3s ease;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-xl);
  padding-bottom: var(--space-lg);
  border-bottom: 1px solid var(--color-outline-variant);
}

.brand-name {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-primary);
}

.brand-subtitle {
  font-size: 11px;
  color: var(--color-on-surface-variant);
  margin-top: 2px;
}

.sidebar-close {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-on-surface-variant);
  padding: 4px;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  flex: 1;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-default);
  text-decoration: none;
  color: var(--color-on-surface-variant);
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.nav-item:hover {
  background-color: var(--color-surface-container);
  color: var(--color-on-surface);
}

.nav-item.active {
  background-color: var(--color-primary-container);
  color: var(--color-on-primary);
}

.nav-icon {
  display: flex;
  align-items: center;
  width: 20px;
  flex-shrink: 0;
}

.sidebar-footer {
  padding-top: var(--space-md);
  border-top: 1px solid var(--color-outline-variant);
}

.btn-scan-new {
  display: block;
  width: 100%;
  padding: var(--space-sm) var(--space-md);
  background-color: var(--color-primary);
  color: var(--color-on-primary);
  border-radius: var(--radius-default);
  text-align: center;
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  transition: opacity 0.2s ease;
}

.btn-scan-new:hover { opacity: 0.9; }

/* Mobile: sidebar jadi drawer */
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    width: 280px;
    box-shadow: var(--shadow-level-2);
  }

  .sidebar--open {
    transform: translateX(0);
  }

  .sidebar-close {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .sidebar-brand { display: none; } /* brand udah ada di mobile-topbar App.vue */
  .sidebar {
    top: 56px;
    height: calc(100vh - 56px);
    padding-top: var(--space-md);
  }
}
</style>