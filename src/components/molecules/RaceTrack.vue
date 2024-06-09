<template>
  <div class="flex flex-col items-center">
    <div
      id="raceTrack"
      class="relative w-full max-w-[350px] sm:max-w-[1000px] h-[600px] bg-gray-200 border border-gray-300"
    >
      <div
        class="absolute left-0 w-[30px] h-full bg-white border-r border-gray-300 flex flex-col justify-between"
      >
        <div
          v-for="(horse, index) in selectedHorses[raceNumber - 1]"
          :key="index"
          class="flex items-center justify-center h-[60px] text-green-600 text-sm"
        >
          {{ index + 1 }}
        </div>
      </div>
      <div class="relative ml-[30px] h-full">
        <div
          v-for="horse in selectedHorses[raceNumber - 1]"
          :key="horse.name"
          class="relative w-full h-[60px] border-b border-dashed border-gray-300"
        >
          <RaceHorse
            :horse="horse"
            :raceDistances="raceDistances"
            :raceNumber="raceNumber"
            :raceTrackWidth="raceTrackWidth"
          />
        </div>
      </div>
      <div class="absolute right-0 top-0 bottom-0 w-[2px] bg-red-600"></div>
    </div>
    <div class="mt-4 text-lg text-red-600">
      Lap {{ raceNumber }} - {{ raceDistances[raceNumber - 1] }}m
    </div>
  </div>
</template>

<script setup lang="ts">
import RaceHorse from '../atoms/RaceHorse.vue'
import { computed, watch, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { key } from '../../store'
import { Horse } from '../../store/horseUtils'

const store = useStore(key)
const selectedHorses = computed(() => store.getters.selectedHorses)
const raceNumber = computed(() => store.getters.raceNumber)
const isRaceRunning = computed(() => store.getters.isRaceRunning)
const raceDistances = computed(() => store.getters.raceDistances)
const isRaceFinished = computed(() => store.getters.isRaceFinished)

const raceTrackWidth = ref(970)

const updateRaceTrackWidth = () => {
  const raceTrackElement = document.getElementById('raceTrack')
  if (raceTrackElement) {
    raceTrackWidth.value = raceTrackElement.clientWidth - 30
  }
}

let currentRanking = 0

const resetHorsePositions = () => {
  const horses = selectedHorses.value[raceNumber.value - 1]
  horses.forEach((horse) => {
    horse.position = 0
  })
}

const updateHorsePositions = () => {
  if (!isRaceRunning.value) return

  const horses = selectedHorses.value[raceNumber.value - 1]
  let allHorsesFinished = true

  horses.forEach((horse) => {
    if (horse.position < raceDistances.value[raceNumber.value - 1]) {
      horse.position = (horse.position ?? 0) + horse.speed * 0.1
      if (horse.position >= raceDistances.value[raceNumber.value - 1]) {
        horse.position = raceDistances.value[raceNumber.value - 1]
        if (horse.ranking === undefined) {
          horse.ranking = currentRanking++
        }
      } else {
        allHorsesFinished = false
      }
    }
  })

  if (allHorsesFinished) {
    store.commit('updateRaceResults', { raceIndex: raceNumber.value - 1, results: horses })
    store.commit('setRaceRunning', false)
    currentRanking = 0
    if (raceNumber.value < 6) {
      store.dispatch('nextRace')
      setTimeout(() => {
        resetHorsePositions()
        store.commit('setRaceRunning', true)
      }, 200)
    } else {
      store.commit('setRaceFinished', true)
    }
  } else {
    requestAnimationFrame(updateHorsePositions)
  }
}

watch(isRaceRunning, (newVal) => {
  if (newVal) {
    updateHorsePositions()
  }
})

watch(raceNumber, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    selectedHorses.value[newVal - 1].forEach((horse) => {
      horse.position = 0
      horse.ranking = undefined
    })
    if (isRaceRunning.value) {
      updateHorsePositions()
    }
  }
})

onMounted(() => {
  updateRaceTrackWidth()
  if (isRaceRunning.value) {
    updateHorsePositions()
  }
})
</script>

<style scoped></style>
