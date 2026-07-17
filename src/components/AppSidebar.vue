<template>
  <aside class="sidebar">

    <div class="sidebar-brand">
      <div>
        <div class="brand-name">DermAssist</div>
        <div class="brand-subtitle">Alat Diagnosis Klinis</div>
      </div>
    </div>

    <nav class="sidebar-nav">
      <RouterLink
        v-for="item in navItems"
        :key="item.name"
        :to="item.path"
        class="nav-item"
        :class="{ active: currentRoute === item.name }"
      >
        <span class="nav-icon" v-html="item.icon"></span>
        <span class="nav-label">{{ item.label }}</span>
      </RouterLink>
    </nav>

    <div class="sidebar-footer">
      <RouterLink to="/scan" class="btn-scan-new">
        + Start New Scan
      </RouterLink>
    </div>

  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

const route        = useRoute()
const routeGroupMap = {result: 'scan',}
const currentRoute = computed(() => routeGroupMap[route.name] || route.name)

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
  z-index: 100;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-xl);
  padding-bottom: var(--space-lg);
}

.brand-icon   { font-size: 24px; }

.brand-name {
  font-size: 28px;
  font-weight: 700;
  color: var(--color-primary);
  line-height: 1.2;
}

.brand-subtitle {
  font-size: 13px;
  color: var(--color-on-surface-variant);
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
  font-size: 18px;
  width: 20px;
  text-align: center;
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
</style>