<template>
  <div>
    <div class="card">
      <div class="card__content">
        <router-link
          class="card__link"
          :to="'/film/' + this.$attrs.modelValue.id"
        >
          <div class="card__img">
            <img :src="img" alt="" />
          </div>
          <div class="card__title">{{ name }}</div></router-link
        >

        <button>Купить билет</button>
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
  height: 420px;
  margin: 10px;

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
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
  button {
    margin: 0px 10px;
    font-size: 17px;
    border-radius: 10px;
    background-color: green;
    margin-bottom: 10px;
  }
}
</style>