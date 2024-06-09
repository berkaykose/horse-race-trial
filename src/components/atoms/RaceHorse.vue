<template>
  <div>
    <font-awesome-icon
      :icon="['fas', 'horse']"
      class="absolute top-1/2 transform -translate-y-1/2 transition-all"
      :style="{
        left: `${(horse.position / raceDistances[raceNumber - 1]) * raceTrackWidth}px`,
        color: horse.color
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { Horse } from '../../store/horseUtils'

const props = defineProps<{
  raceDistances: []
  raceNumber: number
  raceTrackWidth: number
  horse: Horse
}>()
</script>

<style scoped></style>
