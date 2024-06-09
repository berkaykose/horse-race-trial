<template>
  <div class="mt-4">
    <ListHeader title="Program Lists" color="teal" />
    <div class="h-[82vh] overflow-y-scroll">
      <RaceTable title="1ST Lap - 1200M" :raceNumber="1" />
      <RaceTable title="2ND Lap - 1400M" :raceNumber="2" />
      <RaceTable title="3RD Lap - 1600M" :raceNumber="3" />
      <RaceTable title="4TH Lap - 1800M" :raceNumber="4" />
      <RaceTable title="5TH Lap - 2000M" :raceNumber="5" />
      <RaceTable title="6TH Lap - 2200M" :raceNumber="6" />
    </div>
  </div>
</template>

<script setup lang="ts">
import RaceTable from '../molecules/RaceTable.vue'
import ListHeader from '../atoms/ListHeader.vue'
</script>

<style scoped></style>
