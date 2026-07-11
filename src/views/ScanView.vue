<template>
  <LoadingOverlay :isVisible="isLoading" />
  <div class="scan-page">

    <div class="scan-layout">

      <!-- Panel Kiri: Upload + Aksi -->
      <div class="upload-section">
        <section class="upload-card">
        <!-- Area Upload -->
        <div
          class="upload-area"
          :class="{
            'upload-area--dragover': isDragging,
            'upload-area--filled'  : previewUrl
          }"
          @dragover.prevent="isDragging = true"
          @dragleave.prevent="isDragging = false"
          @drop.prevent="onDrop"
          @click="triggerFileInput"
        >
          <div v-if="previewUrl" class="preview-wrapper">
            <img :src="previewUrl" alt="Preview" class="preview-img" />
            <button class="btn-remove-img" @click.stop="removeImage">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12"
                  stroke="white" stroke-width="2.5" stroke-linecap="round"/>
              </svg>
            </button>
          </div>

          <div v-else class="upload-placeholder">
            <div class="upload-icon-wrap">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"
                  stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round"/>
                <polyline points="17 8 12 3 7 8"
                  stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round"/>
                <line x1="12" y1="3" x2="12" y2="15"
                  stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
        <h3 class="upload-title">
          Unggah Foto Kulit
        </h3>

        <p class="upload-description">
          Tarik file ke sini atau
          <span class="upload-link">
            pilih foto
          </span>
          dari perangkat Anda.
        </p>
            <div class="upload-formats">
              <span class="format-badge">JPG</span>
              <span class="format-badge">JPEG</span>
              <span class="format-badge">PNG</span>
              <span class="format-badge">WebP</span>
              <span class="format-badge">⬇ Maks 10MB</span>
            </div>
          </div>
        </div>

        <input
          ref="fileInputRef"
          type="file"
          accept="image/jpg,image/jpeg,image/png,image/webp"
          style="display:none"
          @change="onFileChange"
        />

        <div v-if="selectedFile" class="file-info">
          <span class="file-info-name">📄 {{ selectedFile.name }}</span>
          <span class="file-info-size">{{ fileSizeKB }} KB</span>
        </div>

        <!-- Tombol Analisis -->
        <div class="analyze-wrap">
          <button
            class="btn-analyze"
            :disabled="!selectedFile || isLoading"
            @click="analyzeImage"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8"
                stroke="white" stroke-width="2"/>
              <path d="M21 21l-3-3"
                stroke="white" stroke-width="2" stroke-linecap="round"/>
              <path d="M11 8v6M8 11h6"
                stroke="white" stroke-width="2" stroke-linecap="round"/>
            </svg>
            Mulai Analisis AI
          </button>
        </div>
        </section>

        <div v-if="errorMsg" class="error-banner">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9"
              stroke="var(--color-error)" stroke-width="2"/>
            <path d="M12 8v4M12 16h.01"
              stroke="var(--color-error)" stroke-width="2" stroke-linecap="round"/>
          </svg>
          {{ errorMsg }}
        </div>

        <!-- Rejection message — gambar ditolak validasi -->
        <div v-if="rejectionMsg" class="rejection-banner">
          <div class="rejection-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9"
                stroke="currentColor" stroke-width="2"/>
              <path d="M15 9l-6 6M9 9l6 6"
                stroke="currentColor" stroke-width="2"
                stroke-linecap="round"/>
            </svg>
          </div>
          <div>
            <div class="rejection-title">
              Gambar Tidak Dapat Dianalisis
            </div>
            <div class="rejection-text">{{ rejectionMsg }}</div>
            <div class="rejection-hint">
              Pastikan gambar menampilkan lesi kulit Eczema atau
              Psoriasis dengan jelas sebelum menganalisis.
            </div>
          </div>
        </div>

        <!-- Checklist Sebelum Analisis -->
        <div class="info-layout">
        <section class="checklist-card">
        <!-- Kiri -->
        <div class="checklist-content">
          <h3 class="checklist-title">Checklist Sebelum Analisis</h3>

          <div
            v-for="item in checklist"
            :key="item"
            class="checklist-item"
          >
            <div class="checklist-icon">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 13l4 4L19 7"
                  stroke="white"
                  stroke-width="2.5"
                  stroke-linecap="round"
                />
              </svg>
            </div>

            <span>{{ item }}</span>
          </div>

          <RouterLink
            to="/guide"
            class="checklist-link"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 19.5A2.5 2.5 0 016.5 17H20"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"
                stroke="currentColor"
                stroke-width="2"
              />
            </svg>

            Lihat panduan lengkap cara pengambilan foto
          </RouterLink>
        </div>

      <div class="checklist-illustration">
        <img
          src="@/assets/icon-hp.png"
          alt="Contoh Pengambilan Foto Kulit"
          class="phone-image"
        />
      </div>

