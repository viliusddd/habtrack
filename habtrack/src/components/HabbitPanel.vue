<script setup>
import { defineProps, ref } from 'vue'
import { useHabbitsStore } from '@/stores/HabbitsStore'

const habbitsStore = useHabbitsStore()

const props = defineProps({
  habbit: Object
})

const inputColor = ref('')
inputColor.value = props.habbit.color

function updateColor() {
  for (let habbit of habbitsStore.habbits) {
    if (habbit.id === props.habbit.id) habbit.color = inputColor
  }
}

const dates = props.habbit.days
  .filter(day => day.date.length)
  .map(day => new Date(day.date))
  .map(day => new Date(day.setHours(0, 0, 0, 0)))
  .map(day => day.valueOf())

const daysList = ref([])
for (let day of habbitsStore.arrayOfDates) {
  day = new Date(day.setHours(0, 0, 0, 0))
  day = day.valueOf()
  // console.log(day, dates)

  if (dates.includes(day)) {
    // console.log('yes')
    daysList.value.push(true)
    // break
  } else {
    daysList.value.push(false)
  }
}

console.log(daysList.value)
</script>

<template>
  <div class="habbit">
    <div class="habbit__title">
      <input class="habbit__color" @input="updateColor" type="color" v-model="inputColor" />
      <div class="habbit__name">{{ habbit.name }}</div>
    </div>
    <div v-for="(day, index) in daysList" class="habbit__cells" :key="index">
      <div v-if="day" class="habbit__cell marked">v</div>
      <div v-else class="habbit__cell">x</div>
    </div>
  </div>
</template>

<style scoped>
.habbit {
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: space-between;
  border: 1px solid gray;
}
.habbit__title {
  display: flex;
}
input[type='color'] {
  border: none;
  padding: 0;
  width: 15px;
  background: transparent;
  margin: 0 2px;
}
input[type='color']::-webkit-color-swatch {
  border: 0;
  border-radius: 50%;
  height: 11px;
}
.habbit__name {
  display: flex;
  justify-content: center;
  align-items: center;
  color: v-bind(inputColor);
}
.habbit__color {
  cursor: pointer;
}
.habbit__cells {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  /* border: 1px solid green; */
}
.habbit__cell {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
  /* border: 1px solid yellow; */
}

.marked {
  color: v-bind(inputColor);
}
</style>
