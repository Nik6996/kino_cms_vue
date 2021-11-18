<template>
  <div>
    <div v-if="isLoading" class="overlay"></div>
    <div class="films">
      <div class="films__title"><p>Список фильмов текущих</p></div>
      <div class="films__list">
        <div v-for="(film, index) in films" :key="index">
          <preview-film v-model="films[index]" />
        </div>
      </div>

      <button class="films__btn">
        <router-link class="button" to="/films/create">Добавить</router-link>
      </button>
    </div>
  </div>
</template>

<script>
import PreviewFilm from "@/components/PreviewFilm.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    PreviewFilm,
  },
  data() {
    return {};
  },
  created: function () {
    this.$store.dispatch("film/loadFims");
  },

  computed: {
    ...mapGetters({
      isLoading: "film/isLoading",
      films: "film/getFilms",
    }),
  },
  watch: {},

  methods: {
    reloadPage() {
      window.location.reload();
    },
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
    flex-wrap: wrap;
  }
  &__btn {
    margin: 0 auto;
    display: flex;
    justify-content: center;
  }
}
.overlay {
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 3000px;
  background: rgba(95, 93, 93, 0.733);
}
.img-film {
  width: 110px;
  height: 110px;
}
</style>