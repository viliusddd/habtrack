<script setup>
import NavPanel from '@/components/NavPanel.vue'
import {useHabbitsStore} from '@/stores/HabbitsStore'

const habbitsStore = useHabbitsStore()

habbitsStore.fill()
</script>

<template>
  <NavPanel class="navigation" />
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<style scoped>
.container {
  margin: 0 5px;
}
</style>
