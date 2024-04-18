<script setup>
import {useHabbitsStore} from '@/stores/HabbitsStore'

const habbitsStore = useHabbitsStore()

const toWeekDay = dateObj =>
  dateObj.toLocaleDateString('us', {weekday: 'short'})
const toMonthDay = dateObj => dateObj.getDate()
</script>

<template>
  <div v-if="!habbitsStore.hideNavigation" class="header">
    <RouterLink class="logo" to="/">habtrack</RouterLink>
    <div class="hidden__toggle">
      <label for="toggleShowHidden">Show hidden</label>
      <input
        type="checkbox"
        name=""
        id="toggleShowHidden"
        v-model="habbitsStore.includeHidden"
      />
    </div>
  </div>
  <div v-if="!habbitsStore.hideNavigation" class="days-container">
    <div class="days__empty"></div>
    <nav class="days__panel">
      <RouterLink
        class="day"
        v-for="(day, index) in habbitsStore.arrayOfDates.slice(
          0,
          habbitsStore.shownDays
        )"
        :key="index"
        :to="{name: 'DayView', params: {date: day.toLocaleDateString('lt')}}"
      >
        <div class="day__week-day">{{ toWeekDay(day) }}</div>
        <div class="day__date">{{ toMonthDay(day) }}</div>
      </RouterLink>
    </nav>
  </div>
</template>
<style>
.header {
  margin-top: 5px;
  display: flex;
  align-items: center;
}
.logo {
  font-size: 3ch;
}
.hidden__toggle {
  display: flex;
  align-items: center;
  column-gap: 3px;
  margin: 0 0 0 auto;
}
.logo:visited {
  color: gray;
}
.logo:link {
  color: gray;
  text-decoration: none;
  border-bottom: 2px solid;
  border: 0;
}
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
  text-decoration: none;
  line-height: 18px;
  border-bottom: 2px solid;
  border-color: transparent;
}
.day:hover {
  border-bottom: 2px solid;
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
.active-day {
  border-bottom: 2px solid;
  color: lightgray;
}
</style>
