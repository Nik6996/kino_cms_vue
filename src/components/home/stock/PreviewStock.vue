<template>
  <div>
    <div class="card">
      <div class="card__content">
        <router-link
          class="card__link"
          :to="'/stock/home/' + this.$attrs.modelValue.id"
          ><div class="card__img"><img :src="img" alt="" /></div>
          <div class="card__name">{{ name }}</div>
        </router-link>

        <div class="card__date">{{ this.date.toLocaleDateString() }}</div>
        <div class="card__deck">{{ description }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      img: this.$attrs.modelValue.stockUa.mainImg.imgUrl,
      name: this.$attrs.modelValue.stockUa.name,
      date: this.$attrs.modelValue.stockUa.date,
      description: this.$attrs.modelValue.stockUa.description,
    };
  },
};
</script>

<style lang="scss" scoped>
.card {
  margin: 30px;
  width: 300px;
  background-color: rgb(37, 36, 36);
  &__content {
    padding: 10px;
  }

  &__img {
    width: 300px;
    height: 300px;
    border-radius: 10px;
    img {
      width: 300px;
      height: 300px;
      object-fit: cover;
      border-radius: 10px;
    }
  }

  &__name {
    margin: 20px 0px;
    font-weight: 900;
    color: blue;
  }

  &__date {
    padding: 2px;
    display: inline;
    border-radius: 10px;
    color: white;
    background-color: rgb(70, 70, 70);
  }

  &__deck {
    margin-top: 10px;
    color: rgb(212, 212, 212);
  }
}
</style>
