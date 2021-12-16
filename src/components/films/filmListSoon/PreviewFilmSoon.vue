<template>
  <div>
    <div @click="deleteCart" class="cart__delete"><span>X</span></div>
    <router-link
      class="button"
      :to="'/films/edit/filmSoon/' + this.$attrs.modelValue.id"
    >
      <div class="cart">
        <div class="cart__img">
          <img v-if="previewImg" v-bind:src="previewImg" alt="" />
          <img v-else src="@/assets/img/prevue.png" alt="" />
        </div>
        <div class="cart__name">
          <span v-if="nameFilm">{{ nameFilm }}</span>
          <span v-else>Название фильма</span>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      previewImg: this.$attrs.modelValue.itemUa.mainImgUrl.url,
      nameFilm: this.$attrs.modelValue.itemUa.nameFilm,
    };
  },

  methods: {
    deleteCart() {
      this.$store.dispatch("filmSoon/deleteFilm", this.$attrs.modelValue);
    },
  },
};
</script>

<style lang="scss" scoped>
.cart {
  width: 200px;
  height: 220px;

  margin: 30px 20px;
  &__img {
    cursor: pointer;
    img {
      width: 180px;
      height: 200px;
    }
  }

  &__name {
    color: black;
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
</style>