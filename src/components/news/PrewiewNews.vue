<template>
  <div>
    <transition name="fade">
      <div v-show="modal" class="plead"></div
    ></transition>
    <div class="news">
      <transition name="fade">
        <div v-if="modal" class="modal-window">
          <span>Вы действительно хотите удалить новость?</span>
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

      <div v-bind:class="{ active: modal }" class="news__main">
        <div class="news__name">{{ this.name }}</div>
        <div class="news__date">{{ this.date.toLocaleDateString() }}</div>
        <div class="news__status">{{ this.status }}</div>
      </div>
      <div class="news__btns">
        <div class="news__edit">
          <router-link :to="'/news/edit/' + this.$attrs.modelValue.id">
            <img src="@/assets/icon/edit-hall.png" alt="" />
          </router-link>
        </div>
        <div @click="modalRemove()" class="news__remove">
          <img src="@/assets/icon/remove-hall.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: this.$attrs.modelValue.newsUa.name,
      date: this.$attrs.modelValue.newsUa.date,
      status: "",
      id: this.$attrs.modelValue.id,
      modal: false,
    };
  },
  //.toLocaleDateString()
  mounted() {
    if (this.$attrs.modelValue.toggle === "true") {
      this.status = "Вкл";
    }
    if (this.$attrs.modelValue.toggle === "false") {
      this.status = "Выкл";
    }
  },
  methods: {
    modalRemove() {
      this.modal = true;
    },
    cancelDeletion() {
      this.modal = false;
    },
    remove() {
      this.$store.dispatch("news/removeNews", this.$attrs.modelValue);
    },
  },
};
</script>

<style lang="scss" scoped>
.news {
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

  &__name {
    display: flex;
    justify-content: flex-start;
    width: 140%;
    padding: 0px 10px;
    height: 100%;
    align-items: center;
    font-weight: 500;
    span {
      margin-left: 6px;
    }
  }

  &__date,
  &__status {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    padding: 0px 10px;
    border-left: solid 1px black;
    font-weight: 500;
  }

  &__status {
    width: 60%;
  }

  &__btns {
    display: flex;
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
      width: 22px;
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
  height: 100%;
  background: rgba(173, 173, 173, 0.233);
}
.active {
  background-color: burlywood;
}
</style>