<template>
  <div>
    <div class="films">
      <div class="films__title"><p>Список фильмов текущих</p></div>
      <div class="films__list"></div>
      <button @click="$router.push('/createFilm')" class="films__btn">
        Добавить
      </button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.films {
  &__title {
    display: flex;
    justify-content: center;
    font-size: 30px;
    font-weight: 600;
  }
  &__list {
    min-height: 200px;
  }
  &__btn {
    margin: 0 auto;
    display: flex;
    justify-content: center;
  }
}
</style>