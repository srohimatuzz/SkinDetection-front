<template>
  <div class="guide-page">

    <!-- 1. Persiapan Foto -->
    <div class="guide-section-card">
      <h2 class="guide-section-title">
        1. Persiapan Foto
      </h2>
      <p class="guide-section-sub">
        Ikuti tips berikut agar hasil analisis lebih akurat.
      </p>

      <div class="prep-grid">
        <div class="prep-item">
          <div class="prep-icon prep-icon--yellow">☀️</div>
          <div class="prep-label">Cahaya Terang</div>
          <div class="prep-desc">
            Gunakan cahaya alami atau lampu yang cukup.
          </div>
        </div>
        <div class="prep-item">
          <div class="prep-icon prep-icon--blue">🎯</div>
          <div class="prep-label">Fokus Tajam</div>
          <div class="prep-desc">
            Area lesi harus jelas dan tidak blur.
          </div>
        </div>
        <div class="prep-item">
          <div class="prep-icon prep-icon--teal">📐</div>
          <div class="prep-label">Jarak 10–15 cm</div>
          <div class="prep-desc">
            Ambil foto dari jarak sekitar 10–15 cm dari kulit.
          </div>
        </div>
        <div class="prep-item">
          <div class="prep-icon prep-icon--red">🚫</div>
          <div class="prep-label">Tanpa Filter</div>
          <div class="prep-desc">
            Jangan gunakan filter atau editan foto.
          </div>
        </div>
      </div>

      <!-- Contoh foto -->
      <div class="photo-example-grid">
        <div class="photo-example photo-example--good">
          <div class="photo-example-label photo-example-label--good">
            ✅ Contoh Foto yang Baik
          </div>
          <div class="photo-example-img">
            <img
              :src="kualitasBagus"
              alt="Contoh Foto yang Baik"
              class="photo-example-image"
            />
          </div>
          <ul class="photo-tips photo-tips--good">
            <li>✓ Cahaya cukup</li>
            <li>✓ Fokus tajam</li>
            <li>✓ Area lesi jelas</li>
            <li>✓ Tidak blur</li>
          </ul>
        </div>
        <div class="photo-example photo-example--bad">
          <div class="photo-example-label photo-example-label--bad">
            ❌ Contoh Foto yang Kurang Baik
          </div>
          <div class="photo-example-img">
            <img
              :src="kualitasBuruk"
              alt="Contoh Foto yang Kurang Baik"
              class="photo-example-image"
            />
          </div>
          <ul class="photo-tips photo-tips--bad">
            <li>✗ Gelap / bayangan</li>
            <li>✗ Blur / tidak fokus</li>
            <li>✗ Terlalu jauh / terlalu dekat</li>
            <li>✗ Menggunakan filter</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 2. Langkah Penggunaan -->
    <div class="guide-section-card">
      <h2 class="guide-section-title">2. Langkah Penggunaan</h2>

      <div class="steps-flow">
        <div
          v-for="(step, i) in usageSteps"
          :key="i"
          class="step-flow-item"
        >
          <div class="step-flow-circle">{{ i + 1 }}</div>
          <div class="step-flow-content">
            <div class="step-flow-title">{{ step.title }}</div>
            <div class="step-flow-desc">{{ step.desc }}</div>
          </div>
          <div v-if="i < usageSteps.length - 1" class="step-flow-line"></div>
        </div>
      </div>
    </div>

    <!-- 3. Memahami Hasil Analisis -->
    <div class="guide-section-card">
      <h2 class="guide-section-title">3. Memahami Hasil Analisis</h2>
      <p class="guide-section-sub">
        Setelah analisis selesai, sistem akan menampilkan beberapa komponen.
        Berikut penjelasannya.
      </p>

      <div class="result-guide-grid">

        <div class="result-guide-item">
          <div class="result-guide-header">
            <div class="result-guide-icon">🏷</div>
            <div class="result-guide-title">Prediksi</div>
          </div>
          <div class="result-guide-desc">
            Kategori penyakit yang dipilih AI berdasarkan pola
            visual pada gambar: <strong>Eczema</strong> atau
            <strong>Psoriasis</strong>.
          </div>
        </div>

        <div class="result-guide-item">
          <div class="result-guide-header">
            <div class="result-guide-icon">📊</div>
            <div class="result-guide-title">Confidence Score</div>
          </div>
          <div class="result-guide-desc">
            Tingkat keyakinan model (0–100%). Semakin tinggi nilai,
            semakin yakin model. Namun bukan berarti pasti benar.
          </div>
        </div>

        <div class="result-guide-item">
          <div class="result-guide-header">
            <div class="result-guide-icon">🔥</div>
            <div class="result-guide-title">Visualisasi Grad-CAM</div>
          </div>
          <div class="result-guide-desc">
            Heatmap yang menunjukkan area yang paling diperhatikan
            model saat membuat prediksi.
          </div>
          <div class="heatmap-legend">
            <div class="legend-item">
              <div class="legend-dot" style="background:#E53935"></div>
              <span><strong>Merah</strong> — Area paling berpengaruh</span>
            </div>
            <div class="legend-item">
              <div class="legend-dot" style="background:#FDD835"></div>
              <span><strong>Kuning</strong> — Perhatian sedang</span>
            </div>
            <div class="legend-item">
              <div class="legend-dot" style="background:#1E88E5"></div>
              <span><strong>Biru</strong> — Hampir tidak digunakan</span>
            </div>
          </div>
        </div>

        <div class="result-guide-item">
          <div class="result-guide-header">
            <div class="result-guide-icon">📋</div>
            <div class="result-guide-title">Penjelasan Rule-Based</div>
          </div>
          <div class="result-guide-desc">
            Penjelasan tekstual berbasis aturan klinis yang menjelaskan
            alasan AI memberikan prediksi tersebut, termasuk subtipe
            dan karakteristik klinis.
          </div>
        </div>

      </div>
    </div>

    <!-- 4. FAQ -->
    <div class="guide-section-card">
      <h2 class="guide-section-title">
        4. FAQ (Pertanyaan yang Sering Diajukan)
      </h2>

      <div class="faq-list">
        <div
          v-for="(item, i) in faqs"
          :key="i"
          class="faq-item"
        >
          <button
            class="faq-question"
            @click="toggleFaq(i)"
          >
            {{ item.question }}
            <svg
              class="faq-chevron"
              :class="{ 'faq-chevron--open': openFaq === i }"
              width="16" height="16" viewBox="0 0 24 24" fill="none"
            >
              <path d="M6 9l6 6 6-6"
                stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
          <div v-if="openFaq === i" class="faq-answer">
            {{ item.answer }}
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="guide-footer">
      <p class="footer-brand">DermAssist</p>
      <div class="footer-links">
            <a href="#">Kebijakan Privasi</a>
            <a href="#">Syarat &amp; Ketentuan</a>
            <RouterLink to="/about">Sanggahan Medis</RouterLink>
            <a href="#">Hubungi Spesialis</a>
      </div>
      <p class="footer-copy">
        © 2026 DermAssist. Hanya untuk tujuan informasi klinis. Bukan pengganti saran medis profesional.
      </p>
    </footer>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import kualitasBagus from '@/assets/kualitas-bagus.jpg'
