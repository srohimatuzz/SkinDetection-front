<template>
  <div id="app-wrapper">
    <template v-if="isAuthenticated">
      <AppSidebar />
      <div class="main-content">
        <AppTopBar />
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
import { ref, onMounted }       from 'vue'
import { useRoute, useRouter, RouterView } from 'vue-router'
import { supabase }             from '@/lib/supabase'
import { useSkinStore }         from '@/stores/counter'
import AppSidebar               from '@/components/AppSidebar.vue'
import AppTopBar                from '@/components/AppTopBar.vue'

const route    = useRoute()
const router   = useRouter()
const store    = useSkinStore()

const isAuthenticated = ref(false)

onMounted(async () => {
  // Cek session yang sudah ada
  const { data: { session } } = await supabase.auth.getSession()

  if (session?.user) {
    store.setUser(session.user)
    await store.loadHistory()
    isAuthenticated.value = true

    // Jika di halaman login, redirect ke dashboard
    if (route.name === 'login') {
      router.push({ name: 'dashboard' })
    }
  } else {
    isAuthenticated.value = false
    // Jika bukan di halaman login, redirect ke login
    if (route.name !== 'login') {
      router.push({ name: 'login' })
    }
  }

  // Listen perubahan auth state
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

<style>
#app-wrapper {
  width: 100%;
  min-height: 100vh;
  background-color: var(--color-background);
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin-left: 220px;
}

.page-content {
  flex: 1;
  padding: var(--space-lg);
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}
</style>