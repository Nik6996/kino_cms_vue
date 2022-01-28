<template>
  <div>
    <div class="vip">
      <div class="vip__content">
        <div class="vip__main-img"><img :src="img" alt="" /></div>
        <div class="vip__title">{{ name }}</div>
        <div class="vip__description">
          <span>{{ description }}</span>
        </div>

        <div class="vip__gallary">
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
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
SwiperCore.use([Autoplay, Pagination, Navigation]);
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      stocks: "",
      img: "",
      name: "",
      description: "",
      gallary: [],
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  async mounted() {
    await this.$store.dispatch("vipPage/load");
  },
  watch: {
    vip: {
      handler(vip) {
        this.img = vip.vipUa.mainImg.imgUrl;
        this.name = vip.vipUa.name;
        this.description = vip.vipUa.description;
        const gallary = vip.vipUa.gallary;

        gallary.forEach((item) => {
          this.gallary.push(item.url);
        });
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters({
      vip: "vipPage/getVip",
    }),
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.vip {
  &__content {
    width: 1300px;
    margin: 0 auto;

    padding: 30px;
  }

  &__main-img {
    margin: 0 auto;
    width: 900px;
    height: 400px;
    background-color: rosybrown;
    img {
      width: 900px;
      height: 400px;
      object-fit: cover;
    }
  }

  &__title {
    font-weight: 500;
    font-size: 30px;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }

  &__description {
    margin: 0 auto;
    width: 900px;
    span {
      display: flex;
      justify-content: center;
      margin-bottom: 100px;
      font-weight: 500;
    }
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