<script setup>
import { useHabbitsStore } from '@/stores/HabbitsStore'

const habbitsStore = useHabbitsStore()

const toWeekDay = dateObj => dateObj.toLocaleDateString('us', { weekday: 'short' })
const toMonthDay = dateObj => dateObj.getDate()
</script>

<template>
  <div class="day" v-for="(day, index) in habbitsStore.arrayOfDates" :key="index">
    <div class="day__week-day">{{ toWeekDay(day) }}</div>
    <div class="day__date">{{ toMonthDay(day) }}</div>
  </div>
</template>
<style scoped>
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
</style>
