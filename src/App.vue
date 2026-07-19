<template>
  <div id="app-wrapper">
    <template v-if="isAuthenticated">

      <!-- Mobile: Topbar + Hamburger -->
      <div class="mobile-topbar">
        <RouterLink to="/dashboard" class="mobile-brand">
          DermAssist
        </RouterLink>
        <button class="hamburger" @click="mobileMenuOpen = !mobileMenuOpen">
          <svg v-if="!mobileMenuOpen" width="24" height="24"
            viewBox="0 0 24 24" fill="none">
            <path d="M3 12h18M3 6h18M3 18h18"
              stroke="currentColor" stroke-width="2"
              stroke-linecap="round"/>
          </svg>
          <svg v-else width="24" height="24"
            viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12"
              stroke="currentColor" stroke-width="2"
              stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <!-- Mobile: Overlay menu -->
      <div
        v-if="mobileMenuOpen"
        class="mobile-overlay"
        @click="mobileMenuOpen = false"
      ></div>

      <!-- Sidebar (desktop fixed, mobile drawer) -->
      <AppSidebar
        :isOpen="mobileMenuOpen"
        @close="mobileMenuOpen = false"
      />

      <div class="main-content">
        <AppTopBar class="desktop-topbar" />
        <div class="page-content">
          <RouterView />
        </div>
      </div>

    </template>
    <template v-else>
      <RouterView />
    </template>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter, RouterView } from 'vue-router'
import { supabase }     from '@/lib/supabase'
import { useSkinStore } from '@/stores/counter'
import AppSidebar from '@/components/AppSidebar.vue'
import AppTopBar  from '@/components/AppTopBar.vue'

const route   = useRoute()
const router  = useRouter()
const store   = useSkinStore()

const isAuthenticated = ref(false)
const mobileMenuOpen  = ref(false)

// Tutup menu saat navigasi
watch(() => route.path, () => {
  mobileMenuOpen.value = false
})

onMounted(async () => {
  const { data: { session } } = await supabase.auth.getSession()
  if (session?.user) {
    store.setUser(session.user)
    await store.loadHistory()
    isAuthenticated.value = true
    if (route.name === 'login') router.push({ name: 'dashboard' })
  } else {
    isAuthenticated.value = false
    if (route.name !== 'login') router.push({ name: 'login' })
  }

  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' && session?.user) {
      store.setUser(session.user)
      await store.loadHistory()
      isAuthenticated.value = true
      router.push({ name: 'dashboard' })
    }
    if (event === 'SIGNED_OUT') {
      isAuthenticated.value = false
      router.push({ name: 'login' })
    }
  })
})
</script>

<script>
import { onMounted } from 'vue'
</script>

<style>
* { box-sizing: border-box; }

html, body, #app-wrapper {
  overflow-x: hidden;
}

#app-wrapper {
  width: 100%;
  min-height: 100vh;
  background-color: var(--color-background);
}

/* Desktop: sidebar visible, topbar visible */
.mobile-topbar  { display: none; }
.desktop-topbar { display: flex; }

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin-left: 220px;
  transition: margin-left 0.3s ease;
}

.page-content {
  flex: 1;
  padding: var(--space-lg);
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

.mobile-overlay { display: none; }

/* Tablet */
@media (max-width: 1024px) {
  .page-content {
    padding: var(--space-md);
  }
}

/* Mobile */
@media (max-width: 768px) {
  .mobile-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-md);
    background-color: var(--color-surface-container-lowest);
    border-bottom: 1px solid var(--color-outline-variant);
    position: sticky;
    top: 0;
    z-index: 200;
    height: 56px;
  }

  .mobile-brand {
    font-size: 20px;
    font-weight: 700;
    color: var(--color-primary);
    text-decoration: none;
  }

  .hamburger {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--color-on-surface);
    padding: var(--space-xs);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .desktop-topbar { display: none; }

  .main-content {
    margin-left: 0;
  }

  .page-content {
    padding: var(--space-md) var(--space-sm);
  }

  /* Sidebar jadi drawer di mobile */
  .mobile-overlay {
    display: block;
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 150;
  }
}
</style>