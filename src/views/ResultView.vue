<template>
  <div class="result-page">

    <!-- Jika tidak ada hasil, arahkan ke scan -->
    <div v-if="!result" class="no-result">
      <p>Belum ada hasil analisis.</p>
      <RouterLink to="/scan" class="btn-primary">
        Mulai Analisis
      </RouterLink>
    </div>

    <template v-else>

      <!-- Breadcrumb -->
      <div class="breadcrumb">
        <RouterLink to="/scan" class="breadcrumb-link">
          Pindai Kulit
        </RouterLink>
        <span class="breadcrumb-sep">›</span>
        <span class="breadcrumb-current">Hasil Analisis</span>
      </div>

      <!-- Heading -->
      <div class="result-header">
        <div>
          <h1 class="text-headline-lg">Analisis Deteksi</h1>
          <p class="text-caption result-date">
            Dipindai pada {{ scanDate }}
          </p>
        </div>
      </div>

      <!-- Disclaimer banner -->
      <div class="disclaimer-banner">
        <span class="disclaimer-icon">⚕️</span>
        <div class="disclaimer-text">
          <strong>Sanggahan Medis</strong> — Analisis ini
          dihasilkan oleh AI untuk tujuan informasi. Ini
          <strong>BUKAN</strong> diagnosis medis profesional.
          Sistem <strong>hanya mengenali Eczema dan Psoriasis</strong>
          dan tidak dapat memastikan apakah gambar benar-benar
          termasuk salah satu dari kedua kondisi tersebut.
          Silakan berkonsultasi dengan dokter spesialis kulit
          untuk diagnosis resmi.
        </div>
      </div>

      <!-- OOD Warning jika terdeteksi -->
      <div
        v-if="isOodDetected"
        class="ood-banner"
      >
        <span>⚠️</span>
        <div>
          <strong>Peringatan {{ result.ood.level }}:</strong>
          {{ result.ood.pesan }}
          <div v-if="result.ood.saran" class="ood-saran">
            {{ result.ood.saran }}
          </div>
        </div>
      </div>

      <!-- Layout utama -->
      <div class="result-layout">

        <!-- Kolom Kiri: Klasifikasi + Grad-CAM -->
        <div class="result-main">

          <!-- Card Klasifikasi -->
          <div
            class="classification-card"
            :class="classificationClass"
          >
            <div class="classification-top">

              <!-- Gambar + badge -->
              <div class="classification-image-wrap">
                <img
                  v-if="result.images?.original"
                  :src="`data:image/png;base64,${result.images.original}`"
                  alt="Gambar lesi kulit"
                  class="classification-img"
                />
                <div class="condition-badge">
                  🔍 Terdeteksi:
                  {{ result.classification.nama_penyakit }}
                </div>
              </div>

              <!-- Info klasifikasi -->
              <div class="classification-info">
                <div class="confidence-value">
                  {{ confidencePct }}%
                  <span class="confidence-label">
                    Tingkat Kepercayaan
                  </span>
                </div>

                <p class="classification-desc">
                  Model AI telah mengidentifikasi karakteristik
                  yang konsisten dengan
                  <strong>
                    {{ result.classification.nama_penyakit }}
                  </strong>
                  (kemungkinan tipe
                  {{ result.reasoning.subtipe }}).
                  {{ result.reasoning.subtipe_deskripsi }}.
                </p>

                <!-- Distribusi probabilitas -->
                <div class="prob-bars">
                  <div
                    v-for="(prob, cls) in result.classification.all_probabilities"
                    :key="cls"
                    class="prob-item"
                  >
                    <div class="prob-label">
                      <span>{{ formatClass(cls) }}</span>
                      <span>{{ (prob * 100).toFixed(1) }}%</span>
                    </div>
                    <div class="prob-bar-track">
                      <div
                        class="prob-bar-fill"
                        :class="cls === result.classification.predicted_class
                          ? 'prob-bar-fill--active' : ''"
                        :style="{ width: (prob * 100) + '%' }"
                      ></div>
                    </div>
                  </div>
                </div>

                <!-- Tags gejala -->
                <div class="symptom-tags">
                  <span
                    v-for="tag in symptomTags"
                    :key="tag"
                    class="symptom-tag"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>

            </div>
          </div>

          <!-- Card Grad-CAM -->
          <div class="gradcam-card">
            <div class="gradcam-header">
              <h2 class="gradcam-title">
                👁 Visualisasi Grad-CAM
              </h2>
              <div class="gradcam-legend">
                <span class="legend-item">
                  <span class="legend-dot legend-dot--red"></span>
                  Merah = Tinggi
                </span>
                <span class="legend-item">
                  <span class="legend-dot legend-dot--yellow"></span>
                  Kuning = Sedang
                </span>
                <span class="legend-item">
                  <span class="legend-dot legend-dot--blue"></span>
                  Biru = Rendah
                </span>
              </div>
            </div>

            <div class="gradcam-panels">
              <div class="gradcam-panel">
                <img
                  v-if="result.images?.original"
                  :src="`data:image/png;base64,${result.images.original}`"
                  alt="Gambar Original"
                  class="gradcam-img"
                />
                <div class="gradcam-caption">
                  Gambar Original
                </div>
              </div>

              <div class="gradcam-panel">
                <img
                  v-if="result.images?.heatmap"
                  :src="`data:image/png;base64,${result.images.heatmap}`"
                  alt="Grad-CAM Heatmap"
                  class="gradcam-img"
                />
                <div class="gradcam-caption">
                  Grad-CAM Heatmap
                </div>
              </div>

              <div class="gradcam-panel">
                <img
                  v-if="result.images?.overlay"
                  :src="`data:image/png;base64,${result.images.overlay}`"
                  alt="Overlay Grad-CAM"
                  class="gradcam-img"
                />
                <div class="gradcam-caption">
                  Overlay Grad-CAM
                </div>
              </div>
            </div>

            <!-- Statistik heatmap -->
            <div class="heatmap-stats">
              <div class="heatmap-stat">
                <div class="heatmap-stat-label">Kualitas</div>
                <div class="heatmap-stat-value">
                  {{ result.heatmap_analysis.quality.toUpperCase() }}
                </div>
              </div>
              <div class="heatmap-stat">
                <div class="heatmap-stat-label">Coverage</div>
                <div class="heatmap-stat-value">
                  {{ result.heatmap_analysis.coverage_pct.toFixed(1) }}%
                </div>
              </div>
              <div class="heatmap-stat">
                <div class="heatmap-stat-label">Focus Score</div>
                <div class="heatmap-stat-value">
                  {{ result.heatmap_analysis.focus_score.toFixed(3) }}
                </div>
              </div>
              <div class="heatmap-stat">
                <div class="heatmap-stat-label">Peak Area</div>
                <div class="heatmap-stat-value">
                  {{ result.heatmap_analysis.peak_location }}
                </div>
              </div>
            </div>
          </div>

          <!-- Card Penjelasan Sistem -->
          <div class="explanation-card">
            <h2 class="explanation-title">
              📋 Penjelasan Sistem
            </h2>

            <div class="explanation-section">
              <div class="explanation-section-label">
                Penjelasan Model
              </div>
              <p class="explanation-text">
                {{ result.reasoning.penjelasan_model }}
              </p>
            </div>

            <!-- Informasi Klinis (accordion) -->
            <div class="accordion">
              <button
                class="accordion-btn"
                @click="showClinical = !showClinical"
              >
                <span>ℹ️ Informasi Klinis Lengkap</span>
                <span>{{ showClinical ? '▲' : '▼' }}</span>
              </button>
              <div v-if="showClinical" class="accordion-body">
                <div class="clinical-section">
                  <strong>
                    {{ result.classification.nama_penyakit }}
                  </strong>
                  <p>{{ result.reasoning.fitur_klinis }}</p>
                </div>
                <div class="clinical-section">
                  <strong>Lokasi Predileksi</strong>
                  <p>{{ result.reasoning.lokasi_predileksi }}</p>
                </div>
                <div class="clinical-section">
                  <strong>Interpretasi Heatmap</strong>
                  <p>{{ result.reasoning.heatmap_interpret }}</p>
                </div>
              </div>
            </div>

            <!-- Ambiguitas -->
            <div
              v-if="hasAmbiguitas"
              class="ambiguitas-banner"
            >
              ⚠️ {{ result.reasoning.ambiguitas }}
            </div>

            <!-- Rekomendasi -->
            <div class="rekomendasi-banner">
              ✅
              <strong>Rekomendasi:</strong>
              {{ result.reasoning.rekomendasi }}
            </div>

          </div>

        </div>

        <!-- Kolom Kanan: Langkah Selanjutnya -->
        <div class="result-sidebar">

          <div class="next-steps-card">
            <h3 class="next-steps-title">
              Langkah Selanjutnya yang Direkomendasikan
            </h3>

            <div class="next-step-item">
              <div class="next-step-icon next-step-icon--blue">
                🏥
              </div>
              <div>
                <div class="next-step-title">
                  Konsultasi Dokter
                </div>
                <div class="next-step-desc">
                  Konsultasikan hasil ini dengan dokter
                  spesialis kulit untuk diagnosis resmi.
                </div>
              </div>
            </div>

            <div class="next-step-item">
              <div class="next-step-icon next-step-icon--teal">
                💊
              </div>
              <div>
                <div class="next-step-title">
                  Perawatan Kulit
                </div>
                <div class="next-step-desc">
                  Jaga kelembaban kulit dan hindari pemicu
                  iritasi sambil menunggu konsultasi.
                </div>
              </div>
            </div>

            <div class="next-step-item">
              <div class="next-step-icon next-step-icon--grey">
                🔄
              </div>
              <div>
                <div class="next-step-title">
                  Pemindaian Lanjutan
                </div>
                <div class="next-step-desc">
                  Lakukan analisis ulang untuk memantau
                  perkembangan kondisi kulit.
                </div>
              </div>
            </div>
          </div>

          <!-- Tombol aksi -->
          <RouterLink
            to="/scan"
            class="btn-primary btn-new-scan"
          >
            🔬 Mulai Pindaian Baru
          </RouterLink>

          <RouterLink
            to="/history"
            class="btn-history"
          >
            📋 Lihat Riwayat
          </RouterLink>

        </div>

      </div>

      <!-- Footer -->
      <footer class="result-footer">
        <div class="footer-links">
          <a href="#">Kebijakan Privasi</a>
          <a href="#">Ketentuan Layanan</a>
          <RouterLink to="/about">Sanggahan Medis</RouterLink>
        </div>
        <p class="footer-copy">
          © 2024 DermAssist Health. Hanya untuk tujuan
          informasi klinis.
        </p>
      </footer>

    </template>

  </div>
