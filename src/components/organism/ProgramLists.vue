<template>
  <div class="mt-4 w-[15rem]">
    <ListHeader title="Program Lists" color="blue" />
    <div class="h-[82vh] overflow-y-scroll border border-gray-900">
      <RaceTable
        v-for="(horses, index) in selectedHorses"
        :key="index"
        :title="`Lap ${index + 1} - ${1200 + index * 200}M`"
        :results="horses"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import { key } from '../../store'
import ListHeader from '../atoms/ListHeader.vue'
import RaceTable from '../molecules/RaceTable.vue'

const store = useStore(key)
const selectedHorses = computed(() => store.getters.selectedHorses)
</script>

<style scoped></style>
