<script setup>
import { computed, ref } from 'vue'
import { useHabbitsStore } from '@/stores/HabbitsStore'
import { useRouter } from 'vue-router'
import { onClickOutside } from '@vueuse/core'

const habbitStore = useHabbitsStore()

const props = defineProps({
  id: Number
})

const modal = ref(false)
const modalRef = ref(null)

const target = ref(null)

const currentHabbit = computed(() => habbitStore.habbits.find(hab => hab.id === props.id))

onClickOutside(target, event => console.log(event))

onClickOutside(modalRef, event => {
  modal.value = false
  useRouter().back()
})

function deleteHabbit() {
  useRouter().back()
  habbitStore.habbits = habbitStore.habbits.filter(obj => obj.id !== props.id)
}
</script>

<template>
  <div ref="target" class="modal">
    <label class="modal__title-label" for="change-name">Change the name of the habit: </label><br />
    <input class="modal__title" v-model="currentHabbit.name" id="change-name" autocomplete="off" />
    <br />

    <div class="delete">
      <button class="delete__btn" @click="deleteHabbit">Delete habbit</button>
    </div>
  </div>
</template>

<style scoped>
.modal {
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
  z-index: 99;
  background: rgba(255, 255, 255, 0.059);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
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
  margin-bottom: 0;
  margin-top: auto;
}
</style>
