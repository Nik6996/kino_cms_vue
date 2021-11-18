<template>
  <div>
    <div v-if="isLoading" class="overlay"></div>
    <div class="film">
      <div class="film__lang">
        <button @click="ukrLearn()" class="film__ukr">Украинский</button>
        <button @click="rusLearn()" class="film__rus">Русский</button>
      </div>
    </div>

    <div v-if="this.ukr == true">
      <film-pages-ua ref="saveGallary" :itemUa="items.itemUa" />
    </div>
    <div v-else><film-pages-rus :itemRu="items.itemRu" /></div>

    <div class="film__btns">
      <button @click="save()">Сохранить</button>
      <button class="film__return">Вернуть базовую версию</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
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
          galleryImg: [],
          galleryImgUrl: [],
          refTrailer: "",
          typeFilm: [],
          seoUrl: "",
          seoTitle: "",
          seoKeywords: "",
          seoDescription: "",
          fileLocal: "",
        },
        itemRu: {
          nameFilm: "",
          descriptionFilm: "",
          mainImg: "",
          mainImgUrl: "",
          galleryImg: [],
          galleryImgUrl: [],
          refTrailer: "",
          typeFilm: [],
          seoUrl: "",
          seoTitle: "",
          seoKeywords: "",
          seoDescription: "",
          fileLocal: "",
        },
        id: null,
      },

      ukr: true,
      rus: false,
    };
  },
  computed: {
    ...mapGetters({
      isLoading: "film/isLoading",
    }),
  },

  components: {
    FilmPagesRus,
    FilmPagesUa,
  },

  methods: {
    async save() {
      this.items.id = new Date().valueOf();

      try {
        await this.$store.dispatch("film/saveFilm", this.items);
        this.$router.push("/films");
      } catch (error) {
        console.log(error);
      }
      // this.$refs.saveGallary.saveImgGallary();
    },

    ukrLearn() {
      this.ukr = true;
      this.rus = false;
    },
    rusLearn() {
      this.rus = true;
      this.ukr = false;
      //this.$store.dispatch("film/saveFilmStore", this.items);
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
.overlay {
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 3000px;
  background: rgba(95, 93, 93, 0.733);
}
</style>