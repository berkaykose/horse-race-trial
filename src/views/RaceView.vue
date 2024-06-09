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
import HeaderNav from '../components/organisms/HeaderNav.vue'
import HorseList from '../components/organisms/HorseList.vue'
import ProgramLists from '../components/organisms/ProgramLists.vue'
import ResultLists from '../components/organisms/ResultLists.vue'
import RaceTrack from '../components/organisms/RaceScreen.vue'
</script>

<style scoped></style>
