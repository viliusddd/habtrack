<script setup>
import { defineProps } from 'vue'

defineProps({
  days: Number
})
const todayDate = new Date()

const monthDay = num => todayDate.getDate() - num
const weekDay = num => {
  const prevDay = new Date()
  prevDay.setDate(todayDate.getDate() - num)
  return prevDay.toLocaleDateString('us', { weekday: 'short' })
}
</script>

<template>
  <div class="day" v-for="(_, index) in days" :key="index">
    <div class="day__week-day">{{ weekDay(index) }}</div>
    <div class="day__date">{{ monthDay(index) }}</div>
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
