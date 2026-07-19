<template>
  <div class="dashboard">

    <!-- Hero -->
    <div class="dashboard-hero">
      <div class="hero-text">
        <h1 class="text-headline-lg">
          Halo, {{ store.user.name || 'Pengguna' }}
        </h1>
        <p class="hero-subtitle">
          Kami siap membantu Anda memantau kondisi
          kulit dengan analisis cerdas setiap hari.
        </p>
      </div>
      <RouterLink to="/scan" class="btn-primary btn-hero">
        📷 Mulai Deteksi Baru
      </RouterLink>
    </div>

    <!-- Layout dua kolom: konten utama + sidebar kanan -->
    <div class="dashboard-columns">

      <!-- Kolom Kiri: Konten Utama -->
      <div class="dashboard-main">

        <!-- Summary Cards: Ringkasan + Keyakinan + Rekomendasi -->
        <div
          v-if="lastScan"
          class="summary-cards"
        >

          <!-- Card 1: Ringkasan Kondisi -->
          <div class="summary-card">
            <div class="summary-card-label">
              Ringkasan Kondisi
            </div>
            <div class="summary-card-body">
              <div class="ringkasan-thumb">
                <img
                  v-if="lastScanImage"
                  :src="lastScanImage"
                  alt="Scan terakhir"
                  class="ringkasan-img"
                />
                <div
                  v-else
                  class="ringkasan-img-placeholder"
                >
                  <svg width="28" height="28"
                    viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18"
                      height="18" rx="2"
                      stroke="#c2c6d4" stroke-width="1.5"/>
                    <circle cx="8.5" cy="8.5" r="1.5"
                      stroke="#c2c6d4" stroke-width="1.5"/>
                    <path d="M21 15l-5-5L5 21"
                      stroke="#c2c6d4" stroke-width="1.5"
                      stroke-linecap="round"/>
                  </svg>
                </div>
              </div>
              <div class="ringkasan-info">
                <div class="ringkasan-meta">
                  Kondisi Terindikasi
                </div>
                <div class="ringkasan-condition">
                  {{ lastScan.nama_penyakit }}
                </div>
                <div
                  class="ringkasan-badge"
                  :class="lastScan.predicted_class === 'eczema'
                    ? 'ringkasan-badge--eczema'
                    : 'ringkasan-badge--psoriasis'"
                >
                  Perlu Perhatian
                </div>
              </div>
            </div>
          </div>

          <!-- Card 2: Tingkat Keyakinan Model -->
          <div class="summary-card">
            <div class="summary-card-label">
              Tingkat Keyakinan Model
            </div>
            <div class="summary-card-body summary-card-body--center">
              <div class="donut-wrap">
                <svg
                  class="donut-svg"
                  viewBox="0 0 120 120"
                >
                  <!-- Track -->
                  <circle
                    cx="60" cy="60" r="50"
                    fill="none"
                    stroke="#e8f0fe"
                    stroke-width="12"
                  />
                  <!-- Progress -->
                  <circle
                    cx="60" cy="60" r="50"
                    fill="none"
                    :stroke="confidenceColor"
                    stroke-width="12"
                    stroke-linecap="round"
                    :stroke-dasharray="donutDash"
                    stroke-dashoffset="0"
                    transform="rotate(-90 60 60)"
                  />
                </svg>
                <div class="donut-label">
                  <div
                    class="donut-pct"
                    :style="{ color: confidenceColor }"
                  >
                    {{ confidencePct }}%
                  </div>
                  <div class="donut-tier">
                    {{ lastScan
                        ? getConfidenceLabel(lastScan.confidence)
                        : '' }}
                  </div>
                </div>
              </div>
              <p class="donut-desc">
                Model
                {{ confidenceDesc }}
                hasil analisis ini.
              </p>
            </div>
          </div>

          <!-- Card 3: Rekomendasi Utama -->
          <div class="summary-card">
            <div class="summary-card-label">
              Rekomendasi Utama
            </div>
            <div class="summary-card-body">
              <ul class="rekomendasi-list">
                <li
                  v-for="item in rekomendasiItems"
                  :key="item"
                  class="rekomendasi-item"
                >
                  <svg
                    class="rekomendasi-check"
                    width="16" height="16"
                    viewBox="0 0 24 24" fill="none"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="var(--color-secondary)"
                      stroke-width="2.5"
                      stroke-linecap="round"
                    />
                  </svg>
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Pusat Edukasi -->
        <div class="section-header">
          <h2 class="text-headline-md">
            Pusat Edukasi Kesehatan Kulit
          </h2>
          <p class="section-subtitle">
            Panduan klinis untuk membantu Anda mengenali
            dan merawat kondisi kulit bersama situs resmi
            "Alodokter".
          </p>
        </div>

        <div class="education-grid">

          <div class="education-card education-card--eczema">
            <div class="edu-card-body">
              <div class="edu-card-content">
                <div class="edu-card-header">
                  <h3 class="edu-card-title">
                    Apa itu Eczema?
                  </h3>
                  <span class="edu-badge edu-badge--eczema">
                    ATOPIC DERMATITIS
                  </span>
                </div>
                <p class="edu-card-desc">
                  Eczema (eksim) adalah kondisi kronis
                  yang menyebabkan kulit menjadi merah,
                  gatal, dan meradang. Sering kali muncul
                  pada lipatan siku atau lutut.
                </p>
                <div class="edu-symptoms">
                  <div class="edu-symptoms-label">
                    GEJALA UMUM:
                  </div>
                  <div class="edu-symptom-item">
                    ✓ Rasa gatal yang intens
                  </div>
                  <div class="edu-symptom-item">
                    ✓ Kulit kering dan bersisik
                  </div>
                  <div class="edu-symptom-item">
                    ✓ Benjolan kecil berisi cairan
                  </div>
                </div>
              </div>
              <div class="edu-card-img-wrap">
                <img
                  :src="ilustrasiEksim"
                  alt="Ilustrasi Eczema"
                  class="edu-card-img"
                />
              </div>
            </div>
            <a
              href="https://www.alodokter.com/search?s=eksim"
              target="_blank"
              rel="noopener noreferrer"
              class="edu-card-link-outline"
            >
              Pelajari Perawatan Eksim →
            </a>
          </div>

          <div class="education-card education-card--psoriasis">
            <div class="edu-card-body">
              <div class="edu-card-content">
                <div class="edu-card-header">
                  <h3 class="edu-card-title">
                    Apa itu Psoriasis?
                  </h3>
                  <span class="edu-badge edu-badge--psoriasis">
                    AUTOIMMUNE
                  </span>
                </div>
                <p class="edu-card-desc">
                  Psoriasis adalah gangguan autoimun yang
                  mempercepat siklus hidup sel kulit,
                  menyebabkan sel menumpuk dengan cepat
                  di permukaan kulit.
                </p>
                <div class="edu-symptoms">
                  <div class="edu-symptoms-label">
                    GEJALA UMUM:
                  </div>
                  <div class="edu-symptom-item">
                    ✓ Bercak merah dengan sisik perak
                  </div>
                  <div class="edu-symptom-item">
                    ✓ Kulit tebal dan pecah-pecah
                  </div>
                  <div class="edu-symptom-item">
                    ✓ Sendi bengkak dan kaku
                  </div>
                </div>
              </div>
              <div class="edu-card-img-wrap">
                <img
                :src="ilustrasiPsoriasis"
                alt="Ilustrasi Psoriasis"
                class="edu-card-img"
              />
            </div>
          </div>
          <a
            href="https://www.alodokter.com/search?s=psoriasis"
            target="_blank"
            rel="noopener noreferrer"
            class="edu-card-link-outline"
          >
            Pelajari Perawatan Psoriasis →
          </a>
          </div>
        </div>

        <!-- Fakta Singkat -->
        <div class="fact-box">
          <div class="fact-box-header">
            <span class="fact-icon">↔</span>
            <div>
              <div class="fact-title">
                Fakta Singkat: Perbedaan Utama
              </div>
              <div class="fact-subtitle">
                Cara cepat membedakan Eczema dan Psoriasis
              </div>
            </div>
          </div>
          <div class="fact-grid">
            <div class="fact-item">
              <div class="fact-item-label">PENYEBAB</div>
              <div class="fact-item-desc">
                Eczema sering terkait alergi atau iritan.
                Psoriasis adalah kondisi autoimun genetik.
              </div>
            </div>
            <div class="fact-item">
              <div class="fact-item-label">TEKSTUR SISIK</div>
              <div class="fact-item-desc">
                Eczema cenderung basah atau berkerak.
                Psoriasis memiliki sisik putih perak
                yang tebal.
              </div>
            </div>
            <div class="fact-item">
              <div class="fact-item-label">LOKASI</div>
              <div class="fact-item-desc">
                Eczema di lipatan (siku dalam). Psoriasis
                di bagian luar (siku luar, lutut).
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <footer class="dashboard-footer">
          <p class="footer-brand">DermAssist</p>
          <div class="footer-links">
            <a href="#">Kebijakan Privasi</a>
            <a href="#">Syarat &amp; Ketentuan</a>
            <RouterLink to="/about">Sanggahan Medis</RouterLink>
            <a href="#">Hubungi Spesialis</a>
          </div>
          <p class="footer-copy">
            © 2026 DermAssist.
            Hanya untuk tujuan informasi klinis. Bukan pengganti saran medis profesional.
          </p>
        </footer>

      </div>

      <!-- Kolom Kanan: Sidebar Info -->
      <div class="dashboard-sidebar">

        <!-- Card: Tahukah Anda? -->
        <div class="info-card">
          <div class="info-card-header">
            <span class="info-card-icon">💡</span>
            <span class="info-card-title">Tahukah Anda?</span>
          </div>
          <blockquote class="info-card-quote">
            "Eksim dan psoriasis dapat terlihat mirip
            pada tahap awal."
          </blockquote>
          <p class="info-card-desc">
            Perbedaannya, psoriasis biasanya memiliki
            sisik putih keperakan yang lebih tebal,
            sedangkan eksim lebih sering disertai rasa
            gatal dan kulit kering.
          </p>
          <div class="info-card-img-wrap">
            <img
              src="@/assets/dokter.png"
              alt="Dokter"
              class="info-card-img"
              @error="onDokterImgError"
            />
          </div>
        </div>

        <!-- Card: Tips Hari Ini -->
        <div class="info-card info-card--tips">
          <div class="info-card-header">
            <span class="info-card-icon">⭐</span>
            <span class="info-card-title">Tips Hari Ini</span>
          </div>
          <div class="tips-content">
            <img
              src="@/assets/pelembab.png"
              alt="Pelembab"
              class="tips-img"
              @error="onPelembabImgError"
            />
            <p class="tips-desc">
              Gunakan pelembab setelah mandi saat kulit
              masih sedikit lembap untuk menjaga
              hidrasi optimal.
            </p>
          </div>
        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, computed }  from 'vue'
