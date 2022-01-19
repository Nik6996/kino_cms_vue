<template>
  <div>
    <router-link class="button" :to="'/cinema/' + this.$attrs.modelValue.id">
      <div class="cart">
        <div class="cart__img">
          <img v-if="previewImg" v-bind:src="previewImg" alt="" />
          <img v-else src="@/assets/img/prevue.png" alt="" />
        </div>
        <div class="cart__name">
          <span v-if="nameCinema">{{ nameCinema }}</span>
          <span v-else>Название кинотеатра</span>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      previewImg: this.$attrs.modelValue.cinemaUa.logo.imgUrl,
      nameCinema: this.$attrs.modelValue.cinemaUa.name,
      modal: false,
    };
  },

  methods: {
    modalRemove() {
      this.modal = true;
    },
    cancelDeletion() {
      this.modal = false;
    },
    deleteCart() {
      this.$store.dispatch("cinema/removeCinema", this.$attrs.modelValue);
    },
  },
};
</script>

<style lang="scss" scoped>
.cart {
  width: 300px;
  height: 300px;

  margin: 30px 20px;
  &__img {
    cursor: pointer;
    img {
      width: 300px;
      height: 250px;
      object-fit: cover;
    }
  }

  &__name {
    color: black;
    font-size: 22px;
    font-weight: 500;
    display: flex;
    justify-content: center;
  }
  &__delete {
    cursor: pointer;
    display: flex;
    justify-content: flex-end;
    position: relative;
    top: 30px;
    right: 30px;
  }
}
.modal {
  display: flex;
  justify-content: center;
  position: absolute;
  z-index: 10000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // background: rgba(173, 173, 173, 0.233);
  span {
    margin-bottom: 10px;
    font-weight: 500;
  }
  &__block {
    justify-content: center;
    align-items: center;
    width: 250px;
    height: 120px;
    display: flex;
    flex-direction: column;
    background: rgba(0, 38, 255, 0.514);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
}
</style>