<template>
  <div>
    <div v-if="this.mainPage === '/'">
      <div v-if="this.toggle === 'true'">
        <swiper
          :spaceBetween="30"
          :centeredSlides="true"
          :autoplay="{
            delay: interval,
            disableOnInteraction: false,
          }"
          class="my-swiper"
        >
          >
          <swiper-slide v-for="(img, index) in bannerTop" :key="index"
            ><img :src="bannerTop[index]" alt=""
          /></swiper-slide>
        </swiper>
      </div>
    </div>
    <div class="header">
      <header-home @searchFilms="searchFilms" />
      <div v-if="this.mainPage === '/'"><img :src="this.mainImg" alt="" /></div>
    </div>

    <div class="content">
      <router-view :filmSearch="filmSearch"></router-view>
    </div>
    <footer-home />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import HeaderHome from "@/components/home/HeaderHome.vue";
import FooterHome from "@/components/home/FooterHome.vue";
import { Swiper, SwiperSlide } from "swiper/vue";

// swiper bundle styles
import "swiper/swiper-bundle.min.css";

// swiper core styles
import "swiper/swiper.min.css";

import SwiperCore, { Autoplay } from "swiper";
SwiperCore.use([Autoplay]);
export default {
  data() {
    return {
      bannerTop: [],
      mainPage: "/",
      filmSearch: "",
    };
  },
  computed: {
    ...mapGetters({
      topSlige: "bannersMainTop/items",
      interval: "bannersMainTop/intervalHome",
      toggle: "bannersMainTop/toggle",
      mainImg: "backgroundBanner/getFile",
    }),
  },
  components: {
    HeaderHome,
    FooterHome,
    Swiper,
    SwiperSlide,
  },

  watch: {
    $route: {
      handler(route) {
        this.mainPage = route.path;
      },
    },
  },

  async mounted() {
    this.mainPage = this.$route.path;

    await this.$store.dispatch("bannersMainTop/load");
    await this.$store.dispatch("backgroundBanner/load");
    await this.topSlige.forEach((slide) => {
      const img = slide.image;
      this.bannerTop.push(img);
    });
  },
  methods: {
    searchFilms(search) {
      console.log(search);
      this.filmSearch = search;
    },
  },
  // setup() {
  //   const onSwiper = (swiper) => {
  //     console.log(swiper);
  //   };
  //   const onSlideChange = () => {
  //     console.log("slide change");
  //   };
  //   return {
  //     onSwiper,
  //     onSlideChange,
  //     modules: [Autoplay],
  //   };
  // },
};
</script>

<style lang="scss" scoped>
.content {
  padding: 20px;
}
.my-swiper {
  background-color: burlywood;
  height: 140px;
  position: relative;
  z-index: -1;
  img {
    width: 100%;
  }
}
.header {
  position: relative;
  img {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: -2;
  }
}
</style>