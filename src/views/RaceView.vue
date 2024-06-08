<template>
  <div class="mx-auto p-4">
    <HeaderNav />
    <div class="flex justify-between gap-4">
      <HorseList />
      <div class="grid grid-cols-2 gap-4">
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
import HeaderNav from '../components/HeaderNav.vue'
import HorseList from '../components/HorseList.vue'
import ProgramLists from '../components/ProgramLists.vue'
import ResultLists from '../components/ResultLists.vue'
</script>

<style scoped></style>
