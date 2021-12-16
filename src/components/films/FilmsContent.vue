<template>
  <div>
    <div v-if="isLoading" class="overlay">
      <div class="overlay__img">
        <span>Загрузка...</span>
        <img src="@/assets/img/overlay.gif" alt="" />
      </div>
    </div>
    <div class="films">
      <div class="films__new">
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
      <div class="films__soon">
        <div class="films__title">
          <p>Список фильмов которые покажут скоро</p>
        </div>
        <div class="films__list">
          <div v-for="(filmSoon, index) in filmsSoon" :key="index">
            <preview-film-soon v-model="filmsSoon[index]" />
          </div>
        </div>
        <button class="films__btn">
          <router-link class="button" to="/films/createFilmSoon"
            >Добавить</router-link
          >
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import PreviewFilm from "@/components/films/filmListNow/PreviewFilm.vue";
import PreviewFilmSoon from "@/components/films/filmListSoon/PreviewFilmSoon.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    PreviewFilm,
    PreviewFilmSoon,
  },
  data() {
    return {};
  },
  created: function () {
    this.$store.dispatch("film/loadFims");
    this.$store.dispatch("filmSoon/loadFims");
  },

  computed: {
    ...mapGetters({
      isLoading: "film/isLoading",
      films: "film/getFilms",
      isLoadingSoon: "filmSoon/isLoading",
      filmsSoon: "filmSoon/getFilms",
    }),
  },

  methods: {
    // reloadPage() {
    //   window.location.reload();
    // },
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
  &__new {
    margin-bottom: 60px;
  }

  &__soon {
    padding-bottom: 30px;
  }
}
.overlay {
  display: flex;

  justify-content: center;
  position: absolute;
  z-index: 10000;
  top: 0;
  left: 0;
  width: 100%;
  height: 3000px;
  background: rgba(233, 233, 233, 0.719);
  &__img {
    width: 60px;
    height: 60px;
    display: flex;
    flex-direction: column;
    margin-top: 10%;
    position: fixed;
    img {
    }
    span {
      font-size: 25px;
      margin-bottom: 15px;
    }
  }
}
.img-film {
  width: 110px;
  height: 110px;
}
.button {
  color: black;
}
</style>