import { defineStore } from 'pinia'
import { computed, watch, ref } from 'vue'

export const useHabbitsStore = defineStore('HabbitsStore', () => {
  const habbits = ref([])

  const key = 'habbits'

  async function fill() {
    const storageVal = localStorage.getItem(key)
    if (storageVal) {
      habbits.value = JSON.parse(storageVal)

      addMissingMarks()
    } else {
      localStorage.setItem(key, '')
    }
  }

  function addHabbit(data) {
    habbits.value.push(data)
    console.log(data)
  }

  function addMissingMarks() {
    for (const habbit of habbits.value) {
      for (const shownDate of arrayOfDates.value.slice(0, shownDays.value)) {
        const shownDateStr = shownDate.toLocaleDateString('lt')

        if (!habbit.days.map(day => day.date).includes(shownDateStr)) {
          habbit.days.push({
            date: shownDateStr,
            isMarked: false,
            comment: ''
          })
        }
      }
      habbit.days.sort((a, b) => b.date.localeCompare(a.date))
    }
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

  const numOfDays = ref(14)
  const shownDays = ref(14)

  const arrayOfDates = computed(() => getDaysFromToday(numOfDays.value))

  function getDaysFromToday(prevDay) {
    const today = new Date()
    prevDay = new Date(new Date().setDate(today.getDate() + 1 - prevDay))

    const arr = []
    for (let day = today; day >= prevDay; day.setDate(day.getDate() - 1)) {
      arr.push(new Date(day))
    }
    return arr
  }

  return { habbits, addHabbit, fill, newId, numOfDays, shownDays, arrayOfDates }
})
