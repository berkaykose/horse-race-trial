<template>
  <div class="border border-gray-900">
    <p class="text-center border-b border-gray-900 bg-yellow-400">{{ title }}</p>
    <div class="w-[16rem] h-[30vh]">
      <table class="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-800">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th class="px-1 py-2 text-left">Position</th>
            <th class="px-1 py-2">Name</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b dark:bg-gray-400 dark:border-gray-700"
            v-for="(horse, index) in selectedHorses"
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
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { key } from '../store'
import { Horse } from '../store/horseUtils'

const props = defineProps<{
  title?: string
  horseList?: Horse
}>()

const store = useStore(key)
const selectedHorses = computed(() => store.getters.selectedHorses)
</script>

<style scoped></style>
