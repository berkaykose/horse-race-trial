<template>
  <div class="mt-4 w-[66rem] border">
    <ListHeader title="Race Track" color="red" />
    <RaceTrack />
  </div>
</template>

<script setup lang="ts">
import ListHeader from '../atoms/ListHeader.vue'
import RaceTrack from '../molecules/RaceTrack.vue'
</script>

<style scoped></style>
