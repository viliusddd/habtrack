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

const icons = {
  true: 'v',
  false: 'x'
}
</script>

<template>
  <div class="habbit">
    <div class="habbit__title">
      <input class="habbit__color" @input="updateColor" type="color" v-model="inputColor" />
      <div class="habbit__name">{{ habbit.name }}</div>
    </div>
    <div class="habbit__cells">
      <button
        v-for="(day, index) in habbit.days"
        @click="day.isMarked = !day.isMarked"
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
  background: transparent;
  border: 0;
  color: grey;
}

.marked {
  color: v-bind(inputColor);
}
</style>
