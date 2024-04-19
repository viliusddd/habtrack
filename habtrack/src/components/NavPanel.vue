<script setup>
import {useHabbitsStore} from '@/stores/HabbitsStore'
import {onMounted, ref} from 'vue'
import {useElementSize} from '@vueuse/core'
import {vElementSize} from '@vueuse/components'

const habbitsStore = useHabbitsStore()

/** Update shownDays number after component has been mounted */
const cellsElement = ref(null)
const {width} = useElementSize(cellsElement)
onMounted(() => {
  if (width) habbitsStore.shownDays = ref(Math.floor(width.value / 40))
})

/** Update shownDays number when .habbit_cells width changes */
function onResize({width, height}) {
  const days = ref(Math.floor(width / 40))
  if (days.value) habbitsStore.shownDays = days.value
}

const toWeekDay = dateObj =>
  dateObj.toLocaleDateString('us', {weekday: 'short'})
const toMonthDay = dateObj => dateObj.getDate()
</script>

<template>
  <div class="navigation">
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
      <nav ref="cellsElement" v-element-size="onResize" class="days__panel">
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
  </div>
</template>
<style>
.header {
  margin: 5px;
  display: flex;
  align-items: center;
}
.logo {
  font-size: 3ch;
  margin-left: 5px;
}
.hidden__toggle {
  display: flex;
  align-items: center;
  column-gap: 3px;
  margin: 0 5px 0 auto;
}
.logo:visited {
  color: white;
}
.logo:link {
  color: white;
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
  align-items: center;
  flex-direction: column;
  width: 40px;
  cursor: pointer;
  background: transparent;
  border: 0;
  color: lightgray;
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
  color: white;
}
</style>
