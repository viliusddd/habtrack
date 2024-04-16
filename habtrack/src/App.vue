<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useHabbitsStore } from './stores/HabbitsStore'
import HabbitPanel from './components/HabbitPanel.vue'
import NewHabbitPanel from './components/NewHabbitPanel.vue'
import DaysPanel from './components/DaysPanel.vue'

const habbitsStore = useHabbitsStore()
habbitsStore.fill()
</script>

<template>
  <header>
    <p class="logo">habtrack</p>
    <div class="wrapper">
      <DaysPanel />
      <HabbitPanel v-for="habbit in habbitsStore.habbits" :key="habbit.id" :habbit />
      <div class="bottom-container">
        <NewHabbitPanel />
        <div class="message-panel">{{ habbitsStore.message }}</div>
      </div>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
}
.logo {
  font-size: 3ch;
}
.habbits-container {
  display: flex;
  flex-direction: column;
  /* border: 1px solid gray; */
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
