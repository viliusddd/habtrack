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

  const getDateFromNum = num => {
    const todayDate = new Date()
    const prevDay = new Date()
    prevDay.setDate(todayDate.getDate() - num)
    return prevDay
  }

  const numOfDays = ref(5)

  const arrayOfDates = computed(() => getDaysArray(getDateFromNum(numOfDays.value), new Date()))

  /**
   * @param {*} prevDay - the farthest day shown in app
   * @param {*} today
   * @return {Date[]} - array of Date obj (days) from the closest to farthest.
   */
  function getDaysArray(prevDay, today) {
    const arr = []
    for (let day = today; day >= prevDay; day.setDate(day.getDate() - 1)) {
      arr.push(new Date(day))
    }
    return arr
  }

  return { habbits, add, fill, newId, numOfDays, arrayOfDates }
})
