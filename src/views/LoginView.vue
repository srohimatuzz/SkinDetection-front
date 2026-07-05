<template>
  <div class="login-page">

    <!-- Background pattern kiri -->
    <div class="bg-pattern bg-pattern--left">
      <svg viewBox="0 0 700 900" xmlns="http://www.w3.org/2000/svg">
        <circle cx="80" cy="100" r="11" fill="#93C5FD" opacity="0.6"/>
        <circle cx="200" cy="60" r="11" fill="#93C5FD" opacity="0.6"/>
        <circle cx="320" cy="140" r="11" fill="#93C5FD" opacity="0.6"/>
        <circle cx="60" cy="240" r="11" fill="#93C5FD" opacity="0.6"/>
        <circle cx="180" cy="300" r="11" fill="#93C5FD" opacity="0.6"/>
        <circle cx="300" cy="260" r="11" fill="#93C5FD" opacity="0.6"/>
        <circle cx="120" cy="400" r="11" fill="#93C5FD" opacity="0.6"/>
        <circle cx="260" cy="460" r="11" fill="#93C5FD" opacity="0.6"/>
        <circle cx="40" cy="520" r="11" fill="#93C5FD" opacity="0.6"/>
        <circle cx="340" cy="500" r="11" fill="#93C5FD" opacity="0.6"/>
        <line x1="80" y1="100" x2="200" y2="60" stroke="#93C5FD" stroke-width="2" opacity="0.3"/>
        <line x1="200" y1="60" x2="320" y2="140" stroke="#93C5FD" stroke-width="2" opacity="0.3"/>
        <line x1="80" y1="100" x2="60" y2="240" stroke="#93C5FD" stroke-width="2" opacity="0.3"/>
        <line x1="200" y1="60" x2="180" y2="300" stroke="#93C5FD" stroke-width="2" opacity="0.3"/>
        <line x1="320" y1="140" x2="300" y2="260" stroke="#93C5FD" stroke-width="2" opacity="0.3"/>
        <line x1="60" y1="240" x2="180" y2="300" stroke="#93C5FD" stroke-width="2" opacity="0.3"/>
        <line x1="180" y1="300" x2="300" y2="260" stroke="#93C5FD" stroke-width="2" opacity="0.3"/>
        <line x1="60" y1="240" x2="120" y2="400" stroke="#93C5FD" stroke-width="2" opacity="0.3"/>
        <line x1="180" y1="300" x2="260" y2="460" stroke="#93C5FD" stroke-width="2" opacity="0.3"/>
        <line x1="300" y1="260" x2="340" y2="500" stroke="#93C5FD" stroke-width="2" opacity="0.3"/>
        <line x1="120" y1="400" x2="260" y2="460" stroke="#93C5FD" stroke-width="2" opacity="0.3"/>
        <line x1="260" y1="460" x2="40" y2="520" stroke="#93C5FD" stroke-width="2" opacity="0.3"/>
        <line x1="260" y1="460" x2="340" y2="500" stroke="#93C5FD" stroke-width="2" opacity="0.3"/>
      </svg>
    </div>

    <!-- Background pattern kanan -->
    <div class="bg-pattern bg-pattern--right">
      <svg viewBox="0 0 700 900" xmlns="http://www.w3.org/2000/svg">
        <circle cx="80" cy="100" r="11" fill="#93C5FD" opacity="0.6"/>
        <circle cx="200" cy="60" r="11" fill="#93C5FD" opacity="0.6"/>
        <circle cx="320" cy="140" r="11" fill="#93C5FD" opacity="0.6"/>
        <circle cx="60" cy="240" r="11" fill="#93C5FD" opacity="0.6"/>
        <circle cx="180" cy="300" r="11" fill="#93C5FD" opacity="0.6"/>
        <circle cx="300" cy="260" r="11" fill="#93C5FD" opacity="0.6"/>
        <circle cx="120" cy="400" r="11" fill="#93C5FD" opacity="0.6"/>
        <circle cx="260" cy="460" r="11" fill="#93C5FD" opacity="0.6"/>
        <circle cx="40" cy="520" r="11" fill="#93C5FD" opacity="0.6"/>
        <circle cx="340" cy="500" r="11" fill="#93C5FD" opacity="0.6"/>
        <line x1="80" y1="100" x2="200" y2="60" stroke="#93C5FD" stroke-width="2" opacity="0.3"/>
        <line x1="200" y1="60" x2="320" y2="140" stroke="#93C5FD" stroke-width="2" opacity="0.3"/>
        <line x1="80" y1="100" x2="60" y2="240" stroke="#93C5FD" stroke-width="2" opacity="0.3"/>
        <line x1="200" y1="60" x2="180" y2="300" stroke="#93C5FD" stroke-width="2" opacity="0.3"/>
        <line x1="320" y1="140" x2="300" y2="260" stroke="#93C5FD" stroke-width="2" opacity="0.3"/>
        <line x1="60" y1="240" x2="180" y2="300" stroke="#93C5FD" stroke-width="2" opacity="0.3"/>
        <line x1="180" y1="300" x2="300" y2="260" stroke="#93C5FD" stroke-width="2" opacity="0.3"/>
        <line x1="60" y1="240" x2="120" y2="400" stroke="#93C5FD" stroke-width="2" opacity="0.3"/>
        <line x1="180" y1="300" x2="260" y2="460" stroke="#93C5FD" stroke-width="2" opacity="0.3"/>
        <line x1="300" y1="260" x2="340" y2="500" stroke="#93C5FD" stroke-width="2" opacity="0.3"/>
        <line x1="120" y1="400" x2="260" y2="460" stroke="#93C5FD" stroke-width="2" opacity="0.3"/>
        <line x1="260" y1="460" x2="40" y2="520" stroke="#93C5FD" stroke-width="2" opacity="0.3"/>
        <line x1="260" y1="460" x2="340" y2="500" stroke="#93C5FD" stroke-width="2" opacity="0.3"/>
      </svg>
    </div>

    <div class="hero">

    <h1 class="login-title">
        Halo, Selamat Datang di
        <span class="brand-name">
            DermAssist
        </span>
    </h1>

    <p class="login-subtitle">
        Masuk untuk melanjutkan pemantauan
        kesehatan kulit Anda secara presisi.
    </p>

    </div>

    <!-- Card Login -->
    <div class="login-card">
      <button
        class="btn-google"
        @click="loginWithGoogle"
        :disabled="isLoading"
      >
        <svg width="18" height="18" viewBox="0 0 18 18">
          <path fill="#4285F4"
            d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 002.38-5.88c0-.57-.05-.66-.15-1.18z"/>
          <path fill="#34A853"
            d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 01-7.18-2.54H1.83v2.07A8 8 0 008.98 17z"/>
          <path fill="#FBBC05"
            d="M4.5 10.52a4.8 4.8 0 010-3.04V5.41H1.83a8 8 0 000 7.18l2.67-2.07z"/>
          <path fill="#EA4335"
            d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 001.83 5.4L4.5 7.49a4.77 4.77 0 014.48-3.3z"/>
        </svg>
        {{ isLoading ? 'Menghubungkan...' : 'Login dengan Google' }}
      </button>

      <div class="divider">
        <span>ATAU MASUK DENGAN EMAIL</span>
      </div>

      <div class="form-group">
        <label class="form-label">Alamat Email</label>
        <input
          v-model="email"
          type="email"
          class="form-input"
          placeholder="nama@email.com"
          @keyup.enter="loginWithEmail"
        />
      </div>

      <button
        class="btn-login"
        @click="loginWithEmail"
        :disabled="!email"
      >
        Login
      </button>

      <p v-if="errorMsg" class="error-msg">
        {{ errorMsg }}
      </p>

    </div>

    <p class="login-disclaimer">
      Hanya untuk tujuan informasi klinis.
      Bukan pengganti saran medis profesional.
    </p>

  </div>