</section>

      <div class="info-side">
        <!-- Privasi -->
        <section class="privacy-note">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
              stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <div class="privacy-content">
          <div class="privacy-header">
            <strong>Data Anda Aman &amp; Terjaga.</strong>
          </div>
          <p>Kami memprioritaskan privasi medis Anda.
            Foto yang diunggah hanya digunakan untuk proses
            analisis AI dan tidak dibagikan kepada pihak lain.
          </p>
        </div>
        </section>

        <!-- Disclaimer -->
        <section class="disclaimer-note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
              stroke="var(--color-error)" stroke-width="2" stroke-linecap="round"/>
            <line x1="12" y1="9" x2="12" y2="13"
              stroke="var(--color-error)" stroke-width="2" stroke-linecap="round"/>
            <line x1="12" y1="17" x2="12.01" y2="17"
              stroke="var(--color-error)" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <div>
            <div class="disclaimer-title">Disclaimer Medis</div>
            <div class="disclaimer-text">
              Sistem ini adalah prototype penelitian dan bukan alat
              diagnosis medis resmi. Hasil wajib dikonfirmasi oleh
              dokter spesialis kulit (dermatologis).
            </div>
          </div>
        </section>
      </div>
      </div>

        <!-- Footer -->
        <footer class="scan-footer">
          <p class="footer-brand">DermAssist Health</p>
          <div class="footer-links">
            <a href="#">Kebijakan Privasi</a>
            <a href="#">Ketentuan Layanan</a>
            <a href="#">Sanggahan Medis</a>
          </div>
          <p class="footer-copy">
            © 2024 DermAssist Health. Hanya untuk tujuan informasi klinis.
          </p>
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed }   from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import axios               from 'axios'
import { useSkinStore }    from '@/stores/counter'
import LoadingOverlay      from '@/components/LoadingOverlay.vue'

const router       = useRouter()
const store        = useSkinStore()
const fileInputRef = ref(null)
const selectedFile = ref(null)
const previewUrl   = ref(null)
const isDragging   = ref(false)
const isLoading    = ref(false)
const errorMsg     = ref('')
const rejectionMsg = ref('')
const checklist = [
  'Cahaya cukup dan merata',
  'Foto tidak blur / fokus tajam',
  'Area lesi memenuhi frame',
  'Jarak kamera 10–15 cm dari kulit',
  'Tidak menggunakan filter atau editan',
]

const fileSizeKB = computed(() =>
  selectedFile.value
    ? (selectedFile.value.size / 1024).toFixed(1)
    : 0
)

function triggerFileInput() {
  if (previewUrl.value) return
  fileInputRef.value.click()
}

function onFileChange(event) {
  const file = event.target.files[0]
  if (file) setFile(file)
}

function onDrop(event) {
  isDragging.value = false
  const file = event.dataTransfer.files[0]
  if (file) setFile(file)
}

function setFile(file) {
  errorMsg.value = ''
  const allowed = ['image/jpeg', 'image/png', 'image/webp']
  if (!allowed.includes(file.type)) {
    errorMsg.value = 'Format tidak didukung. Gunakan JPG, PNG, atau WebP.'
    return
  }
  if (file.size > 10 * 1024 * 1024) {
    errorMsg.value = 'Ukuran file terlalu besar. Maksimal 10MB.'
    return
  }
  selectedFile.value = file
  previewUrl.value   = URL.createObjectURL(file)
}

function removeImage() {
  selectedFile.value = null
  previewUrl.value   = null
  errorMsg.value     = ''
  if (fileInputRef.value) fileInputRef.value.value = ''
}