</template>

<script setup>
import { ref, computed }  from 'vue'
import { RouterLink }     from 'vue-router'
import { useSkinStore }   from '@/stores/counter'

const store        = useSkinStore()
const result       = computed(() => store.analysisResult)
const showClinical = ref(false)

const scanDate = new Date().toLocaleDateString('id-ID', {
  day: 'numeric', month: 'long', year: 'numeric'
})

// Confidence dalam persen
const confidencePct = computed(() => {
  if (!result.value) return 0
  return (result.value.classification.confidence * 100).toFixed(1)
})

// Warna card berdasarkan kelas
const classificationClass = computed(() => {
  if (!result.value) return ''
  return result.value.classification.predicted_class === 'eczema'
    ? 'classification-card--eczema'
    : 'classification-card--psoriasis'
})

// Tag gejala berdasarkan kelas
const symptomTags = computed(() => {
  if (!result.value) return []
  return result.value.classification.predicted_class === 'eczema'
    ? ['Inflamasi', 'Kulit Kering', 'Eritema']
    : ['Plak Sisik', 'Eritematosa', 'Batas Tegas']
})

// Format nama kelas
function formatClass(cls) {
  return cls === 'eczema' ? 'Eksim (Eczema)' : 'Psoriasis'
}

// Cek apakah OOD terdeteksi — gunakan key "detected" sesuai response
const isOodDetected = computed(() => {
  return result.value?.ood?.detected === true
})