import { RouterLink }     from 'vue-router'
import { useSkinStore }   from '@/stores/counter'
import ilustrasiEksim from '@/assets/ilustrasi-eksim.webp'
import ilustrasiPsoriasis from '@/assets/ilustrasi-psoriasis.jpeg'

const store     = useSkinStore()
const chartMode = ref('bulanan')

// ── Data scan terakhir ────────────────────────────────────
const lastScan = computed(() => store.lastScan)

const lastScanImage = computed(() => {
  if (!lastScan.value) return null
  const img = lastScan.value.images?.original
           || lastScan.value.image_base64
           || lastScan.value.full_result?.images?.original
  if (!img) return null
  if (img.startsWith('http')) return img
  return `data:image/png;base64,${img}`
})

// ── Confidence donut ──────────────────────────────────────
const confidencePct = computed(() => {
  if (!lastScan.value) return 0
  return Math.round(lastScan.value.confidence * 100)
})

const CIRCUMFERENCE = 2 * Math.PI * 50  // r=50

const donutDash = computed(() => {
  const filled = (confidencePct.value / 100) * CIRCUMFERENCE
  const empty  = CIRCUMFERENCE - filled
  return `${filled.toFixed(1)} ${empty.toFixed(1)}`
})

const confidenceColor = computed(() => {
  const pct = confidencePct.value
  if (pct >= 90) return '#22c55e'   // hijau
  if (pct >= 75) return '#3b82f6'   // biru
  if (pct >= 60) return '#f59e0b'   // oranye
  return '#ef4444'                   // merah
})