async function analyzeImage() {
  if (!selectedFile.value) return
  isLoading.value = true
  errorMsg.value  = ''
  rejectionMsg.value = ''
  try {
    const formData = new FormData()
    formData.append('file', selectedFile.value)
    const response = await axios.post(
      'http://127.0.0.1:8000/analyze',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )
    store.setResult(response.data)
    router.push({ name: 'result' })

  } catch (err) {
    if (err.response?.status === 422) {
      // Gambar ditolak oleh validasi input
      const detail = err.response.data?.detail
      if (detail?.type === 'input_validation_failed') {
        rejectionMsg.value = detail.message
      } else {
        errorMsg.value = 'Gambar tidak dapat diproses.'
      }
    } else {
      errorMsg.value = err.response?.data?.detail
        || 'Tidak dapat terhubung ke server.'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.scan-page {
  display: flex;
  flex-direction: column;
}

.scan-layout {
  display: grid;
  grid-template-columns: 1fr;
}

.info-layout{
    display:grid;
    grid-template-columns: 2fr 1fr;
    gap:24px;
    align-items:start;
}

.info-side{
    display:flex;
    flex-direction:column;
    gap:20px;
}

/* Upload */
.upload-card{
    background:white;
    border-radius:20px;
    padding:32px;
    box-shadow:var(--shadow-level-1);
}

.upload-title{
    font-size:22px;
    font-weight:700;
    color:var(--color-primary);
}

.upload-description{
    margin-top:8px;
    color:var(--color-on-surface-variant);
}

.privacy-note{
    display:flex;
    gap:20px;
    background:#eff6ff;
    border:1px solid #bfdbfe;
    border-radius:20px;
    padding:24px;
}

.privacy-header{
    display:flex;
    justify-content:space-between;
    align-items:center;
}

.disclaimer-note{
    background:#fef2f2;
    border:1px solid #fecaca;
    border-radius:20px;
    padding:24px;
}

.disclaimer-title{
    font-weight:700;
    color:#dc2626;
    margin-bottom:8px;
}

.scan-footer{
    margin-top:30px;
    border-top:1px solid #e5e7eb;
    padding-top:24px;
    text-align:center;
}

.upload-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.upload-area {
  border: 2px dashed var(--color-outline-variant);
  border-radius: var(--radius-lg);
  min-height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.2s, background-color 0.2s;
  background-color: var(--color-surface-container-lowest);
  position: relative;
  padding: var(--space-xl);
}

.upload-area:hover {
  border-color: var(--color-primary);
  background-color: var(--color-surface-container-low);
}

.upload-area--dragover {
  border-color: var(--color-primary);
  background-color: var(--color-surface-container);
}

.upload-area--filled {
  cursor: default;
  padding: var(--space-md);
  border-style: solid;
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
  text-align: center;
}

.upload-icon-wrap {
  width: 60px;
  height: 60px;
  background-color: var(--color-surface-container);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
}

.upload-text {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-primary);
}

.upload-hint {
  font-size: 14px;
  color: var(--color-on-surface-variant);
}

.upload-link {
  color: var(--color-primary);
  font-weight: 600;
  text-decoration: underline;
}

.upload-formats {
  display: flex;
  gap: var(--space-sm);
  flex-wrap: wrap;
  justify-content: center;
  margin-top: var(--space-xs);
}

.format-badge {
  border: 1px solid var(--color-outline-variant);
  border-radius: var(--radius-full);
  padding: 3px var(--space-sm);
  font-size: 12px;
  color: var(--color-on-surface-variant);
}

.preview-wrapper { position: relative; width: 100%; }

.preview-img {
  width: 100%;
  max-height: 280px;
  object-fit: contain;
  border-radius: var(--radius-md);
  display: block;
}

.btn-remove-img {
  position: absolute;
  top: var(--space-sm);
  right: var(--space-sm);
  background-color: var(--color-error);
  border: none;
  border-radius: var(--radius-full);
  width: 26px;
  height: 26px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.file-info {
  display: flex;
  justify-content: space-between;
  background-color: var(--color-surface-container-low);
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-default);
  font-size: 13px;
  color: var(--color-on-surface-variant);
}

.file-info-name {
  font-weight: 500;
  color: var(--color-on-surface);
}

.analyze-wrap {
  display: flex;
  justify-content: center;
  margin-top: var(--space-md);
}

.btn-analyze {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-md) 40px;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-default);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  font-family: var(--font-family);
  transition: opacity 0.2s ease;
}

.btn-analyze:hover    { opacity: 0.92; }
.btn-analyze:disabled { opacity: 0.5; cursor: not-allowed; }

.error-banner {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  background-color: var(--color-error-container);
  color: var(--color-on-error-container);
  padding: var(--space-md);
  border-radius: var(--radius-default);
  font-size: 14px;
}

