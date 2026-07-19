<template>
  <div class="about-page">
    <!-- Hero -->
    <div class="about-hero" :style="{ backgroundImage: `url(${heroBackground})` }">
      <div class="hero-content">
        <span class="hero-badge">Tentang Sistem</span>
        <h1 class="hero-title">Tentang DermAssist</h1>
        <p class="hero-subtitle">
          Sistem klasifikasi penyakit kulit berbasis
          Explainable Artificial Intelligence (XAI).
        </p>
        <RouterLink to="/scan" class="btn-scan">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="blue">
            <circle cx="11" cy="11" r="8"
              stroke="white" stroke-width="2"/>
            <path d="M21 21l-3-3"
              stroke="white" stroke-width="2" stroke-linecap="round"/>
          </svg>
          Mulai Scan
        </RouterLink>
      </div>
    </div>

    <!-- Latar Belakang -->
    <div class="section-card">
      <h2 class="section-title">
        <svg class="section-icon" viewBox="0 0 24 24" fill="none">
        </svg>
        Mengapa DermAssist Dibuat?
      </h2>
      <p class="section-text">
        Eczema dan Psoriasis merupakan dua penyakit kulit yang memiliki
        kemiripan visual tinggi sehingga seringkali sulit dibedakan secara
        kasat mata. Kesalahan diagnosis dapat berdampak langsung pada
        efektivitas terapi yang diberikan.
      </p>
      <div class="reason-grid">
        <div class="reason-item">
          <div class="reason-icon">
            <svg viewBox="0 0 24 24" fill="none">
            <circle
            cx="12"
            cy="12"
            r="3"
            stroke="currentColor"
            stroke-width="2"/>
            </svg>
          </div>
          <div class="reason-text">
            Eczema dan Psoriasis sulit dibedakan secara visual
          </div>
        </div>
        <div class="reason-item">
          <div class="reason-icon">
            <svg viewBox="0 0 24 24" fill="none">
            <circle
            cx="12"
            cy="12"
            r="3"
            stroke="currentColor"
            stroke-width="2"/>
            </svg>
          </div>
          <div class="reason-text">
            Salah diagnosis berdampak pada terapi yang tidak tepat
          </div>
        </div>
        <div class="reason-item">
          <div class="reason-icon">
            <svg viewBox="0 0 24 24" fill="none">
            <circle
            cx="12"
            cy="12"
            r="3"
            stroke="currentColor"
            stroke-width="2"/>
            </svg>
          </div>
          <div class="reason-text">
            AI dapat membantu identifikasi awal secara cepat
          </div>
        </div>
        <div class="reason-item">
          <div class="reason-icon">
            <svg viewBox="0 0 24 24" fill="none">
            <circle
            cx="12"
            cy="12"
            r="3"
            stroke="currentColor"
            stroke-width="2"/>
            </svg>
          </div>
          <div class="reason-text">
            XAI meningkatkan transparansi dan kepercayaan terhadap AI
          </div>
        </div>
      </div>
    </div>

    <!-- Tujuan Sistem -->
    <div class="section-card">
      <h2 class="section-title">
        <svg class="section-icon" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8"
        stroke="currentColor"
        stroke-width="2"/>
        <circle cx="12" cy="12" r="3"
        fill="currentColor"/>
        </svg>
        Tujuan Sistem
      </h2>
      <div class="goal-grid">
        <div class="goal-card">
          <div class="goal-icon">🩺</div>
          <div class="goal-title">Deteksi Awal</div>
          <div class="goal-desc">
            Membantu identifikasi awal kondisi lesi kulit
            sebagai Eczema atau Psoriasis
          </div>
        </div>
        <div class="goal-card">
          <div class="goal-icon">🧠</div>
          <div class="goal-title">Prediksi Berbasis AI</div>
          <div class="goal-desc">
            Memberikan prediksi menggunakan model deep learning
            MobileNetV2 yang terlatih
          </div>
        </div>
        <div class="goal-card">
          <div class="goal-icon">🔍</div>
          <div class="goal-title">Visualisasi Grad-CAM</div>
          <div class="goal-desc">
            Menampilkan area yang paling berpengaruh pada
            keputusan model melalui heatmap
          </div>
        </div>
        <div class="goal-card">
          <div class="goal-icon">📖</div>
          <div class="goal-title">Penjelasan Hasil AI</div>
          <div class="goal-desc">
            Memberikan penjelasan tekstual berbasis aturan
            klinis yang dapat dipahami pengguna
          </div>
        </div>
      </div>
    </div>

    <!-- Cara Kerja (High Level) -->
    <div class="section-card">
      <h2 class="section-title">
        <svg class="section-icon" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3"
        stroke="currentColor"
        stroke-width="2"/>
        <path d="M19 12h2M3 12h2M12 3v2M12 19v2M17 7l1.5-1.5M5.5 18.5L7 17"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"/>
        </svg>
        Bagaimana Sistem Bekerja?
      </h2>
      <p class="section-text">
        Pipeline end-to-end dari input gambar hingga menghasilkan
        penjelasan berbasis aturan klinis.
      </p>
      <div class="flow-wrap">
        <div
          v-for="(step, i) in flowSteps"
          :key="i"
          class="flow-item"
        >
          <div class="flow-icon">
            <span v-html="step.icon"></span>
          </div>
          <div class="flow-label">{{ step.label }}</div>
          <div v-if="i < flowSteps.length - 1" class="flow-arrow">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6"
                stroke="var(--color-outline)" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Dataset -->
    <div class="section-card">
      <h2 class="section-title">
        <svg class="section-icon" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="5"
        width="16"
        height="14"
        rx="2"
        stroke="currentColor"
        stroke-width="2"/>
        <path d="M8 9h8M8 13h8"
        stroke="currentColor"
        stroke-width="2"/>
        </svg>
        Dataset Penelitian
      </h2>
      <p class="section-text">
        Dataset yang digunakan berasal dari Roboflow Universe,
        terdiri dari dua dataset publik berlisensi CC BY 4.0.
      </p>
      <div class="dataset-stats">
        <div class="dataset-stat">
          <div class="dataset-value">1.159</div>
          <div class="dataset-label">Total Gambar</div>
        </div>
        <div class="dataset-divider"></div>
        <div class="dataset-stat">
          <div class="dataset-value">581</div>
          <div class="dataset-label">Eczema</div>
        </div>
        <div class="dataset-divider"></div>
        <div class="dataset-stat">
          <div class="dataset-value">578</div>
          <div class="dataset-label">Psoriasis</div>
        </div>
      </div>
    </div>

    <!-- Evaluasi Model -->
    <div class="section-card">
      <h2 class="section-title">
        <svg class="section-icon" viewBox="0 0 24 24" fill="none">
        <path d="M5 19V9M12 19V5M19 19v-8"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"/>
        </svg>
        Performa Model (Evaluasi Penelitian)
      </h2>
      <p class="section-text">
        Model dievaluasi pada data uji yang tidak digunakan selama pelatihan.
      </p>
      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-value">72.16%</div>
          <div class="metric-label">Accuracy</div>
        </div>
        <div class="metric-card">
          <div class="metric-value">0.8537</div>
          <div class="metric-label">AUC</div>
        </div>
        <div class="metric-card">
          <div class="metric-value">0.7138</div>
          <div class="metric-label">F1-Score (Macro)</div>
        </div>
        <div class="metric-card">
          <div class="metric-value">1.159</div>
          <div class="metric-label">Total Data Uji</div>
        </div>
      </div>
    </div>

    <!-- Keterbatasan -->
    <div class="limitation-card">
      <div class="limitation-header">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
            stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="12" y1="9" x2="12" y2="13"
            stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="12" y1="17" x2="12.01" y2="17"
            stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        Keterbatasan Sistem
      </div>
      <ul class="limitation-list">
        <li>Sistem hanya mengenali dua kelas: Eczema dan Psoriasis</li>
        <li>Belum mampu mengenali penyakit kulit selain keduanya</li>
        <li>Bergantung pada kualitas foto yang diunggah</li>
        <li>Merupakan prototype penelitian, bukan produk medis resmi</li>
      </ul>
    </div>

    <!-- Footer -->
    <footer class="about-footer">
      <p class="footer-brand">DermAssist</p>
      <div class="footer-links">
            <a href="#">Kebijakan Privasi</a>
            <a href="#">Syarat &amp; Ketentuan</a>
            <RouterLink to="/about">Sanggahan Medis</RouterLink>
            <a href="#">Hubungi Spesialis</a>
      </div>
      <p class="footer-copy">
        © 2026 DermAssist. Untuk tujuan informasi klinis saja.
        Bukan pengganti saran medis profesional.
      </p>
    </footer>

  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import heroBackground from '@/assets/gambar-tentang.png'

