<template>
  <div class="w-full" :style="{ backgroundColor: color }">
    <p class="text-center text-white p-3 text-xl">{{ title }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string
  color?: string
}>()
</script>

<style scoped></style>
