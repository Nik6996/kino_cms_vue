<template>
  <div>
    <div class="cinema">
      <div class="cinema__content">
        <div class="cinema__main-img"><img :src="mainImg" alt="" /></div>
        <div class="cinema__top">
          <div class="cinema__name">{{ name }}</div>
          <div class="cinema__logo"><img :src="logo" alt="" /></div>
          <button>Расписание Сеансов</button>
        </div>
        <div class="cinema__description">
          <div class="cinema__halls">
            <div class="cinema__title">
              Колличество залов: {{ halls.length }}
            </div>
            <div v-for="(item, index) in halls" :key="item.id">
              <preview-halls-home v-model="halls[index]" />
            </div>
          </div>
          <span>{{ description }}</span>
        </div>
        <div class="cinema__conditions">
          <div class="cinema__conditions-title">Условия</div>
          <span>{{ conditions }}</span>
        </div>
        <div class="cinema__gallary">
          <swiper
            :spaceBetween="30"
            :centeredSlides="true"
            :autoplay="{
              delay: 4000,
              disableOnInteraction: false,
            }"
            :pagination="{
              clickable: true,
            }"
            :navigation="true"
            class="film__swiper"
          >
            >
            <swiper-slide v-for="(img, index) in gallary" :key="index"
              ><img :src="gallary[index]" alt="" />
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PreviewHallsHome from "@/components/home/cinemas/PreviewHallsHome";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
SwiperCore.use([Autoplay, Pagination, Navigation]);
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      cinema: "",
      mainImg: "",
      name: "",
      logo: "",
      gallary: [],
      description: "",
      conditions: "",
      halls: [],
    };
  },
  components: {
    Swiper,
    SwiperSlide,
    PreviewHallsHome,
  },
  async mounted() {
    await this.$store.dispatch("cinema/loadCinema");
    this.loadCinema();
  },
  watch: {
    cinema: {
      handler(cinema) {
        this.mainImg = cinema.cinemaUa.banner.imgUrl;
        this.logo = cinema.cinemaUa.logo.imgUrl;
        this.name = cinema.cinemaUa.name;
        this.description = cinema.cinemaUa.description;
        this.conditions = cinema.cinemaUa.conditions;
        this.halls = cinema.halls;

        const gallary = cinema.cinemaUa.gallary;

        gallary.forEach((item) => {
          this.gallary.push(item.url);
        });
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters({
      hallsArr: "cinema/getHalls",
      cinemas: "cinema/getCinemas",
    }),
  },
  methods: {
    async loadCinema() {
      const id = this.$route.params.id;

      await this.cinemas.forEach((cinema) => {
        if (id == cinema.id) {
          this.cinema = cinema;
          this.$store.dispatch("cinema/setHallsArray", cinema.halls);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.cinema {
  &__content {
    width: 1300px;
    margin: 0 auto;
  }

  &__main-img {
    width: 100%;
    height: 500px;
    background-color: rosybrown;
    img {
      width: 100%;
      height: 500px;
      object-fit: cover;
    }
  }

  &__top {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    button {
      height: 40px;
      width: 180px;
      background-color: green;
      color: white;
      border-radius: 10px;
    }
  }
  &__logo {
    margin: 0px 30px;
    background-color: rosybrown;
    width: 200px;
    height: 150px;
    img {
      width: 200px;
      height: 150px;
    }
  }
  &__name {
    font-weight: 500;
    font-size: 30px;
    margin: 0 20px;
  }

  &__title {
    white-space: nowrap;
    margin-bottom: 10px;
  }

  &__description {
    display: flex;
    margin-top: 20px;
    span {
      margin-left: 50px;
    }
  }

  &__conditions {
    span {
      display: block;
      width: 700px;
      margin: 0 auto;
      padding-bottom: 30px;
    }
  }

  &__conditions-title {
    display: flex;
    justify-content: center;
    font-weight: 500;
    font-size: 30px;
    margin: 30px 0px 10px 0px;
  }

  &__gallary {
    width: 500px;
    height: 300px;
    img {
      width: 500px;
      height: 300px;
      object-fit: cover;
    }
    span {
      margin: 10px;
      display: flex;
      justify-content: center;
      font-weight: 500;
      font-size: 25px;
    }
    margin: 0 auto;
  }
}
</style>