const flowSteps = [
{
label:'Input Gambar',
icon:`
<svg viewBox="0 0 24 24" fill="none">
<path d="M4 7h4l2-2h4l2 2h4v12H4z"
stroke="currentColor"
stroke-width="2"/>
<circle cx="12" cy="13" r="3"
stroke="currentColor"
stroke-width="2"/>
</svg>`
},

{
label:'Analisis AI',
icon:`
<svg viewBox="0 0 24 24" fill="none">
<path d="M12 3a5 5 0 015 5v2a5 5 0 11-10 0V8a5 5 0 015-5z"
stroke="currentColor"
stroke-width="2"/>
</svg>`
},

{
label:'Grad-CAM',
icon:`
<svg viewBox="0 0 24 24" fill="none">
<path d="M12 2l3 7h7l-5.5 4.2L18 22l-6-3.5L6 22l1.5-8.8L2 9h7z"
stroke="currentColor"
stroke-width="2"/>
</svg>`
},

{
label:'Penjelasan',
icon:`
<svg viewBox="0 0 24 24" fill="none">
<rect x="5" y="3" width="14" height="18"
stroke="currentColor"
stroke-width="2"/>
<path d="M8 8h8M8 12h8"
stroke="currentColor"
stroke-width="2"/>
</svg>`
},

{
label:'Hasil',
icon:`
<svg viewBox="0 0 24 24" fill="none">
<path d="M5 13l4 4L19 7"
stroke="currentColor"
stroke-width="2"
stroke-linecap="round"/>
</svg>`
}
]

