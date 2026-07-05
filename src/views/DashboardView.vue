<template>
  <div class="dashboard">

    <!-- Hero -->
    <div class="dashboard-hero">
      <div class="hero-text">
        <h1 class="text-headline-lg">
          Halo, {{ store.user.name || 'Pengguna' }}
        </h1>
        <p class="text-body-md hero-subtitle">
          Pantau kesehatan kulit Anda dengan presisi klinis setiap hari melalui analisis cerdas kami.
        </p>
      </div>
      <RouterLink to="/scan" class="btn-primary btn-hero">
        📷 Mulai Deteksi Baru
      </RouterLink>
    </div>

    <!-- Summary cards -->
    <div class="summary-grid">

      <!-- Card Terakhir Scan -->
      <div class="summary-card">
        <div class="summary-card-header">
          <span class="summary-card-label">TERAKHIR SCAN</span>
          <span class="summary-card-icon">🕐</span>
        </div>
        <div class="last-scan-content">
          <div class="last-scan-thumb">
            <img
              v-if="lastScan?.image_base64"
              :src="`data:image/png;base64,${lastScan.image_base64}`"
              alt="Scan terakhir"
              class="last-scan-img"
            />
            <div v-else class="last-scan-placeholder">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="2"
                  stroke="#c2c6d4" stroke-width="1.5"/>
                <circle cx="8.5" cy="8.5" r="1.5"
                  stroke="#c2c6d4" stroke-width="1.5"/>
                <path d="M21 15l-5-5L5 21"
                  stroke="#c2c6d4" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </div>
          </div>
          <div class="last-scan-info">
            <div class="last-scan-date">
              {{ lastScan?.date || 'Belum ada scan' }}
            </div>
            <div class="last-scan-lokasi">
              {{ lastScan?.lokasi || '' }}
            </div>
          </div>
        </div>
        <div v-if="lastScan" class="hydration-score">
          <span class="hydration-label">Kondisi Terdeteksi</span>
          <span class="hydration-value">
            {{ lastScan.nama_penyakit }}
          </span>
        </div>
      </div>

      <!-- Card Progres -->
      <div class="summary-card summary-card--wide">
        <div class="summary-card-header">
          <div>
            <div class="summary-card-title">
              Aktivitas Analisis
            </div>
            <div class="summary-card-subtitle">
              Data statistik 30 hari terakhir
            </div>
          </div>
          <div class="toggle-group">
            <button
              class="toggle-btn"
              :class="{ active: chartMode === 'mingguan' }"
              @click="chartMode = 'mingguan'"
            >
              Mingguan
            </button>
            <button
              class="toggle-btn"
              :class="{ active: chartMode === 'bulanan' }"
              @click="chartMode = 'bulanan'"
            >
              Bulanan
            </button>
          </div>
        </div>

        <!-- Bar chart sederhana -->
        <div class="bar-chart">
          <div
            v-for="(bar, i) in chartData"
            :key="i"
            class="bar-item"
          >
          <div class="bar-count">{{ bar.count }}</div>
          <div class="bar-track">
            <div
              class="bar-fill"
              :style="{ height: Math.max(bar.value, 2) + '%' }"
              :class="{ 'bar-fill--active': bar.active }"
            ></div>
          </div>
          <div class="bar-label">{{ bar.label }}</div>
        </div>
      </div>
    </div>

    </div>

    <!-- Pusat Edukasi -->
    <div class="section-header">
      <h2 class="text-headline-md">
        Pusat Edukasi Kesehatan Kulit
      </h2>
      <p class="text-body-md section-subtitle">
        Panduan klinis untuk membantu Anda mengenali dan merawat kondisi kulit bersama situs resmi "Alodokter".
      </p>
    </div>

    <div class="education-grid">

      <!-- Card Eczema -->
      <div class="education-card education-card--eczema">
        <div class="edu-card-body">
          <div class="edu-card-content">
            <div class="edu-card-header">
              <h3 class="edu-card-title">Apa itu Eczema?</h3>
              <span class="edu-badge edu-badge--eczema">
                ATOPIC DERMATITIS
              </span>
            </div>
            <p class="edu-card-desc">
              Eczema (eksim) adalah kondisi kronis yang
              menyebabkan kulit menjadi merah, gatal, dan
              meradang. Sering kali muncul pada lipatan
              siku atau lutut.
            </p>
            <div class="edu-symptoms">
              <div class="edu-symptoms-label">GEJALA UMUM:</div>
              <div class="edu-symptom-item">✓ Rasa gatal yang intens</div>
              <div class="edu-symptom-item">✓ Kulit kering dan bersisik</div>
              <div class="edu-symptom-item">✓ Benjolan kecil berisi cairan</div>
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

      <!-- Card Psoriasis -->
      <div class="education-card education-card--psoriasis">
        <div class="edu-card-body">
          <div class="edu-card-content">
            <div class="edu-card-header">
              <h3 class="edu-card-title">Apa itu Psoriasis?</h3>
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
              <div class="edu-symptoms-label">GEJALA UMUM:</div>
              <div class="edu-symptom-item">✓ Bercak merah dengan sisik perak</div>
              <div class="edu-symptom-item">✓ Kulit tebal dan pecah-pecah</div>
              <div class="edu-symptom-item">✓ Sendi bengkak dan kaku</div>
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
            Psoriasis memiliki sisik putih perak yang tebal.
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
      <div class="footer-links">
        <a href="#">Kebijakan Privasi</a>
        <a href="#">Syarat &amp; Ketentuan</a>
        <a href="#">Sanggahan Medis</a>
        <a href="#">Hubungi Spesialis</a>
      </div>
      <p class="footer-copy">
        © 2024 DermAssist Health. Hanya untuk tujuan informasi klinis.
      </p>
    </footer>

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
const lastScan = computed(() => store.lastScan)
const DAY = 24 * 60 * 60 * 1000

