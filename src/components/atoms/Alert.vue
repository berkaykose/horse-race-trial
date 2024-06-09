<template>
  <div
    v-if="alertMessage"
    class="fixed bottom-4 right-4 bg-yellow-50 text-white p-4 rounded shadow-lg z-50 transition-opacity duration-500 ease-in-out"
  >
    <div class="flex">
      <div class="flex-shrink-0">
        <ExclamationTriangleIcon class="h-5 w-5 text-yellow-400" aria-hidden="true" />
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium text-yellow-800">Attention needed</h3>
        <div class="mt-2 text-sm text-yellow-700">
          <p>
            {{ alertMessage }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ExclamationTriangleIcon } from '@heroicons/vue/20/solid'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { key } from '../../store'

const store = useStore(key)
const alertMessage = computed(() => store.getters.alertMessage)
</script>

<style scoped></style>