// Cek apakah ada ambiguitas
const hasAmbiguitas = computed(() => {
  const amb = result.value?.reasoning?.ambiguitas
  return amb && amb.trim() !== ''
})
</script>

<style scoped>
.result-page {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.no-result {
  text-align: center;
  padding: var(--space-xl);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
}

/* Breadcrumb */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: 13px;
}

.breadcrumb-link {
  color: var(--color-primary);
  text-decoration: none;
}

.breadcrumb-sep {
  color: var(--color-outline);
}

.breadcrumb-current {
  color: var(--color-on-surface);
  font-weight: 500;
}

/* Header */
.result-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.result-date {
  color: var(--color-on-surface-variant);
  margin-top: var(--space-xs);
}

/* Disclaimer */
.disclaimer-banner {
  background-color: var(--color-error-container);
  color: var(--color-on-error-container);
  border-radius: var(--radius-default);
  padding: var(--space-md);
  display: flex;
  align-items: flex-start;
  gap: var(--space-sm);
  font-size: 14px;
  line-height: 1.6;
}

.disclaimer-icon {
  font-size: 18px;
  flex-shrink: 0;
}

/* OOD Banner */
.ood-banner {
  background-color: #fff3cd;
  color: #664d03;
  border-radius: var(--radius-default);
  padding: var(--space-md);
  display: flex;
  gap: var(--space-sm);
  font-size: 14px;
  line-height: 1.6;
}

