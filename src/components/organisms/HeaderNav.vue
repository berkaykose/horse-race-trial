<template>
  <div class="flex justify-between bg-gray-800 p-2 border border-black">
    <p class="p-2 text-xl text-gray-400">Horse Racing</p>
    <div class="flex gap-4">
      <button
        v-if="!isRaceFinished"
        @click="generateProgram()"
        class="bg-gray-400 hover:bg-yellow-300 px-4 py-2 border border-black"
      >
        Generate Program
      </button>
      <button
        v-if="isRaceFinished"
        @click="resetRace()"
        class="bg-gray-400 bg-yellow-300 hover:bg-yellow-500 px-4 py-2 border border-black"
      >
        Start Race Again
      </button>
      <button
        v-else
        @click="startStopRace()"
        class="bg-gray-400 hover:bg-yellow-300 px-4 py-2 border border-black"
      >
        Start / Pause
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { key } from '../../store'

const store = useStore(key)
const isRaceFinished = computed(() => store.getters.isRaceFinished)
const isRaceRunning = computed(() => store.getters.isRaceRunning)
const selectedHorses = computed(() => store.getters.selectedHorses)

const generateProgram = () => {
  if (isRaceRunning.value) {
    store.dispatch('showAlert', 'You cannot generate a new program while the race is running')
  } else {
    store.dispatch('selectRacingHorses')
  }
}

const startStopRace = () => {
  if (selectedHorses.value[0].length) {
    store.dispatch('startStopRace')
  } else {
    store.dispatch(
      'showAlert',
      'You cannot start a race without a proper race program. Please generate program first.'
    )
  }
}

const resetRace = () => {
  store.commit('resetAllRace')
}
</script>

<style scoped></style>