import kualitasBuruk from '@/assets/kualitas-buruk.jpg'

const openFaq = ref(null)

function toggleFaq(i) {
  openFaq.value = openFaq.value === i ? null : i
}

const usageSteps = [
  {
    title: 'Upload Foto',
    desc : 'Buka menu Scan Kulit, unggah foto area lesi kulit yang ingin diperiksa.'
  },
  {
    title: 'Klik Analisis',
    desc : 'Pastikan checklist terpenuhi, lalu tekan tombol Mulai Analisis AI.'
  },
  {
    title: 'Tunggu Proses',
    desc : 'Sistem akan memproses gambar menggunakan model AI. Tunggu beberapa saat.'
  },
  {
    title: 'Lihat Hasil',
    desc : 'Hasil prediksi, confidence score, dan visualisasi Grad-CAM akan ditampilkan.'
  },
  {
    title: 'Pelajari Penjelasan AI',
    desc : 'Baca penjelasan Rule-Based Reasoning dan rekomendasi tindak lanjut dari sistem.'
  },
]

const faqs = [
  {
    question: 'Apakah hasil AI selalu benar?',
    answer  : 'Tidak. Hasil analisis merupakan prediksi berbasis pola yang dipelajari model AI dan masih memiliki kemungkinan kesalahan. Selalu konfirmasi dengan dokter spesialis kulit.'
  },
  {
    question: 'Mengapa hasil saya berbeda dengan perkiraan saya?',
    answer  : 'Perbedaan hasil dapat dipengaruhi kualitas gambar, pencahayaan, sudut pengambilan foto, atau karakteristik lesi kulit yang memiliki kemiripan visual dengan kategori lain.'
  },
  {
    question: 'Mengapa nilai confidence saya rendah?',
    answer  : 'Nilai confidence rendah menunjukkan model kurang yakin dengan prediksinya. Hal ini bisa disebabkan gambar yang kurang jelas, buram, atau kualitas foto yang tidak memadai.'
  },
  {
    question: 'Apakah DermAssist dapat menggantikan dokter?',
    answer  : 'Tidak. DermAssist hanya berfungsi sebagai alat bantu deteksi awal. Diagnosis dan keputusan medis tetap harus dilakukan oleh tenaga kesehatan profesional.'
  },
  {
    question: 'Apa yang harus saya lakukan setelah melihat hasil?',
    answer  : 'Gunakan hasil sebagai referensi awal, lalu konsultasikan dengan dokter spesialis kulit (dermatologis) untuk mendapatkan diagnosis dan penanganan yang tepat.'
  },
]
</script>