const confidenceDesc = computed(() => {
  const pct = confidencePct.value
  if (pct >= 90) return 'sangat yakin dengan'
  if (pct >= 75) return 'cukup yakin dengan'
  if (pct >= 60) return 'memiliki keyakinan sedang terhadap'
  return 'kurang yakin dengan'
})

function getConfidenceLabel(confidence) {
  if (confidence >= 0.90) return 'Sangat Tinggi'
  if (confidence >= 0.75) return 'Tinggi'
  if (confidence >= 0.60) return 'Sedang'
  return 'Rendah'
}

// ── Rekomendasi berdasarkan penyakit terdeteksi ───────────
const rekomendasiItems = computed(() => {
  if (!lastScan.value) return []
  const cls = lastScan.value.predicted_class
  if (cls === 'eczema') {
    return [
      'Jaga kelembapan kulit',
      'Hindari menggaruk area',
      'Gunakan sabun lembut',
    ]
  }
  return [
    'Gunakan pelembab rutin',
    'Hindari stres berlebihan',
    'Konsultasikan ke dokter',
  ]
})

// ── Chart data ────────────────────────────────────────────
const chartData = computed(() => {
  if (chartMode.value === 'bulanan') {
    return store.weeklyChartData
  }
  const days  = ['Sen','Sel','Rab','Kam','Jum','Sab','Min']
  const now   = new Date()
  const counts = Array(7).fill(0)

  store.analysisHistory.forEach(item => {
    const date = new Date(item.created_at || item.timestamp)
    const diff = Math.floor(
      (now - date) / (1000 * 60 * 60 * 24)
    )
    if (diff < 7) {
      const dayIdx = (date.getDay() + 6) % 7
      counts[dayIdx]++
    }
  })

  const maxVal = Math.max(...counts, 1)
  return days.map((label, i) => ({
    label,
    value: Math.round((counts[i] / maxVal) * 100),
    count: counts[i],
  }))
})

