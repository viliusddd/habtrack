<script setup>
import { defineProps, ref } from 'vue'
const props = defineProps({
  id: Number,
  name: String,
  color: String,
  marks: Array
})

const icons = {
  true: 'v',
  false: 'x'
}
</script>

<template>
  <div class="habbit">
    <div class="habbit__title">
      <div class="habbit__color">o</div>
      <div class="habbit__name">{{ name }}</div>
    </div>
    <div class="habbit__cells">
      <div
        v-for="(mark, index) in marks"
        :key="`id-${index}`"
        :class="mark == true ? 'marked' : ''"
        class="habbit__cell"
      >
        {{ icons[mark] }}
      </div>
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
  /* border: 1px solid blue; */
}

.habbit__color {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  flex-shrink: 0;
}
.habbit__name {
  display: flex;
  color: v-bind(color);
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
  /* border: 1px solid yellow; */
}

.marked {
  color: v-bind(color);
}
</style>
