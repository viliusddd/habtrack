<script setup>
import { useHabbitsStore } from '@/stores/HabbitsStore'
import { computed, ref } from 'vue'

const inputValue = ref('')

const habbitsStore = useHabbitsStore()

const newHabbitTemplate = computed(
  () => {
    const days = []

    for (const day of habbitsStore.arrayOfDates) {
      days.push({ date: day.toLocaleDateString('lt'), isMarked: false, comment: '' })
    }

    return {
      id: habbitsStore.newId,
      name: inputValue.value,
      color: '#808080',
      days
    }
  },
  { deep: true }
)

function submitNewHabbit() {
  const minVal = 3
  const maxVal = 22
  if (inputValue.value.length < minVal) {
    habbitsStore.message = `Habbit name can't be less than ${minVal} characters long`
  } else if (inputValue.value.length > maxVal) {
    habbitsStore.message = `Habbit name can't be more than ${maxVal} characters long`
  } else if (!isValidInput()) {
    habbitsStore.message = 'No special characters are allowed in habbit name.'
  } else {
    habbitsStore.addHabbit(newHabbitTemplate.value)
    console.log(newHabbitTemplate.value.days)
    inputValue.value = ''
    habbitsStore.message = ''
  }
}

function isValidInput() {
  if (/[$&+,:;=?@#|'<>.^*()%{[}/\\\]]/.test(inputValue.value)) {
    return false
  } else {
    return true
  }
}
</script>

<template>
  <div class="new-habbit">
    <button class="new-habbit__btn" @click="submitNewHabbit" type="submit" :value="inputValue">
      +
    </button>
    <input
      type="text"
      class="new-habbit__name"
      v-model="inputValue"
      maxlength="22"
      @keydown.enter="submitNewHabbit"
      placeholder="Enter new habbit"
    />
  </div>
</template>

<style scoped>
.new-habbit {
  display: flex;
}
.new-habbit__btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  flex-shrink: 0;
  /* border: 1px solid yellow; */
  background: transparent;
  color: lightgray;
  border: 0;
  padding: 0;
  cursor: pointer;
}
.new-habbit__name {
  display: flex;
  align-items: center;
  width: 130px;
  background: transparent;
  color: lightgray;
  border: 0;
  padding: 0;
  outline: 0;
}
</style>
