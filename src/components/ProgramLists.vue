<template>
  <div class="h-[86vh] overflow-y-scroll mt-4">
    <RaceTable title="1ST Lap - 1200M" />
    <RaceTable title="2ND Lap - 1400M" />
    <RaceTable title="3RD Lap - 1600M" />
    <RaceTable title="4TH Lap - 1800M" />
    <RaceTable title="5TH Lap - 2000M" />
    <RaceTable title="6TH Lap - 2200M" />
  </div>
</template>

<script setup lang="ts">
import RaceTable from '../components/RaceTable.vue'
</script>

<style scoped></style>
