import { defineStore } from 'pinia'
import { watch, ref } from 'vue'

export const useHabbitsStore = defineStore('HabbitsStore', () => {
  const habbits = ref([])

  const key = 'habbits'
  async function fill() {
    habbits.value = (await import('@/data/habbits.json')).default
  }
  function add(data) {
    habbits.value.push(data)
    console.log(habbits)

    //check if localStorage has the key
    const storageVal = localStorage.getItem(key)
    if (storageVal) habbits.value = JSON.parse(storageVal)

    // val changes, update the localStorage
    watch(habbits, newValue => {
      localStorage.setItem(key, JSON.stringify(newValue)), { deep: true }
    })
  }

  return { habbits, add, fill }
})
