<script setup>
import { useHabbitsStore } from '@/stores/HabbitsStore'

const habbitsStore = useHabbitsStore()

const toWeekDay = dateObj => dateObj.toLocaleDateString('us', { weekday: 'short' })
const toMonthDay = dateObj => dateObj.getDate()
</script>

<template>
  <div class="days-container">
    <div class="days__empty"></div>
    <div class="days__panel">
      <button
        class="day"
        v-for="(day, index) in habbitsStore.arrayOfDates.slice(0, habbitsStore.shownDays)"
        :key="index"
      >
        <div class="day__week-day">{{ toWeekDay(day) }}</div>
        <div class="day__date">{{ toMonthDay(day) }}</div>
      </button>
    </div>
  </div>
</template>
<style>
.days-container {
  display: flex;
  flex: 1;
  justify-content: space-between;
}
.days__empty {
  display: flex;
  /* min-width: 150px; */
  min-width: 120px;
  width: 150px;
}
.days__panel {
  display: flex;
  min-width: 120px;
  flex-grow: 1;
}
.day {
  display: flex;
  /* justify-content: center; */
  align-items: center;
  flex-direction: column;
  width: 40px;
  /* height: 40px; */
  cursor: pointer;
  background: transparent;
  border: 0;
  color: grey;
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
</style>
