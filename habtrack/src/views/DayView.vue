<script setup>
const props = defineProps({
  date: String
})
</script>

<template>
  <h1>Day view for {{ $route.params.date }}</h1>
</template>

<style scoped></style>
