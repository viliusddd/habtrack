<script setup>
import { defineProps, ref } from 'vue'
import { useHabbitsStore } from '@/stores/HabbitsStore'
import { vElementSize } from '@vueuse/components'
import { useElementSize } from '@vueuse/core'

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

const icons = {
  true: 'v',
  false: 'x'
}

// Get initial width of cells element
const cellsElement = ref(null)
const { width } = useElementSize(cellsElement)
if (width) habbitsStore.shownDays = ref(Math.floor(width / 40)) //! temp override
// if (width) habbitsStore.shownDays = ref(Math.floor(260 / 40)) //! temp override

/** Get cells element width on resize */
function onResize({ width, height }) {
  // console.log(habbitsStore.shownDays, '/', habbitsStore.numOfDays)
  const days = ref(Math.floor(width / 40))
  if (days.value) habbitsStore.shownDays = days.value
}

function toggleMark(day) {
  day.isMarked = !day.isMarked
}
</script>

<template>
  <div class="habbit">
    <div class="habbit__title">
      <input class="habbit__color" @input="updateColor" type="color" v-model="inputColor" />
      <div class="habbit__name">{{ habbit.name }}</div>
    </div>
    <div class="habbit__cells" ref="cellsElement" v-element-size="onResize">
      <button
        v-for="(day, index) in habbit.days.slice(0, habbitsStore.shownDays)"
        @click="toggleMark(day)"
        :key="index"
        class="habbit__cell"
        :class="day.isMarked == true ? 'marked' : ''"
      >
        {{ icons[day.isMarked] }}
      </button>
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
  min-width: 120px;
  width: 150px;
  /* border: 1px solid red; */
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
  word-break: break-all; /* break-word alternative */
}
.habbit__color {
  display: flex;
  flex-shrink: 0;
  cursor: pointer;
}
.habbit__cells {
  display: flex;
  min-width: 120px;
  height: 40px;
  flex-grow: 1;
  /* border: 1px solid green; */
}
.habbit__cell {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
  background: transparent;
  border: 0;
  color: grey;
  /* border: 1px solid yellow; */
}
.marked {
  color: v-bind(inputColor);
}
</style>
