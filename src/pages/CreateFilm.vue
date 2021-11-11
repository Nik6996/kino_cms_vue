<template>
  <div>
    <div class="film">
      <div class="film__lang">
        <button @click="ukrLearn()" class="film__ukr">Украинский</button>
        <button @click="rusLearn()" class="film__rus">Русский</button>
      </div>
    </div>
    <div v-if="this.ukr == true"><film-pages-ua :itemUa="items.itemUa" /></div>
    <div v-else><film-pages-rus :itemRu="items.itemRu" /></div>

    <div class="film__btns">
      <button @click="save(), $router.push('/films')">Сохранить</button>
      <button class="film__return">Вернуть базовую версию</button>
    </div>
  </div>
</template>

<script>
import FilmPagesRus from "@/components/FilmPagesRus.vue";
import FilmPagesUa from "@/components/FilmPagesUa.vue";
export default {
  data() {
    return {
      items: {
        itemUa: {
          nameFilm: "",
          descriptionFilm: "",
          mainImg: "",
          mainImgUrl: "",
          galleryImg: null,
          refTrailer: "",
          typeFilm: [],
          seoUrl: "",
          seoTitle: "",
          seoKeywords: "",
          seoDescription: "",
        },
        itemRu: {
          nameFilm: "",
          descriptionFilm: "",
          mainImg: "",
          mainImgUrl: "",
          galleryImg: null,
          refTrailer: "",
          typeFilm: [],
          seoUrl: "",
          seoTitle: "",
          seoKeywords: "",
          seoDescription: "",
        },
        id: null,
      },

      ukr: true,
      rus: false,
    };
  },
  created: function () {
    this.items.id = new Date().valueOf();
  },
  components: {
    FilmPagesRus,
    FilmPagesUa,
  },
  methods: {
    save() {
      this.$store.dispatch("film/saveFilm", this.items);
    },
    ukrLearn() {
      this.ukr = true;
      this.rus = false;
    },
    rusLearn() {
      this.rus = true;
      this.ukr = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.film {
  margin: 10px 40px;
  &__lang {
    display: flex;
    justify-content: flex-end;
  }

  &__ukr,
  &__rus {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    width: 120px;
    height: 30px;
  }
  &__rus:focus {
    background-color: rgb(182, 182, 182);
  }
  &__ukr:focus {
    background-color: rgb(212, 212, 212);
  }
  &__btns {
    display: flex;
    justify-content: center;
    margin: 30px 0px;
  }
  &__return {
    margin-left: 50px;
  }
}
.radio1 {
  //   opacity: 0;
  //   visibility: hidden;
}
.radio2 {
  //   opacity: 0;
  //   visibility: hidden;
}
</style>