<style scoped>
.guide-page {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

/* Section card */
.guide-section-card {
  background-color: var(--color-surface-container-lowest);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-level-1);
  padding: var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.guide-section-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-on-surface);
}

.guide-section-sub {
  font-size: 13px;
  color: var(--color-on-surface-variant);
  line-height: 1.6;
}

/* Prep grid */
.prep-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-md);
}

.prep-item {
  background-color: var(--color-surface-container-low);
  border-radius: var(--radius-lg);
  padding: var(--space-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
  text-align: center;
}

.prep-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.prep-icon--yellow { background-color: #fef9c3; }
.prep-icon--blue   { background-color: #dbeafe; }
.prep-icon--teal   { background-color: var(--color-secondary-container); }
.prep-icon--red    { background-color: var(--color-error-container); }

.prep-label {
  font-size: 13px;
  font-weight: 700;
  color: var(--color-on-surface);
}

.prep-desc {
  font-size: 12px;
  color: var(--color-on-surface-variant);
  line-height: 1.5;
}

/* Photo examples */
.photo-example-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
}

.photo-example {
  border-radius: var(--radius-lg);
  padding: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.photo-example--good { background-color: #f0fdf4; border: 1px solid #86efac; }
.photo-example--bad  { background-color: #fef2f2; border: 1px solid #fca5a5; }

.photo-example-label {
  font-size: 13px;
  font-weight: 700;
}

.photo-example-label--good { color: #15803d; }
.photo-example-label--bad  { color: #b91c1c; }

.photo-example-img {
  height: 180px;
  border-radius: var(--radius-default);
  overflow: hidden;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.photo-example-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.photo-tips {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.photo-tips li { font-size: 12px; line-height: 1.5; }
.photo-tips--good li { color: #15803d; }
.photo-tips--bad  li { color: #b91c1c; }

/* Steps flow */
.steps-flow {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.step-flow-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-md);
  position: relative;
}

.step-flow-circle {
  width: 32px;
  height: 32px;
  min-width: 32px;
  border-radius: var(--radius-full);
  background-color: var(--color-primary);
  color: white;
  font-size: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.step-flow-content {
  padding: var(--space-xs) 0 var(--space-lg);
  flex: 1;
}

.step-flow-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 4px;
}

.step-flow-desc {
  font-size: 13px;
  color: var(--color-on-surface-variant);
  line-height: 1.6;
}

.step-flow-line {
  position: absolute;
  left: 15px;
  top: 32px;
  bottom: 0;
  width: 2px;
  background-color: var(--color-outline-variant);
}

/* Result guide */
.result-guide-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
}

.result-guide-item {
  background-color: var(--color-surface-container-low);
  border-radius: var(--radius-lg);
  padding: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.result-guide-header {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.result-guide-icon { font-size: 20px; }

.result-guide-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--color-on-surface);
}

.result-guide-desc {
  font-size: 13px;
  color: var(--color-on-surface-variant);
  line-height: 1.6;
}

/* Heatmap legend */
.heatmap-legend {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: var(--space-xs);
  background-color: var(--color-surface-container);
  border-radius: var(--radius-default);
  padding: var(--space-sm);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: 12px;
  color: var(--color-on-surface-variant);
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: var(--radius-full);
  flex-shrink: 0;
}

/* FAQ */
.faq-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.faq-item {
  border: 1px solid var(--color-outline-variant);
  border-radius: var(--radius-default);
  overflow: hidden;
}

.faq-question {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-md) var(--space-lg);
  background: none;
  border: none;
  text-align: left;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-primary);
  cursor: pointer;
  font-family: var(--font-family);
}

.faq-chevron {
  transition: transform 0.2s ease;
  flex-shrink: 0;
}

.faq-chevron--open { transform: rotate(180deg); }

.faq-answer {
  padding: 0 var(--space-lg) var(--space-md);
  font-size: 13px;
  color: var(--color-on-surface-variant);
  line-height: 1.7;
}

/* Footer */
.guide-footer {
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

@media (max-width: 768px) {
  .prep-grid { grid-template-columns: repeat(2, 1fr); }
  .photo-example-grid { grid-template-columns: 1fr; }
  .result-guide-grid { grid-template-columns: 1fr; }
}
</style>