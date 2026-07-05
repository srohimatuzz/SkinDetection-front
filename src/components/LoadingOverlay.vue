<template>
  <Teleport to="body">
    <div v-if="isVisible" class="loading-overlay">
      <div class="loading-card">

        <div class="loading-spinner">
          <svg viewBox="0 0 50 50" class="spinner-svg">
            <circle
              cx="25" cy="25" r="20"
              fill="none"
              stroke-width="4"
              stroke="var(--color-surface-container)"
            />
            <circle
              cx="25" cy="25" r="20"
              fill="none"
              stroke-width="4"
              stroke="var(--color-primary)"
              stroke-linecap="round"
              stroke-dasharray="80 200"
              class="spinner-arc"
            />
          </svg>
        </div>

        <div class="loading-text">
          <div class="loading-title">Menganalisis Gambar</div>
          <div class="loading-subtitle">
            Model AI sedang memproses gambar Anda...
          </div>
        </div>

        <div class="loading-steps">
          <div
            v-for="(step, i) in steps"
            :key="i"
            class="loading-step"
            :class="{
              'loading-step--done'   : currentStep > i,
              'loading-step--active' : currentStep === i,
            }"
          >
            <div class="loading-step-dot">
              <svg v-if="currentStep > i"
                width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7"
                  stroke="white" stroke-width="3" stroke-linecap="round"/>
              </svg>
            </div>
            <span class="loading-step-label">{{ step }}</span>
          </div>
        </div>

      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  isVisible: {
    type   : Boolean,
    default: false
  }
})

const steps = [
  'Memuat gambar',
  'Menjalankan Grad-CAM',
  'Menganalisis dengan AI',
  'Menghasilkan penjelasan',
]

const currentStep = ref(0)
let interval = null

watch(() => props.isVisible, (val) => {
  if (val) {
    currentStep.value = 0
    interval = setInterval(() => {
      if (currentStep.value < steps.length - 1) {
        currentStep.value++
      }
    }, 900)
  } else {
    clearInterval(interval)
    currentStep.value = 0
  }
})
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(13, 29, 41, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-card {
  background-color: white;
  border-radius: var(--radius-xl);
  padding: var(--space-xl);
  width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-lg);
  box-shadow: var(--shadow-level-2);
}

/* Spinner */
.loading-spinner {
  width: 72px;
  height: 72px;
}

.spinner-svg {
  width: 100%;
  height: 100%;
  animation: rotate 1.4s linear infinite;
}

.spinner-arc {
  animation: dash 1.4s ease-in-out infinite;
  transform-origin: center;
}

@keyframes rotate {
  100% { transform: rotate(360deg); }
}

@keyframes dash {
  0%   { stroke-dasharray: 1 200; stroke-dashoffset: 0; }
  50%  { stroke-dasharray: 90 200; stroke-dashoffset: -35px; }
  100% { stroke-dasharray: 90 200; stroke-dashoffset: -124px; }
}

/* Text */
.loading-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-on-surface);
  text-align: center;
}

.loading-subtitle {
  font-size: 13px;
  color: var(--color-on-surface-variant);
  text-align: center;
  margin-top: 4px;
}

/* Steps */
.loading-steps {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.loading-step {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-xs) 0;
}

.loading-step-dot {
  width: 20px;
  height: 20px;
  border-radius: var(--radius-full);
  border: 2px solid var(--color-outline-variant);
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.loading-step--done .loading-step-dot {
  background-color: var(--color-secondary);
  border-color: var(--color-secondary);
}

.loading-step--active .loading-step-dot {
  border-color: var(--color-primary);
  background-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(0, 71, 141, 0.2);
  animation: pulse-dot 1s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% { box-shadow: 0 0 0 3px rgba(0, 71, 141, 0.2); }
  50%       { box-shadow: 0 0 0 6px rgba(0, 71, 141, 0.1); }
}

.loading-step-label {
  font-size: 13px;
  color: var(--color-on-surface-variant);
  transition: color 0.3s ease;
}

.loading-step--done .loading-step-label {
  color: var(--color-secondary);
  font-weight: 500;
}

.loading-step--active .loading-step-label {
  color: var(--color-primary);
  font-weight: 600;
}
</style>