.rejection-banner {
  display: flex;
  align-items: flex-start;
  gap: var(--space-md);
  background-color: var(--color-error-container);
  border: 1px solid var(--color-error);
  border-radius: var(--radius-default);
  padding: var(--space-md);
  color: var(--color-on-error-container);
}

.rejection-icon {
  flex-shrink: 0;
  color: var(--color-error);
}

.rejection-title {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 4px;
}

.rejection-text {
  font-size: 13px;
  line-height: 1.6;
  margin-bottom: var(--space-xs);
}

.rejection-hint {
  font-size: 12px;
  opacity: 0.8;
  font-style: italic;
}

/* Checklist */
.checklist-card{
    display:grid;
    grid-template-columns:1fr 240px;
    gap:32px;
    background:#EDF7F1;
    border:1px solid #bbf7d0;
    border-radius:20px;
    padding:32px;
    height:100%;
}

.checklist-content{
    display:flex;
    flex-direction:column;
    align-items:flex-start;
    gap:20px;
}

.checklist-illustration{
    display:flex;
    justify-content:center;
    align-items:center;
}

.phone-image{
    width:230px;      
    height:auto;
    display:block;
}

.checklist-title {
  font-size: 25px;
  font-weight: 700;
  color: var(--color-on-surface);
  margin-bottom:20px;
}

.checklist-items {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.checklist-item {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: 14px;
  color: var(--color-on-surface);
}

.checklist-icon {
  width: 20px;
  height: 20px;
  border-radius: var(--radius-full);
  background-color: var(--color-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.checklist-link {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: 13px;
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
  margin-top: var(--space-xs);
}

.checklist-link:hover { text-decoration: underline; }

/* Privacy */
.privacy-note {
  display: flex;
  align-items: flex-start;
  gap: var(--space-sm);
  background-color: var(--color-surface-container-low);
  border-radius: var(--radius-default);
  padding: var(--space-md);
  font-size: 13px;
  color: var(--color-on-surface-variant);
  line-height: 1.6;
}

.privacy-text strong { color: var(--color-on-surface); }

/* Disclaimer */
.disclaimer-note {
  display: flex;
  align-items: flex-start;
  gap: var(--space-sm);
  background-color: var(--color-error-container);
  border-radius: var(--radius-default);
  padding: var(--space-md);
}

.disclaimer-title {
  font-size: 13px;
  font-weight: 700;
  color: var(--color-on-error-container);
  margin-bottom: 4px;
}

.disclaimer-text {
  font-size: 13px;
  color: var(--color-on-error-container);
  line-height: 1.6;
}

/* Guide panel */
.guide-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.guide-card {
  background-color: var(--color-surface-container-lowest);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-level-1);
  padding: var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  border-top: 4px solid var(--color-secondary);
}

.guide-title {
  font-size: 11px;
  font-weight: 700;
  color: var(--color-secondary);
  letter-spacing: 0.1em;
}

.guide-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-md);
}

.guide-icon {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-default);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.guide-icon--teal {
  background-color: var(--color-secondary-container);
  color: var(--color-secondary);
}

.guide-icon--red {
  background-color: var(--color-error-container);
  color: var(--color-error);
}

.guide-item-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-on-surface);
}

.guide-item-desc {
  font-size: 13px;
  color: var(--color-on-surface-variant);
  margin-top: 2px;
  line-height: 1.5;
}

/* Contoh foto */
.example-card {
  background-color: var(--color-surface-container-lowest);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-level-1);
  padding: var(--space-md);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-sm);
}

.example-col {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.example-label {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.03em;
  padding: 4px var(--space-sm);
  border-radius: var(--radius-full);
}

.example-label--good {
  background-color: var(--color-secondary-container);
  color: var(--color-on-secondary-container);
}

.example-label--bad {
  background-color: var(--color-error-container);
  color: var(--color-on-error-container);
}

.example-img-placeholder {
  height: 90px;
  border-radius: var(--radius-default);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: var(--color-outline);
}

.example-img-placeholder--good {
  background-color: #dcfce7;
  border: 1px solid #86efac;
}

.example-img-placeholder--bad {
  background-color: #fef2f2;
  border: 1px solid #fca5a5;
}

.example-tips {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.example-tips li {
  font-size: 11px;
  line-height: 1.5;
}

.example-tips--good li { color: var(--color-secondary); }
.example-tips--bad  li { color: var(--color-error); }

/* Footer */
.scan-footer {
  border-top: 1px solid var(--color-outline-variant);
  padding-top: var(--space-lg);
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  margin-top: var(--space-md);
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