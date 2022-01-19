<template>
  <div>
    <div class="card">
      <div class="card__content">
        <router-link
          class="card__link"
          :to="'/film/soon/' + this.$attrs.modelValue.id"
        >
          <div class="card__img">
            <img :src="img" alt="" />
          </div>
          <div class="card__title">{{ name }}</div>
        </router-link>
        <div class="card__date">
          <span>Дата выхода</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      img: this.$attrs.modelValue.itemUa.mainImgUrl.url,
      name: this.$attrs.modelValue.itemUa.nameFilm,
    };
  },
};
</script>

<style lang="scss" scoped>
.card {
  //background-color: yellowgreen;
  width: 230px;
  height: 400px;
  margin: 10px;
  &__content {
    display: flex;
    flex-direction: column;
  }

  &__img {
    width: 230px;
    height: 300px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__title {
    margin: 10px 10px;
    font-weight: 500;
    font-size: 20px;
  }
  span {
    margin: 0px 10px;
    font-size: 17px;
    color: green;
  }
}
</style>