// ── Error handler gambar aset ─────────────────────────────
function onDokterImgError(e) {
  e.target.style.display = 'none'
}

function onPelembabImgError(e) {
  e.target.style.display = 'none'
}
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

/* Hero */
.dashboard-hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-lg);
  flex-wrap: wrap;
}

.hero-subtitle {
  color: var(--color-on-surface-variant);
  margin-top: var(--space-xs);
  max-width: 480px;
  font-size: 14px;
}

.btn-hero {
  text-decoration: none;
  white-space: nowrap;
  padding: var(--space-md) var(--space-lg);
}

/* Layout dua kolom */
.dashboard-columns {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: var(--space-lg);
  align-items: start;
}

.dashboard-main {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

/* Summary cards — 3 kolom */
.summary-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-md);
}

.summary-card {
  background-color: var(--color-surface-container-lowest);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-level-1);
  padding: var(--space-md) var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.summary-card-label {
  font-size: 12px;
  font-weight: 700;
  color: var(--color-on-surface-variant);
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.summary-card-body {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  flex: 1;
}

.summary-card-body--center {
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
}

/* Ringkasan Kondisi */
.ringkasan-thumb {
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

.ringkasan-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ringkasan-img-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.ringkasan-meta {
  font-size: 11px;
  color: var(--color-on-surface-variant);
  margin-bottom: 2px;
}

.ringkasan-condition {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-primary);
  line-height: 1.2;
}

.ringkasan-badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  padding: 2px var(--space-sm);
  border-radius: var(--radius-full);
  margin-top: 4px;
}

