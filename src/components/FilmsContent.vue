<template>
  <div>
    <div class="films">
      <div class="films__title"><p>Список фильмов текущих</p></div>
      <div class="films__list"><preview-film /></div>
      <button @click="$router.push('/createFilm')" class="films__btn">
        Добавить
      </button>
    </div>
  </div>
</template>

<script>
import PreviewFilm from "@/components/PreviewFilm.vue";
export default {
  components: {
    PreviewFilm,
  },
};
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
    display: flex;
  }
  &__btn {
    margin: 0 auto;
    display: flex;
    justify-content: center;
  }
}
</style>