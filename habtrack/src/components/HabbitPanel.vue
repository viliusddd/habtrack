<script setup>
import {defineProps, computed, onMounted, ref} from 'vue'
import {useHabbitsStore} from '@/stores/HabbitsStore'
import {vElementSize} from '@vueuse/components'
import {useElementSize} from '@vueuse/core'
import {useRoute} from 'vue-router'

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

const icons = {
  true: 'v',
  false: 'x'
}
const selectedDay = computed(() => {
  return props.habbit.days.find(day => day.date === useRoute().params.date)
})
function continueWithHabbit() {
  if (!habbitsStore.includeHidden && props.habbit.isHidden) {
    return false
  } else {
    return true
  }
}
</script>

<template>
  <div v-if="continueWithHabbit()" class="habbit">
    <div class="habbit__title">
      <input
        class="habbit__color"
        @input="updateColor"
        type="color"
        v-model="inputColor"
      />
      <RouterLink
        :class="habbit.isHidden ? 'underline habbit__name' : 'habbit__name'"
        :to="{name: 'HabbitView', params: {id: habbit.id}}"
      >
        {{ habbit.name }}
      </RouterLink>
    </div>
    <div
      v-if="$route.name === 'Home'"
      class="habbit__cells"
      ref="cellsElement"
      v-element-size="onResize"
    >
      <button
        v-for="(day, index) in habbit.days.slice(0, habbitsStore.shownDays)"
        @click="day.isMarked = !day.isMarked"
        :key="index"
        class="habbit__cell"
        :class="day.isMarked == true ? 'marked' : ''"
      >
        {{ icons[day.isMarked] }}
      </button>
    </div>
    <div
      v-else
      class="habbit__cells"
      ref="cellsElement"
      v-element-size="onResize"
    >
      <button
        @click="selectedDay.isMarked = !selectedDay.isMarked"
        class="habbit__cell"
        :class="selectedDay.isMarked == true ? 'marked' : ''"
      >
        {{ icons[selectedDay.isMarked] }}
      </button>
      <textarea
        class="habbit__comment"
        placeholder="Add a comment"
        v-model="selectedDay.comment"
      ></textarea>
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
  min-width: 150px;
  width: 150px;
  height: 40px;
}
input[type='color'] {
  border: none;
  padding: 0;
  width: 15px;
  background: transparent;
  margin: 0 2px;
  padding-top: 11px;
  height: 40px;
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
  word-break: break-word; /* break-all alternative */
}
.habbit__name:link {
  color: gray;
  text-decoration: none;
}
.habbit__color {
  display: flex;
  flex-shrink: 0;
  cursor: pointer;
}
textarea {
  border: 0;
  padding: 0;
  outline: none;

  line-height: inherit;
  background: transparent;
  resize: none;
  width: 100%;
  color: v-bind(inputColor);
  min-width: 120px;
}
.habbit__cells {
  display: flex;
  min-width: 120px;
  height: 40px;
  flex-grow: 1;
}
.habbit__cell {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  cursor: pointer;
  background: transparent;
  border: 0;
  color: grey;
}
.underline:link {
  text-decoration: green wavy underline;
}
.marked {
  color: v-bind(inputColor);
}
</style>
