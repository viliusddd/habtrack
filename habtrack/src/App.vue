<script setup>
import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <p class="logo">habtrack</p>
    <div class="wrapper">
      <div class="days-container">
        <div class="day">
          <div class="day__date">7</div>
          <div class="day__week-day">sun</div>
        </div>
        <div class="day">
          <div class="day__date">6</div>
          <div class="day__week-day">sat</div>
        </div>
        <div class="day">
          <div class="day__date">5</div>
          <div class="day__week-day">fri</div>
        </div>
        <div class="day">
          <div class="day__date">4</div>
          <div class="day__week-day">thu</div>
        </div>
        <div class="day">
          <div class="day__date">3</div>
          <div class="day__week-day">wed</div>
        </div>
      </div>
      <div class="habbits-container">
        <div class="habbit">
          <div class="habbit__title">
            <div class="habbit__color">o</div>
            <div class="habbit__name">Make the bed</div>
          </div>
          <div class="habbit__cells">
            <dir class="habbit__cell">x</dir>
            <dir class="habbit__cell">x</dir>
            <dir class="habbit__cell">x</dir>
            <dir class="habbit__cell">x</dir>
            <dir class="habbit__cell">x</dir>
          </div>
        </div>
        <div class="habbit">
          <div class="habbit__title">
            <div class="habbit__color">o</div>
            <div class="habbit__name">Brush my teeth</div>
          </div>
          <div class="habbit__cells">
            <dir class="habbit__cell success">v</dir>
            <dir class="habbit__cell">x</dir>
            <dir class="habbit__cell">x</dir>
            <dir class="habbit__cell">x</dir>
            <dir class="habbit__cell">x</dir>
          </div>
        </div>
        <div class="bottom-container">
          <div class="new-habbit">
            <div class="new-habbit__btn">+</div>
            <div class="new-habbit__name">New habbit</div>
          </div>
          <div class="message-panel">Add new habbit by pressing +</div>
        </div>
      </div>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  /* margin: 5px; */
}
.logo {
  font-size: 3ch;
}
.days-container {
  display: flex;
  /* grid-template-columns: repeat(5, 1fr); */
  /* border: 1px solid gray; */
  /* flex-basis: auto; */
  align-self: flex-end;
}
.day {
  width: 40px;
  height: 40px;
  /* border: 1px solid gray; */
}
.day__date {
  display: flex;
  justify-content: center;
  align-items: center;
}
.day__week-day {
  display: flex;
  justify-content: center;
  align-items: center;
}
.habbits-container {
  display: flex;
  flex-direction: column;
  /* border: 1px solid gray; */
  row-gap: 1px;
}
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

.success {
  color: greenyellow;
}

.bottom-container {
  display: flex;
  /* border: 1px solid yellow; */
  height: 40px;
}
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
}
.new-habbit__name {
  display: flex;
  align-items: center;
  width: 130px;
}
.message-panel {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
