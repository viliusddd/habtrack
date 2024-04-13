import { defineStore } from 'pinia'
import { computed, watch, ref } from 'vue'

export const useHabbitsStore = defineStore('HabbitsStore', () => {
  const habbits = ref([])

  const key = 'habbits'
  async function fill() {
    const storageVal = localStorage.getItem(key)
    if (storageVal) {
      habbits.value = JSON.parse(storageVal)
    } else {
      localStorage.setItem(key, '')
    }
  }
  function add(data) {
    habbits.value.push(data)
    console.log(data)
  }

  watch(
    habbits,
    newValue => {
      localStorage.setItem(key, JSON.stringify(newValue))
    },
    { deep: true }
  )

  const newId = computed(() => {
    if (habbits.value.length) {
      const lastId = habbits.value[habbits.value.length - 1].id
      return lastId + 1
    } else {
      return 1
    }
  })

  return { habbits, add, fill, newId }
})