.ood-saran {
  margin-top: var(--space-xs);
  font-size: 13px;
  opacity: 0.85;
}

/* Layout */
.result-layout {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: var(--space-lg);
  align-items: start;
}

.result-main {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

/* Classification Card */
.classification-card {
  background-color: var(--color-surface-container-lowest);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-level-1);
  padding: var(--space-lg);
  border-left: 4px solid transparent;
}

.classification-card--eczema {
  border-left-color: var(--color-secondary);
}

.classification-card--psoriasis {
  border-left-color: var(--color-primary);
}

.classification-top {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: var(--space-lg);
  align-items: start;
}

.classification-image-wrap {
  position: relative;
  width: 100%;
  max-width: 240px;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f6f8fb;
  border-radius: var(--radius-md);
  overflow: hidden;
}

.classification-img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
  border-radius: var(--radius-md);
}

.condition-badge {
  position: absolute;
  bottom: var(--space-sm);
  left: var(--space-sm);
  right: var(--space-sm);
  background-color: rgba(0, 71, 141, 0.85);
  color: white;
  font-size: 11px;
  font-weight: 600;
  padding: 4px var(--space-sm);
  border-radius: var(--radius-sm);
  text-align: center;
}

.confidence-value {
  font-size: 40px;
  font-weight: 700;
  color: var(--color-primary);
  line-height: 1;
  display: flex;
  align-items: baseline;
  gap: var(--space-sm);
}

.confidence-label {
  font-size: 14px;
  font-weight: 400;
  color: var(--color-on-surface-variant);
}

.classification-desc {
  font-size: 14px;
  color: var(--color-on-surface-variant);
  line-height: 1.6;
  margin-top: var(--space-sm);
}

/* Prob bars */
.prob-bars {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  margin-top: var(--space-md);
}

.prob-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.prob-label {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: var(--color-on-surface-variant);
}

.prob-bar-track {
  height: 8px;
  background-color: var(--color-surface-container);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.prob-bar-fill {
  height: 100%;
  background-color: var(--color-outline-variant);
  border-radius: var(--radius-full);
  transition: width 0.5s ease;
}

.prob-bar-fill--active {
  background-color: var(--color-primary);
}

/* Tags */
.symptom-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  margin-top: var(--space-md);
}

.symptom-tag {
  background-color: var(--color-surface-container);
  color: var(--color-primary);
  font-size: 12px;
  font-weight: 500;
  padding: 4px var(--space-sm);
  border-radius: var(--radius-full);
}

/* Grad-CAM */
.gradcam-card {
  background-color: var(--color-surface-container-lowest);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-level-1);
  padding: var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.gradcam-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

.gradcam-title {
  font-size: 18px;
  font-weight: 600;
}

.gradcam-legend {
  display: flex;
  gap: var(--space-md);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--color-on-surface-variant);
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: var(--radius-full);
}