</script>

<style scoped>
.about-page {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

/* Hero */
.about-hero{
  position: relative;
  overflow: hidden;
  border-radius: 14px;
  min-height: 300px;
  padding: 48px;
  display: flex;
  align-items: center;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.hero-content{
    position:relative;
    z-index:2;
    max-width:520px;
}

.hero-badge {
  display: inline-block;
  background-color: rgba(255,255,255,0.2);
  color: white;
  font-size: 12px;
  font-weight: 600;
  padding: 4px var(--space-sm);
  border-radius: var(--radius-full);
  letter-spacing: 0.05em;
  margin-bottom: var(--space-md);
}

.hero-title {
  font-size: 28px;
  font-weight: 700;
  color: white;
  margin-bottom: var(--space-sm);
}

.hero-subtitle {
  font-size: 15px;
  color: rgba(255,255,255,0.85);
  line-height: 1.6;
  margin-bottom: var(--space-lg);
  max-width: 480px;
}

.btn-scan {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  background-color: white;
  color: var(--color-primary);
  text-decoration: none;
  padding: var(--space-sm) var(--space-lg);
  border-radius: var(--radius-default);
  font-size: 14px;
  font-weight: 600;
  transition: opacity 0.2s;
}

.btn-scan:hover { opacity: 0.9; }

/* Section card */
.section-card {
  background-color: var(--color-surface-container-lowest);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-level-1);
  padding: var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-on-surface);
  display:flex;
  align-items:center;
  gap:10px;
}

.section-icon{
  width:22px;
  height:22px;
  color:var(--color-primary);
  flex-shrink:0;
}

.section-text {
  font-size: 14px;
  color: var(--color-on-surface-variant);
  line-height: 1.7;
}

/* Reason grid */
.reason-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-sm);
}

.reason-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-sm);
  background-color: var(--color-surface-container-low);
  border-radius: var(--radius-default);
  padding: var(--space-md);
}

.reason-icon{
  width:22px;
  height:22px;
  color:var(--color-primary);
  flex-shrink:0;
}

.reason-icon svg{
  width:100%;
  height:100%;
}

.reason-text {
  font-size: 13px;
  color: var(--color-on-surface);
  line-height: 1.5;
}

/* Goal grid */
.goal-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-md);
}

.goal-card {
  background-color: var(--color-surface-container-low);
  border-radius: var(--radius-lg);
  padding: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  text-align: center;
}

.goal-icon { font-size: 28px; }

.goal-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-on-surface);
}

.goal-desc {
  font-size: 12px;
  color: var(--color-on-surface-variant);
  line-height: 1.5;
}

/* Flow */
.flow-wrap {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

.flow-item {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.flow-icon {
  width: 48px;
  height: 48px;
  background-color: var(--color-surface-container);
  border-radius: var(--radius-default);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
}

.flow-label {
  font-size: 12px;
  font-weight: 500;
  color: var(--color-on-surface-variant);
  text-align: center;
  max-width: 60px;
  line-height: 1.3;
}

.flow-arrow { display: flex; align-items: center; }

/* Dataset stats */
.dataset-stats {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  background-color: var(--color-surface-container-low);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
}

.dataset-value {
  font-size: 32px;
  font-weight: 700;
  color: var(--color-primary);
}

.dataset-label {
  font-size: 13px;
  color: var(--color-on-surface-variant);
  margin-top: 4px;
}

.dataset-divider {
  width: 1px;
  height: 40px;
  background-color: var(--color-outline-variant);
}

/* Metrics */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-md);
}

.metric-card {
  background-color: var(--color-surface-container-low);
  border-radius: var(--radius-lg);
  padding: var(--space-md);
  text-align: center;
  border-top: 3px solid var(--color-primary);
}

.metric-value {
  font-size: 24px;
  font-weight: 700;
  color: var(--color-primary);
}

.metric-label {
  font-size: 12px;
  color: var(--color-on-surface-variant);
  margin-top: 4px;
}

/* Limitation */
.limitation-card {
  background-color: var(--color-error-container);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.limitation-header {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: 15px;
  font-weight: 700;
  color: var(--color-on-error-container);
}

.limitation-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.limitation-list li {
  font-size: 13px;
  color: var(--color-on-error-container);
  line-height: 1.6;
  padding-left: var(--space-md);
  position: relative;
}

.limitation-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--color-error);
}

/* Footer */
.about-footer {
  border-top: 1px solid var(--color-outline-variant);
  padding-top: var(--space-lg);
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.footer-brand {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-on-surface);
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: var(--space-lg);
}

.footer-links a {
  color: var(--color-on-surface-variant);
  text-decoration: none;
  font-size: 12px;
}

.footer-copy {
  font-size: 11px;
  color: var(--color-outline);
}
</style>