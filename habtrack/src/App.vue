<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useHabbitsStore } from './stores/HabbitsStore'
import HabbitPanel from './components/HabbitPanel.vue'
import NewHabbitPanel from './components/NewHabbitPanel.vue'

const habbitsStore = useHabbitsStore()
habbitsStore.fill()
</script>

<template>
  <header>
    <p class="logo">habtrack</p>
    <div class="wrapper">
      <div class="days-container">
        <div class="day">
          <div class="day__date">7</div>
          <div class="day__week-day">sun</div>
        </div>
        <div class="day">
          <div class="day__date">6</div>
          <div class="day__week-day">sat</div>
        </div>
        <div class="day">
          <div class="day__date">5</div>
          <div class="day__week-day">fri</div>
        </div>
        <div class="day">
          <div class="day__date">4</div>
          <div class="day__week-day">thu</div>
        </div>
        <div class="day">
          <div class="day__date">3</div>
          <div class="day__week-day">wed</div>
        </div>
      </div>
      <div class="habbits-container">
        <HabbitPanel
          v-for="habbit in habbitsStore.habbits"
          :name="habbit.name"
          :color="habbit.color"
          :marks="habbit.days.map(day => day.isMarked)"
          :key="habbit.id"
        />
        <div class="bottom-container">
          <NewHabbitPanel />
          <div class="message-panel">Add new habbit by pressing +</div>
        </div>
      </div>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  /* margin: 5px; */
}
.logo {
  font-size: 3ch;
}
.days-container {
  display: flex;
  /* grid-template-columns: repeat(5, 1fr); */
  /* border: 1px solid gray; */
  /* flex-basis: auto; */
  align-self: flex-end;
}
.day {
  width: 40px;
  height: 40px;
  /* border: 1px solid gray; */
}
.day__date {
  display: flex;
  justify-content: center;
  align-items: center;
}
.day__week-day {
  display: flex;
  justify-content: center;
  align-items: center;
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
}
</style>
