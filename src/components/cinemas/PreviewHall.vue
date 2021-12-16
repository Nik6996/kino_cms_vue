<template>
  <div>
    <transition name="fade">
      <div v-show="modal" class="plead"></div
    ></transition>

    <div class="hall">
      <transition name="fade">
        <div v-if="modal" class="modal-window">
          <span>Вы действительно хотите удалить зал?</span>
          <div class="modal-window__btns">
            <button @click="remove()" class="modal-window__btn-remove">
              Удалить
            </button>
            <button @click="cancelDeletion()" class="modal-window__btn">
              Отменить
            </button>
          </div>
        </div></transition
      >

      <div v-bind:class="{ active: modal }" class="hall__main">
        <div class="hall__number">{{ this.number }} <span>Зал</span></div>
        <div class="hall__date">{{ this.date }}</div>
      </div>
      <div class="hall__edit">
        <router-link
          :to="{
            name: 'editHall',
            params: { id: +this.id, idCinema: this.cinemaId },
          }"
        >
          <img src="@/assets/icon/edit-hall.png" alt="" />
        </router-link>
      </div>
      <div
        v-if="this.$store.getters[`cinema/getHalls`].length > 1"
        @click="modalRemove()"
        v-bind:disabled="modal"
        class="hall__remove"
      >
        <img src="@/assets/icon/remove-hall.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      number: this.$attrs.modelValue.hallUa.number,
      date: new Date().toLocaleDateString(),
      id: this.$attrs.modelValue.id,
      cinemaId: "",
      modal: false,
    };
  },
  created() {
    this.cinemaId = this.$route.params.id;
  },
  methods: {
    modalRemove() {
      this.modal = true;
    },
    cancelDeletion() {
      this.modal = false;
    },
    async remove() {
      await this.$emit("removeHall", this.$attrs.modelValue);
      this.$store.dispatch("cinema/removeHall", this.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.hall {
  position: relative;
  margin: 0 auto;
  height: 40px;
  display: flex;

  &__main {
    min-width: 800px;
    height: 40px;
    background-color: rgb(231, 230, 230);
    display: flex;
    align-items: center;
    justify-content: space-around;
    border: solid 1px black;
  }

  &__number {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    padding: 0px 10px;
    height: 100%;
    align-items: center;
    font-weight: 500;
    span {
      margin-left: 6px;
    }
  }

  &__date {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    padding: 0px 10px;
    border-left: solid 1px black;
    font-weight: 500;
  }

  &__edit {
    cursor: pointer;
    margin: 0px 20px;
    img {
      width: 25px;
      height: 25px;
    }
  }

  &__remove {
    cursor: pointer;
    img {
      width: 20px;
      height: 25px;
    }
  }
}
.modal-window {
  position: absolute;
  right: -300px;
  top: -40px;
  max-width: 200px;
  background-color: burlywood;
  border-radius: 10px;
  z-index: 10001;
  span {
    display: block;
    font-size: 14px;
    font-weight: 500;
    padding: 0px 0px 0px 10px;
  }
  &__btn {
    font-size: 12px;
    width: 70px;
    height: 25px;
    margin: 5px 10px;
  }
  &__btn-remove {
    font-size: 12px;
    width: 70px;
    height: 25px;
    margin: 5px 10px;
    background: red;
    color: white;
  }
  &__btns {
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.plead {
  display: flex;
  justify-content: center;
  position: absolute;
  z-index: 10000;
  top: 0;
  left: 0;
  width: 100%;
  height: 1400px;
  background: rgba(173, 173, 173, 0.233);
}
.active {
  background-color: burlywood;
}
</style>