.ringkasan-badge--eczema {
  background-color: #fff3cd;
  color: #856404;
}

.ringkasan-badge--psoriasis {
  background-color: #cfe2ff;
  color: #084298;
}

/* Donut chart */
.donut-wrap {
  position: relative;
  width: 100px;
  height: 100px;
  flex-shrink: 0;
}

.donut-svg {
  width: 100%;
  height: 100%;
}

.donut-label {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.donut-pct {
  font-size: 20px;
  font-weight: 700;
  line-height: 1;
}

.donut-tier {
  font-size: 11px;
  color: var(--color-on-surface-variant);
  margin-top: 2px;
}

.donut-desc {
  font-size: 12px;
  color: var(--color-on-surface-variant);
  text-align: center;
  line-height: 1.5;
}

/* Rekomendasi */
.rekomendasi-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  width: 100%;
}

.rekomendasi-item {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: 13px;
  color: var(--color-on-surface);
}

.rekomendasi-check {
  flex-shrink: 0;
}

/* Aktivitas analisis */
.activity-card {
  background-color: var(--color-surface-container-lowest);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-level-1);
  padding: var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.activity-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.activity-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-on-surface);
}

.activity-subtitle {
  font-size: 12px;
  color: var(--color-on-surface-variant);
  margin-top: 2px;
}

.toggle-group {
  display: flex;
  background-color: var(--color-surface-container);
  border-radius: var(--radius-full);
  padding: 2px;
  gap: 2px;
}

.toggle-btn {
  padding: 4px var(--space-sm);
  border: none;
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  font-family: var(--font-family);
  color: var(--color-on-surface-variant);
  background: transparent;
  transition: all 0.15s ease;
}

.toggle-btn.active {
  background-color: var(--color-primary);
  color: white;
}

/* Bar chart */
.bar-chart {
  display: flex;
  align-items: flex-end;
  gap: var(--space-sm);
  height: 120px;
  padding-top: var(--space-sm);
}

.bar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  flex: 1;
}

.bar-count {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-primary);
  min-height: 18px;
  line-height: 1;
}

.bar-track {
  width: 100%;
  height: 80px;
  background-color: var(--color-surface-container);
  border-radius: var(--radius-sm);
  position: relative;
  overflow: hidden;
}

.bar-fill {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--color-surface-container-high);
  border-radius: var(--radius-sm);
  min-height: 2px;
  transition: height 0.5s ease;
}

.bar-fill--active {
  background-color: var(--color-primary);
}

.bar-label {
  font-size: 10px;
  color: var(--color-on-surface-variant);
  text-align: center;
  white-space: nowrap;
}

/* Section header */
.section-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.section-subtitle {
  color: var(--color-on-surface-variant);
  font-size: 14px;
}

/* Education cards */
.education-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
}

.education-card {
  background-color: var(--color-surface-container-lowest);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-level-1);
  padding: var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  border-left: 4px solid transparent;
}

.education-card--eczema {
  border-left-color: var(--color-secondary);
}

.education-card--psoriasis {
  border-left-color: var(--color-primary);
}

.edu-card-body {
  display: flex;
  gap: var(--space-md);
  justify-content: space-between;
}

.edu-card-content { flex: 1; }

.edu-card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-sm);
  flex-wrap: wrap;
  margin-bottom: var(--space-sm);
}

.edu-card-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-on-surface);
}

.edu-badge {
  font-size: 11px;
  font-weight: 600;
  padding: 2px var(--space-sm);
  border-radius: var(--radius-full);
  letter-spacing: 0.05em;
  white-space: nowrap;
}

