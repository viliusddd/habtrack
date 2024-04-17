<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useHabbitsStore } from '@/stores/HabbitsStore'
import HabbitPanel from '@/components/HabbitPanel.vue'
import NewHabbitPanel from '@/components/NewHabbitPanel.vue'

defineProps({
  date: String
})

const habbitsStore = useHabbitsStore()
</script>

<template>
  <div class="wrapper">
    <HabbitPanel v-for="habbit in habbitsStore.habbits" :key="habbit.id" :habbit />
    <div class="bottom-container">
      <NewHabbitPanel />
      <div class="message-panel">{{ habbitsStore.message }}</div>
    </div>
  </div>

  <RouterView />
</template>

<style scoped>
header {
  display: flex;
  flex-direction: column;
  max-width: 712px;
}
.wrapper {
  display: flex;
  flex-direction: column;
  row-gap: 1px;
}
.bottom-container {
  display: flex;
  /* border: 1px solid yellow; */
  height: 40px;
}
.message-panel {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  padding: 0 5px;
  text-align: center;
  /* border: 1px solid red; */
}
</style>
