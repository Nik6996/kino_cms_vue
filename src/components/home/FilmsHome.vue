<template>
  <div>
    <div class="film">
      <div class="film-content">
        <div v-if="!filmSearch" class="film__slider">
          <swiper
            :spaceBetween="30"
            :centeredSlides="true"
            :autoplay="{
              delay: 3000,
              disableOnInteraction: false,
            }"
            :pagination="{
              clickable: true,
            }"
            class="my-swiper"
          >
            >
            <swiper-slide v-for="(img, index) in imgSlider" :key="index"
              ><img :src="imgSlider[index].mainImgUrl.url" alt="" />
              <span>{{ imgSlider[index].nameFilm }}</span>
            </swiper-slide>
          </swiper>
        </div>
        <div class="film__title"><span>Смотрите сегодня</span></div>
        <div class="film__list">
          <div class="film__not-found" v-if="returnSearchFilms.length <= 0">
            <span>Нечего не найдено...</span>
          </div>
          <div v-for="(film, index) in returnSearchFilms" :key="film.id">
            <preview-film-home v-model="returnSearchFilms[index]" />
          </div>
        </div>
        <div class="film__title"><span>Смотрите скоро</span></div>
        <div class="film__soon">
          <div v-for="(film, index) in filmsSoon" :key="index">
            <preview-film-soon-home v-model="filmsSoon[index]" />
          </div>
        </div>
        <div v-if="!filmSearch" class="film__news">
          <swiper
            :spaceBetween="30"
            :centeredSlides="true"
            :autoplay="{
              delay: 5000,
              disableOnInteraction: false,
            }"
            class="swiper-news"
          >
            >
            <swiper-slide v-for="(img, index) in news" :key="index"
              ><img :src="news[index].image" alt="" />
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import PreviewFilmHome from "@/components/home/films/PreviewFilmHome";
import PreviewFilmSoonHome from "@/components/home/films/PreviewFilmSoonHome";
import { mapGetters } from "vuex";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

import SwiperCore, { Autoplay, Pagination } from "swiper";
SwiperCore.use([Autoplay, Pagination]);
export default {
  data() {
    return {
      imgSlider: [],
    };
  },
  props: {
    filmSearch: {
      type: String,
    },
  },
  components: {
    Swiper,
    SwiperSlide,
    PreviewFilmHome,
    PreviewFilmSoonHome,
  },
  computed: {
    ...mapGetters({
      films: "film/getFilms",
      filmsSoon: "filmSoon/getFilms",
      news: "mainNewsStock/items",
    }),

    returnSearchFilms() {
      return this.films.filter((film) =>
        film.itemUa.nameFilm
          .toLowerCase()
          .includes(this.filmSearch.toLowerCase())
      );
    },
  },
  // watch: {
  //   films: {
  //     handler(films) {
  //       films.forEach((film) => {
  //         this.imgSlider.push(film.itemUa.mainImgUrl.url);
  //       });
  //     },
  //   },
  // },
  async mounted() {
    await this.$store.dispatch("film/loadFims");
    await this.$store.dispatch("filmSoon/loadFims");
    await this.$store.dispatch("mainNewsStock/load");

    await this.films.forEach((film) => {
      const item = film.itemUa;
      this.imgSlider.push(item);
    });
  },
};
</script>

<style lang="scss" scoped>
.film {
  background-color: white;
  width: 1000px;
  margin: 0 auto;
  border-radius: 10px;
  &__slider {
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
  }

  &__title {
    margin: 10px 0px;
    display: flex;
    justify-content: center;
    font-weight: 500;
    font-size: 25px;
  }

  &__soon {
    display: flex;
    flex-wrap: wrap;
  }

  &__news {
    padding-bottom: 20px;
  }
  &__not-found {
    display: flex;
    justify-content: center;
    font-weight: 500;
    font-size: 30px;
    margin: 20px;
  }
}
.film-content {
}
.my-swiper {
  position: relative;
  width: 100%;
  height: 400px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  span {
    position: absolute;
    top: 10px;
    left: 30px;
    color: white;
    font-size: 35px;
    font-weight: 500;
  }
}
.swiper-news {
  margin-top: 10px;
  width: 80%;
  height: 300px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>