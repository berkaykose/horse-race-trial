<template>
  <div class="w-[20rem] h-[518px] mt-4 overflow-auto">
    <table class="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-800">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th class="px-4 py-3">Name</th>
          <th class="px-4 py-3">Condition</th>
          <th class="px-4 py-3">Color</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="bg-white border-b dark:bg-gray-400 dark:border-gray-700"
          v-for="horse in horses"
          :key="horse.color"
        >
          <td class="px-4 py-4">{{ horse.name }}</td>
          <td class="px-4 py-4">{{ horse.condition }}</td>
          <td class="px-4 py-4 uppercase" :style="{ color: horse.color }">
            {{ horse.color }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { key } from '../store'

const store = useStore(key)
const horseCount = ref(20)

const horses = computed(() => store.getters.horses)

const generateHorses = () => {
  store.dispatch('generateHorses', horseCount.value)
}

onMounted(() => {
  generateHorses() // Component yüklendiğinde atları oluştur
})

// typed as number
</script>

<style scoped></style>
