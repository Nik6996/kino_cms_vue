<template>
  <div>
    <div v-if="isLoading" class="overlay">
      <div class="overlay__img">
        <span>Загрузка...</span>
        <img src="@/assets/img/overlay.gif" alt="" />
      </div>
    </div>
    <div class="film">
      <div class="film__lang">
        <button @click="ukrLearn()" class="film__ukr">Украинский</button>
        <button @click="rusLearn()" class="film__rus">Русский</button>
      </div>
    </div>

    <div v-if="this.ukr == true">
      <film-ua-soon
        @imgIdRemoveUa="idRemoveUa"
        ref="uaFilm"
        :itemUa="items.itemUa"
      />
    </div>

    <div v-else>
      <film-rus-soon
        @imgIdRemoveRu="idRemoveRu"
        ref="ruFilm"
        :itemRu="items.itemRu"
      />
    </div>

    <div class="film__btns">
      <button @click="save()">Сохранить</button>
      <button v-if="items.id" @click="returnBaseVersion()" class="film__return">
        Вернуть базовую версию
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import FilmRusSoon from "@/components/films/filmListSoon/FilmRusSoon.vue";
import FilmUaSoon from "@/components/films/filmListSoon/FilmUaSoon.vue";

export default {
  data() {
    return {
      items: {
        itemUa: {
          nameFilm: "",
          descriptionFilm: "",
          mainImg: "",
          mainImgUrl: {
            url: "",
            idImg: "",
          },
          galleryImg: [],
          galleryImgUrl: [],
          refTrailer: "",
          typeFilm: ["2D"],
          seoUrl: "",
          seoTitle: "",
          seoKeywords: "",
          seoDescription: "",
          idImgRemove: [],
          fileLocal: "",
        },
        itemRu: {
          nameFilm: "",
          descriptionFilm: "",
          mainImg: "",
          mainImgUrl: {
            url: "",
            idImg: "",
          },
          galleryImg: [],
          galleryImgUrl: [],
          refTrailer: "",
          typeFilm: ["2D"],
          seoUrl: "",
          seoTitle: "",
          seoKeywords: "",
          seoDescription: "",
          idImgRemove: [],
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
      isLoading: "filmSoon/isLoading",
      films: "filmSoon/getFilms",
    }),
  },

  components: {
    FilmUaSoon,
    FilmRusSoon,
  },
  async created() {
    await this.$store.dispatch("filmSoon/loadFims");
    if (this.$route.params.id) {
      await this.loadFilm();
      console.log(this.items.itemUa);
      this.$refs.uaFilm.loadImg();
    } else {
      console.log("false");
    }
  },

  methods: {
    idRemoveUa(id) {
      this.items.itemUa.idImgRemove.push({ id });
    },
    idRemoveRu(id) {
      this.items.itemRu.idImgRemove.push({ id });
    },

    async loadFilm() {
      const routeId = this.$route.params.id;
      this.films.forEach((film) => {
        if (routeId == film.id) {
          this.items = film;
        }
      });
    },
    async save() {
      if (!this.items.id) {
        this.items.id = new Date().valueOf();
      }

      try {
        await this.$store.dispatch("filmSoon/saveFilm", this.items);
        console.log(this.items);
        this.$router.push("/films");
      } catch (error) {
        console.log(error);
      }
    },
    returnBaseVersion() {
      window.location.reload();
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
.overlay {
  display: flex;

  justify-content: center;
  position: absolute;
  z-index: 10000;
  top: 0;
  left: 0;
  width: 100%;
  height: 3000px;
  background: rgb(233, 233, 233);
  &__img {
    display: flex;
    flex-direction: column;
    margin-top: 10%;
    position: fixed;
    span {
      font-size: 45px;
      margin-bottom: 15px;
    }
  }
}
</style>