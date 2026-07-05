<template>
  <header class="app-header">
    <nav class="header-tabs">
      <RouterLink
        v-for="tab in tabs"
        :key="tab.name"
        :to="tab.path"
        class="header-tab"
        :class="{ active: currentRoute === tab.name }"
      >
        {{ tab.label }}
      </RouterLink>
    </nav>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

const route        = useRoute()
const currentRoute = computed(() => route.name)

const tabs = [
  { name: 'dashboard', path: '/dashboard', label: 'Dashboard' },
  { name: 'scan',      path: '/scan',      label: 'Result' },
  { name: 'history',   path: '/history',   label: 'History' },
]
</script>

<style scoped>
.app-header {
  background-color: var(--color-surface-container-lowest);
  border-bottom: 1px solid var(--color-outline-variant);
  padding: 0 var(--space-lg);
  position: sticky;
  top: 0;
  z-index: 50;
}

.header-tabs {
  display: flex;
  gap: var(--space-lg);
}

.header-tab {
  display: inline-block;
  padding: var(--space-md) 0;
  text-decoration: none;
  color: var(--color-on-surface-variant);
  font-size: 14px;
  font-weight: 500;
  border-bottom: 2px solid transparent;
  transition: color 0.15s ease, border-color 0.15s ease;
}

.header-tab:hover { color: var(--color-on-surface); }

.header-tab.active {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
}
</style>