</template>

<script setup>
import { ref }           from 'vue'
import { useRouter }     from 'vue-router'
import { supabase }      from '@/lib/supabase'
import { useSkinStore }  from '@/stores/counter'

const router   = useRouter()
const store    = useSkinStore()
const email    = ref('')
const errorMsg = ref('')
const isLoading = ref(false)

async function loginWithGoogle() {
  isLoading.value = true
  errorMsg.value  = ''
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options : {
        redirectTo: `${window.location.origin}/dashboard`,
        queryParams  : {
          prompt     : 'select_account',
          access_type: 'offline',
        }
      }
    })
    if (error) errorMsg.value = error.message
  } catch (err) {
    errorMsg.value = 'Gagal login dengan Google.'
  } finally {
    isLoading.value = false
  }
}

async function loginWithEmail() {
  errorMsg.value = ''

  if (!email.value) {
    errorMsg.value = 'Masukkan alamat email terlebih dahulu.'
    return
  }
  if (!email.value.includes('@')) {
    errorMsg.value = 'Format email tidak valid.'
    return
  }

  isLoading.value = true
  try {
    const { error } = await supabase.auth.signInWithOtp({
      email  : email.value,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`
      }
    })

    if (error) {
      errorMsg.value = error.message
    } else {
      errorMsg.value = ''
      alert(
        `Link login telah dikirim ke ${email.value}. ` +
        `Cek inbox email Anda.`
      )
    }
  } catch (err) {
    errorMsg.value = 'Gagal mengirim link login.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.login-page {
  width:100%;
  min-height: 100vh;
background:

radial-gradient(circle at 50% 15%,
rgba(255,255,255,.95),
rgba(248,251,255,.92) 35%,
rgba(232,241,255,.90) 60%,
rgba(212,228,248,.95) 100%),

radial-gradient(circle at left,
rgba(144,187,255,.22),
transparent 58%),

radial-gradient(circle at right,
rgba(144,187,255,.22),
transparent 58%),

linear-gradient(
180deg,
#d8e8fb,
#d2e5fb);
  background-color:#f6f9ff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-lg);
  position: relative;
  overflow: hidden;
}

.login-page::before{

content:"";

position:absolute;

width:900px;
height:900px;

border-radius:50%;

background:

radial-gradient(circle,
rgba(255,255,255,.82),
rgba(255,255,255,0));

filter:blur(60px);

z-index:0;
}

.login-page::after{

content:"";

position:absolute;

inset:0;

background:

radial-gradient(circle,

transparent 45%,

rgba(150,180,220,.10) 100%);
}

/* Pattern background */
.bg-pattern {
  position: absolute;
  top: -5%;
  bottom: 0;
  width: 640px;
  height: 100%;
  opacity: .7;
  filter:blur(.8px);
  pointer-events: none;
}

.bg-pattern--left  { 
left: -120px; 
}

.bg-pattern--right {
  right: -120px;
  transform: scaleX(-1);
}

.bg-pattern svg {
  width: 100%;
  height: 100%;
}

/* Card */
.login-card {
  background: #ffffff;
  width: 100%;
  max-width: 620px;
  padding: 48px;
  border-radius: 28px;
  border:1px solid rgba(255,255,255,.7);
  box-shadow: 0 30px 60px rgba(0,71,141,.12), 0 8px 20px rgba(0,0,0,.04);
  backdrop-filter:blur(20px);
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  z-index: 5;
}

.brand-name{
    background: linear-gradient(
        180deg,
        #6E9FD8 0%,
        #4F83C2 35%,
        #3A6EA5 70%,
        #5D93CC 100%
    );

    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
    background-clip:text;

    font-weight:700;
}

.hero{
    width:min(100%, 760px);
    display:flex;
    flex-direction:column;
    align-items:center;
    text-align:center;
    margin-bottom:48px;
    position: relative;
    z-index: 2;
}

.login-title {
  font-size: clamp(2.2rem, 4vw, 3.4rem);
  font-weight: 700;
  color: var(--color-on-surface);
  text-align: center;
  line-height: 1.2;
  letter-spacing:-0.02em;
  width:100%;
}

.login-subtitle {
    width:70%;
  margin-top:20px;
  font-size: 0.90rem;
  color:#556070;
  text-align: center;
  line-height: 1.8;
  max-width:600px;
}

.btn-google {
  height:58px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  width: 100%;
  padding: 12px var(--space-md);
  background-color: #ffffff;
  color: var(--color-on-surface);
  border: 1px solid #d9e2ef;
  border-radius: 12px;
  font-size: 17px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.15s ease,
              box-shadow 0.15s ease;
  font-family: var(--font-family);
}

.btn-google:hover {
  background-color: #f8f9fa;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
}

.divider {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background-color: var(--color-outline-variant);
}

.divider span {
  font-size: 11px;
  font-weight: 500;
  color: var(--color-on-surface-variant);
  letter-spacing: 0.05em;
  white-space: nowrap;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.form-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-on-surface);
}

.form-input {
  padding: 12px var(--space-md);
  border: 1px solid var(--color-outline-variant);
  border-radius: 12px;
  font-size: 16px;
  font-family: var(--font-family);
  color: var(--color-on-surface);
  background-color: #ffffff;
  outline: none;
  height:54px;
  width: 100%;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.form-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(0, 71, 141, 0.1);
}

.form-input::placeholder {
  color: var(--color-outline);
}

.btn-login {
  height:56px;
  width: 100%;
  padding: 14px var(--space-md);
  background:linear-gradient(180deg, #0b63ce, #00478d);
  box-shadow: 0 12px 24px rgba(0,71,141,.25);
  color: #ffffff;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  font-family: var(--font-family);
  transition: opacity 0.2s ease;
}

.btn-login:hover   { opacity: 0.92; }
.btn-login:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.error-msg {
  font-size: 13px;
  color: var(--color-error);
  text-align: center;
}

.login-disclaimer {
  margin-top: 36px;
  font-size: 12px;
  color: #5c6677;
  text-align: center;
  position: relative;
  z-index: 2;
}
</style>