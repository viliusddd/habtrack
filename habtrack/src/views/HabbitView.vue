<script setup>
import {computed, ref} from 'vue'
import {useHabbitsStore} from '@/stores/HabbitsStore'
import {useRouter} from 'vue-router'

const habbitStore = useHabbitsStore()

habbitStore.hideNavigation = true
const props = defineProps({
  id: Number
})

const target = ref(null)

const currentHabbit = computed(() => {
  return habbitStore.habbits.find(hab => hab.id === props.id)
})

const router = useRouter()

function deleteHabbit() {
  router.back()
  habbitStore.habbits = habbitStore.habbits.filter(obj => obj.id !== props.id)
  habbitStore.hideNavigation = false
}
const closeModal = () => {
  router.back()
  habbitStore.hideNavigation = false
}
</script>

<template>
  <div v-if="currentHabbit" ref="target" class="modal">
    <button @click="closeModal" class="modal__close-btn">x</button>
    <label class="modal__name-label" for="change-name"
      >Edit habbit name:
    </label>
    <input
      class="modal__name"
      v-model="currentHabbit.name"
      id="change-name"
      autocomplete="off"
      maxlength="22"
    />
    <br />

    <div class="hide-btn">
      <input
        class="hide-btn__label"
        type="checkbox"
        id="archive-chbx"
        v-model="currentHabbit.isHidden"
      />
      <label class="hide-btn__checkbox" for="archive-chbx">Hide habbit</label>
    </div>
    <div class="delete">
      <button class="delete__btn" @click="deleteHabbit">Delete habbit</button>
    </div>
  </div>
</template>

<style scoped>
.hide-btn {
  display: flex;
  padding-left: 10px;
  column-gap: 3px;
}
button {
  outline: 0;
  color: inherit;
  cursor: pointer;
  background: transparent;
  border: none;
  border-bottom: 2px solid;
  border-bottom-color: transparent;
  padding: 0;
}
button:hover {
  display: inline-block;
  border-bottom: 2px solid;
}

.modal {
  display: flex;
  flex-direction: column;
  z-index: 99;
  background: rgba(255, 255, 255, 0.059);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  padding: 5px 10px 20px;
  /* width: 55vw; */
  height: 40%;
  border-radius: 6px;
  transition-property: top;
  transition-duration: 900ms;
  height: 150px;
  width: 392.705px;
}

.modal:not(.open) {
  animation: fadeup 250ms;
}
@keyframes fadeup {
  from {
    opacity: 0;
    top: 53%;
  }
  to {
    opacity: 1;
    top: 50%;
  }
}
.modal .actions {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal__title {
  display: flex;
}
.modal__close-btn {
  margin-right: 0;
  margin-left: auto;
  padding: 0 5px 0 5px;
  background: transparent;
  outline: 0;
  color: inherit;
  cursor: pointer;
  border-color: transparent;
}
.modal__name-label {
  padding: 0 0 0 10px;
}
.modal__name {
  display: flex;
  background: transparent;
  border: inherit;
  outline: none;
  color: inherit;
  font-size: 40px;
  border-radius: 2px;
  background: hsla(0, 0%, 100%, 0.02);
  box-shadow: inset 0 0 10px hsla(0, 0%, 0%, 0.397);
  padding: 0 10px 8px 10px;
}
.delete {
  display: flex;
  margin-bottom: 0;
  margin-top: auto;
  padding: 0 0 0 10px;
  row-gap: 5px;
}
.delete__btn {
  margin: 0 auto 0 0;
}
</style>
