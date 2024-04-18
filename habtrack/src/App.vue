<script setup>
import NavPanel from '@/components/NavPanel.vue'
import {useHabbitsStore} from '@/stores/HabbitsStore'

const habbitsStore = useHabbitsStore()

habbitsStore.fill()
</script>

<template>
  <NavPanel />
  <div class="container">
    <router-view></router-view>
  </div>
</template>
