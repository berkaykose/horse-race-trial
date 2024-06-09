<template>
  <div>
    <p class="text-center bg-red-600">{{ title }}</p>
    <div class="w-[15rem] min-h-[28vh] h-auto">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-800">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th class="px-1 pt-2 text-left">Position</th>
            <th class="px-1 pt-2">Name</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b dark:bg-gray-400 dark:border-gray-700"
            v-for="(horse, index) in results"
            :key="index"
          >
            <td class="pl-6 pt-1 text-left">{{ index + 1 }}</td>
            <td class="px-1 pt-1">{{ horse.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  results: any[]
}>()
</script>

<style scoped></style>
