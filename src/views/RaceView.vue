<template>
  <div class="mx-auto p-2">
    <HeaderNav />
    <div class="flex flex-wrap justify-center gap-4">
      <HorseList />
      <RaceTrack />
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <ProgramLists />
        </div>
        <div>
          <ResultLists />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderNav from '../components/organism/HeaderNav.vue'
import HorseList from '../components/organism/HorseList.vue'
import ProgramLists from '../components/organism/ProgramLists.vue'
import ResultLists from '../components/organism/ResultLists.vue'
import RaceTrack from '../components/organism/RaceScreen.vue'
</script>

<style scoped></style>
