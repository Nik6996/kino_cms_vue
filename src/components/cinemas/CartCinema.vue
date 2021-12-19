<template>
  <div>
    <div v-if="loading" class="overlay">
      <div class="overlay__img">
        <span>Загрузка...</span>
        <img src="@/assets/img/overlay.gif" alt="" />
      </div>
    </div>
    <div class="cinema">
      <div class="cinema__lang">
        <button
          v-bind:class="{ active: isActive }"
          @click="currentComponent = 'CinemaUa'"
          class="cinema__ua"
        >
          Украинский
        </button>
        <button
          v-bind:class="{ active: !isActive }"
          @click="currentComponent = 'CinemaRu'"
          class="cinema__ru"
        >
          Русский
        </button>
      </div>
    </div>
    <div class="cinema__content">
      <keep-alive>
        <component
          @removeGallaryUa="removeGallaryUa"
          @removeGallaryRu="removeGallaryRu"
          @saveLocalFilm="saveLocal"
          @removeDatabaseHall="removeHall"
          :cinemaUa="cinema.cinemaUa"
          :cinemaRu="cinema.cinemaRu"
          :hallList="cinema.halls"
          :is="currentComponent"
        ></component
      ></keep-alive>
    </div>

    <button @click="save()" class="cinema__save">Сохранить</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CinemaRu from "@/components/cinemas/cinema-ru/CinemaRu.vue";
import CinemaUa from "@/components/cinemas/cinema-ua/CinemaUa.vue";

export default {
  data() {
    return {
      cinema: {
        cinemaUa: {
          name: "",
          description: "",
          conditions: "",
          logo: {
            img: "",
            imgUrl: "",
            id: "",
            logoLocal: "",
          },
          banner: {
            img: "",
            imgUrl: "",
            id: "",
            bannerLocal: "",
          },
          gallary: [],

          seoUrl: "",
          seoTitle: "",
          seoKeywords: "",
          seoDescription: "",
          cinemaId: "",
          idRemoveGallary: [],
        },
        cinemaRu: {
          name: "",
          description: "",
          conditions: "",
          logo: {
            img: "",
            imgUrl: "",
            id: "",
            logoLocal: "",
          },
          banner: {
            img: "",
            imgUrl: "",
            id: "",
            bannerLocal: "",
          },
          gallary: [],
          gallaryUrl: [],
          seoUrl: "",
          seoTitle: "",
          seoKeywords: "",
          seoDescription: "",
          cinemaId: "",
          idRemoveGallary: [],
        },
        id: "",
        halls: [],
        hallsForDelete: [],
      },
      isActive: true,
      currentComponent: "CinemaUa",
      loading: false,
    };
  },
  components: {
    CinemaRu,
    CinemaUa,
  },

  computed: {
    ...mapGetters({
      hallsArr: "cinema/getHalls",
      cinemaLocal: "cinema/getCinema",
      isLoading: "cinema/isLoading",
      cinemas: "cinema/getCinemas",
    }),
  },

  watch: {
    currentComponent: {
      handler(data) {
        if (data == "CinemaUa") {
          this.isActive = true;
        } else {
          this.isActive = false;
        }
      },
    },
    isLoading: {
      handler(isLoading) {
        this.loading = isLoading;
      },
    },
  },

  async mounted() {
    this.cinema.halls = this.hallsArr;

    if (this.cinemaLocal) {
      this.cinema = this.cinemaLocal;
    }
    if (this.cinema.id) {
      this.cinema.cinemaUa.cinemaId = this.cinema.id;
      this.cinema.cinemaRu.cinemaId = this.cinema.id;
    }
    if (!this.cinema.id) {
      (this.cinema.id = this.$route.params.id) ||
        (this.cinema.id = new Date().valueOf());
      this.cinema.cinemaUa.cinemaId = this.cinema.id;
      this.cinema.cinemaRu.cinemaId = this.cinema.id;
    }
    if (this.$route.params.id) {
      this.loadCinema();
      if (!this.cinemas.length) {
        await this.$store.dispatch("cinema/loadCinema");
        this.loadCinema();
      }
    }
  },

  methods: {
    removeHall(hall) {
      if (!this.cinema.hallsForDelete) {
        this.cinema.hallsForDelete = [];
        this.cinema.hallsForDelete.push(hall);
      } else {
        this.cinema.hallsForDelete.push(hall);
      }
    },
    removeGallaryUa(id) {
      this.cinema.cinemaUa.idRemoveGallary.push(id);
    },
    removeGallaryRu(id) {
      this.cinema.cinemaRu.idRemoveGallary.push(id);
    },
    async loadCinema() {
      const id = this.$route.params.id;

      await this.cinemas.forEach((cinema, index) => {
        if (id == cinema.id) {
          this.cinema = cinema;
          this.$store.dispatch("cinema/setHallsArray", cinema.halls);
        }
      });
    },
    saveLocal() {
      this.$store.dispatch("cinema/saveCinemaLocal", this.cinema);
    },
    async save() {
      await this.$store.dispatch("cinema/saveCinema", this.cinema);
      await this.$store.dispatch("cinema/saveHall", null);
      await this.$store.dispatch("cinema/saveCinemaLocal", null);
      this.$router.push("/cinemas");
    },
  },
};
</script>

<style lang="scss" scoped>
.cinema {
  margin-top: 20px;
  &__lang {
    display: flex;
    justify-content: flex-end;
    margin-right: 10px;
  }
  &__ua,
  &__ru {
    cursor: pointer;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    width: 120px;
    height: 30px;
    // background-color: rgb(161, 161, 161);
    display: flex;
    justify-content: center;
    border: solid 2px black;
  }

  &__save {
    display: flex;
    margin: 0 auto;
    margin-bottom: 20px;
  }
}
.active {
  background-color: rgb(121, 120, 120);
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
    justify-content: center;
    flex-direction: column;
    margin-top: 10%;
    position: fixed;
    span {
      font-size: 35px;
      margin-bottom: 15px;
    }
    img {
      width: 50px;
      height: 50px;
      margin: 0 auto;
    }
  }
}
</style>