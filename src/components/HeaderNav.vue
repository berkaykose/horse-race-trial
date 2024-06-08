<template>
  <div class="flex justify-between bg-gray-800 p-2 border border-black">
    <p class="p-2 text-xl text-gray-400">Horse Racing</p>
    <div class="flex gap-4">
      <button @click="generateProgram()" class="bg-gray-400 px-4 py-2 border border-black">
        Generate Program
      </button>
      <button @click="startStopRace()" class="bg-gray-400 px-4 py-2 border border-black">
        Start / Pause
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const generateProgram = () => {
  console.log('program generated')
}

const startStopRace = () => {
  console.log('race started/stopped')
}
</script>

<style scoped></style>