// Ubah daftar { count } jadi bar chart: value = tinggi bar dalam %
// (dinormalisasi ke jumlah terbanyak di rentang yang sedang dilihat),
// dengan tinggi minimum kecil supaya bar dengan count > 0 tetap terlihat.
function toBars(buckets) {
  const max = Math.max(...buckets.map(b => b.count), 1)
  return buckets.map((b, i) => ({
    label : b.label,
    count : b.count,
    value : b.count === 0 ? 0 : Math.max((b.count / max) * 100, 12),
    active: b.count > 0 && i === buckets.length - 1,
  }))
}

const chartData = computed(() => {
  if (chartMode.value === 'bulanan') {
    return store.weeklyChartData
  }
  // Mode mingguan — dummy untuk sekarang
  return [
    { label: 'Sen', value: 30, count: 0 },
    { label: 'Sel', value: 55, count: 0 },
    { label: 'Rab', value: 40, count: 0 },
    { label: 'Kam', value: 70, count: 0 },
    { label: 'Jum', value: 85, count: 0 },
    { label: 'Sab', value: 60, count: 0 },
    { label: 'Min', value: 90, count: 0 },
  ]
})
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
}

/* Hero */
.dashboard-hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}

.hero-subtitle {
  color: var(--color-on-surface-variant);
  margin-top: var(--space-xs);
}

.hero-text { flex: 1; min-width: 260px; }

.btn-hero {
  text-decoration: none;
  white-space: nowrap;
  padding: var(--space-md) var(--space-lg);
  flex-shrink: 0;
}

/* Summary grid */
.summary-grid {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: var(--space-md);
}

.summary-card {
  background-color: var(--color-surface-container-lowest);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-level-1);
  padding: var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.summary-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.summary-card-label {
  font-size: 11px;
  font-weight: 700;
  color: var(--color-on-surface-variant);
  letter-spacing: 0.08em;
}

.summary-card-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-on-surface);
}

.summary-card-subtitle {
  font-size: 12px;
  color: var(--color-on-surface-variant);
  margin-top: 2px;
}

.summary-card-icon { font-size: 18px; }

/* Last scan */
.last-scan-content {
  display: flex;
  gap: var(--space-md);
  align-items: center;
}

.last-scan-thumb {
  width: 64px;
  height: 64px;
  border-radius: var(--radius-default);
  overflow: hidden;
  background-color: var(--color-surface-container);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.last-scan-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.last-scan-placeholder { font-size: 28px; }

.last-scan-date,
.last-scan-lokasi {
  font-size: 13px;
  color: var(--color-on-surface-variant);
  margin-top: 4px;
}

.last-scan-date { font-weight: 500; }

.hydration-score {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-surface-container-low);
  border-radius: var(--radius-default);
  padding: var(--space-sm) var(--space-md);
}

.hydration-label {
  font-size: 13px;
  color: var(--color-on-surface-variant);
}

.hydration-value {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-primary);
}

/* Toggle */
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
  justify-content: space-around;
  gap: var(--space-sm);
  height: 140px;
  padding-top: var(--space-sm);
}

.bar-count {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-on-surface-variant);
  min-height: 16px;
}

.bar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  flex: 1;
  height: 100%;
  justify-content: flex-end;
}

.bar-track {
  width: 100%;
  height: 90px;
  background-color: var(--color-surface-container);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  position: relative;
}

.bar-fill {
  width: 100%;
  background-color: var(--color-surface-container-high);
  border-radius: var(--radius-sm);
  transition: height 0.4s ease;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}

.bar-fill--active {
  background-color: var(--color-primary);
}

.bar-label {
  font-size: 11px;
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

.section-subtitle { color: var(--color-on-surface-variant); }

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

.education-card--eczema   { border-left-color: var(--color-secondary); }
.education-card--psoriasis { border-left-color: var(--color-primary); }

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

.edu-card-img-wrap {
  flex-shrink: 0;
  width: 130px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.edu-card-img {
  width: 130px;
  height: 130px;
  object-fit: cover;
  border-radius: 14px;
  box-shadow: 0 8px 20px rgba(0,0,0,.08);
  border: 1px solid #e5e7eb;
  background: #fff;
}

.edu-symptoms { display: flex; flex-direction: column; gap: 4px; }

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
  display: flex;
  align-items: center;
  gap: var(--space-xs);
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
  font-size: 13px;
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

.footer-links {
  display: flex;
  justify-content: center;
  gap: var(--space-lg);
  flex-wrap: wrap;
}

.footer-links a {
  color: var(--color-on-surface-variant);
  text-decoration: none;
  font-size: 13px;
  transition: color 0.15s ease;
}

.footer-links a:hover { color: var(--color-primary); }

.footer-copy {
  font-size: 11px;
  color: var(--color-outline);
}

.footer-brand {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-on-surface);
}

</style>