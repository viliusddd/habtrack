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
          <div class="day__week-day">SUN</div>
        </div>
      </div>
      <div class="habbits-container">
        <div class="habbit">
          <div class="habbit__title">
            <div class="habbit__color"></div>
            <div class="habbit__name"></div>
          </div>
          <div class="habbit__labels"></div>
        </div>
        <div class="bottom-container">
          <div class="new-habbit">
            <div class="new-habbit__btn"></div>
            <div class="new-habbit__name"></div>
          </div>
          <div class="message-panel"></div>
        </div>
      </div>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  font-size: 3ch;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 1rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