.legend-dot--red    { background-color: #E53935; }
.legend-dot--yellow { background-color: #FDD835; }
.legend-dot--blue   { background-color: #1E88E5; }

.gradcam-panels {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-md);
}

.gradcam-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xs);
}

.gradcam-img {
  width: 100%;
  height: 220px;
  display: block;
  object-fit: contain;
  background: #f6f8fb;
  border-radius: var(--radius-md);
}

.classification-image-wrap,
.gradcam-img {
  border: 1px solid var(--color-outline-variant);
}

.gradcam-caption {
  font-size: 12px;
  color: var(--color-on-surface-variant);
  text-align: center;
  margin-top: 6px;
}

/* Heatmap stats */
.heatmap-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-md);
  background-color: var(--color-surface-container-low);
  border-radius: var(--radius-default);
  padding: var(--space-md);
}

.heatmap-stat-label {
  font-size: 11px;
  color: var(--color-on-surface-variant);
  font-weight: 500;
}

.heatmap-stat-value {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-on-surface);
  margin-top: 2px;
}

/* Explanation */
.explanation-card {
  background-color: var(--color-surface-container-lowest);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-level-1);
  padding: var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.explanation-title {
  font-size: 18px;
  font-weight: 600;
}

.explanation-section-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-on-surface-variant);
  margin-bottom: var(--space-xs);
}

.explanation-text {
  font-size: 14px;
  color: var(--color-on-surface);
  line-height: 1.7;
}

/* Accordion */
.accordion-btn {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-surface-container-low);
  border: none;
  border-radius: var(--radius-default);
  padding: var(--space-sm) var(--space-md);
  font-size: 14px;
  font-weight: 500;
  color: var(--color-primary);
  cursor: pointer;
  font-family: var(--font-family);
}

.accordion-body {
  background-color: var(--color-surface-container-low);
  border-radius: 0 0 var(--radius-default) var(--radius-default);
  padding: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.clinical-section {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.clinical-section strong {
  font-size: 13px;
  color: var(--color-on-surface);
}

.clinical-section p {
  font-size: 13px;
  color: var(--color-on-surface-variant);
  line-height: 1.6;
}

/* Ambiguitas */
.ambiguitas-banner {
  background-color: #fff3cd;
  color: #664d03;
  border-radius: var(--radius-default);
  padding: var(--space-md);
  font-size: 14px;
  line-height: 1.6;
}

/* Rekomendasi */
.rekomendasi-banner {
  background-color: #d4edda;
  color: #155724;
  border-radius: var(--radius-default);
  padding: var(--space-md);
  font-size: 14px;
  line-height: 1.6;
}

/* Sidebar */
.result-sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  position: sticky;
  top: 80px;
}

.next-steps-card {
  background-color: var(--color-surface-container-lowest);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-level-1);
  padding: var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.next-steps-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-on-surface);
}

.next-step-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-md);
}

.next-step-icon {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-default);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}

.next-step-icon--blue { background-color: var(--color-surface-container); }
.next-step-icon--teal { background-color: var(--color-secondary-container); }
.next-step-icon--grey { background-color: var(--color-surface-container-high); }

.next-step-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-on-surface);
}

.next-step-desc {
  font-size: 13px;
  color: var(--color-on-surface-variant);
  margin-top: 2px;
  line-height: 1.5;
}

.btn-new-scan {
  display: block;
  text-align: center;
  text-decoration: none;
  padding: var(--space-sm) var(--space-md);
  font-size: 14px;
}

.btn-history {
  display: block;
  text-align: center;
  text-decoration: none;
  padding: var(--space-sm) var(--space-md);
  font-size: 14px;
  border: 1px solid var(--color-outline-variant);
  border-radius: var(--radius-default);
  color: var(--color-on-surface);
  transition: background-color 0.15s ease;
}

.btn-history:hover {
  background-color: var(--color-surface-container);
}

/* Footer */
.result-footer {
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
}

.footer-links a {
  color: var(--color-primary);
  text-decoration: none;
  font-size: 13px;
}

.footer-copy {
  font-size: 11px;
  color: var(--color-outline);
}
</style>