.edu-badge--eczema {
  background-color: var(--color-secondary-container);
  color: var(--color-on-secondary-container);
}

.edu-badge--psoriasis {
  background-color: var(--color-surface-container-high);
  color: var(--color-primary);
}

.edu-card-desc {
  font-size: 14px;
  color: var(--color-on-surface-variant);
  line-height: 1.6;
  margin-bottom: var(--space-md);
}

.edu-card-img-wrap { flex-shrink: 0; width: 90px; }

.edu-card-img {
  width: 90px;
  height: 90px;
  background-color: var(--color-surface-container);
  border-radius: var(--radius-default);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  color: var(--color-outline);
}

.edu-symptoms {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.edu-symptoms-label {
  font-size: 11px;
  font-weight: 700;
  color: var(--color-on-surface-variant);
  letter-spacing: 0.08em;
  margin-bottom: 4px;
}

.edu-symptom-item {
  font-size: 13px;
  color: var(--color-on-surface);
}

.edu-card-link-outline {
  display: block;
  text-align: center;
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--color-outline-variant);
  border-radius: var(--radius-default);
  color: var(--color-primary);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.15s ease;
}

.edu-card-link-outline:hover {
  background-color: var(--color-surface-container-low);
}

/* Fact box */
.fact-box {
  background-color: var(--color-surface-container-low);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.fact-box-header {
  display: flex;
  align-items: flex-start;
  gap: var(--space-md);
}

.fact-icon {
  font-size: 22px;
  color: var(--color-primary);
  background-color: var(--color-surface-container);
  width: 40px;
  height: 40px;
  border-radius: var(--radius-default);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.fact-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-on-surface);
}

.fact-subtitle {
  font-size: 12px;
  color: var(--color-on-surface-variant);
  margin-top: 2px;
}

.fact-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-md);
}

.fact-item {
  background-color: var(--color-surface-container-lowest);
  border-radius: var(--radius-default);
  padding: var(--space-md);
}

.fact-item-label {
  font-size: 11px;
  font-weight: 700;
  color: var(--color-primary);
  letter-spacing: 0.08em;
  margin-bottom: var(--space-xs);
}

.fact-item-desc {
  font-size: 12px;
  color: var(--color-on-surface-variant);
  line-height: 1.6;
}

/* Footer */
.dashboard-footer {
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
  flex-wrap: wrap;
}

.footer-links a {
  color: var(--color-on-surface-variant);
  text-decoration: none;
  font-size: 12px;
  transition: color 0.15s ease;
}

.footer-links a:hover { color: var(--color-primary); }

.footer-copy {
  font-size: 11px;
  color: var(--color-outline);
}

/* ── Sidebar kanan ── */
.dashboard-sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  position: sticky;
  top: 80px;
}

.info-card {
  background-color: var(--color-surface-container-lowest);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-level-1);
  padding: var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.info-card--tips {
  background-color: #fffbeb;
  border: 1px solid #fef3c7;
}

.info-card-header {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.info-card-icon { font-size: 18px; }

.info-card-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--color-primary);
}

.info-card-quote {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-on-surface);
  line-height: 1.5;
  border-left: 3px solid var(--color-primary);
  padding-left: var(--space-md);
  margin: 0;
  font-style: normal;
}

.info-card-desc {
  font-size: 13px;
  color: var(--color-on-surface-variant);
  line-height: 1.6;
}

.info-card-img-wrap {
  display: flex;
  justify-content: center;
}

.info-card-img {
  width: 100%;
  max-width: 200px;
  object-fit: contain;
  border-radius: var(--radius-default);
}

/* Tips */
.tips-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
}

.tips-img {
  width: 80px;
  height: 80px;
  object-fit: contain;
}

.tips-desc {
  font-size: 13px;
  color: var(--color-on-surface-variant);
  line-height: 1.6;
  text-align: center;
}
</style>