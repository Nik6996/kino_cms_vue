<template>
  <div>
    <div class="stock">
      <div class="stock__content">
        <div class="stock__main-img"><img :src="img" alt="" /></div>
        <div class="stock__title">{{ name }}</div>
        <div class="stock__description">
          <span>{{ description }}</span>
        </div>

        <div class="stock__gallary">
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
    await this.$store.dispatch("stock/loadStock");
    this.loadStock();
  },
  watch: {
    stocks: {
      handler(stock) {
        this.img = stock.stockUa.mainImg.imgUrl;
        this.name = stock.stockUa.name;
        this.description = stock.stockUa.description;
        const gallary = stock.stockUa.gallary;

        gallary.forEach((item) => {
          this.gallary.push(item.url);
        });
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters({
      stockList: "stock/getStock",
    }),
  },
  methods: {
    async loadStock() {
      const id = this.$route.params.id;

      await this.stockList.forEach((item) => {
        if (id == item.id) {
          this.stocks = item;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.stock {
  &__content {
    width: 1300px;
    margin: 0 auto;
    background-color: rgb(134, 134, 134);
    padding: 30px;
    border-radius: 10px;
  }

  &__main-img {
    margin: 0 auto;
    width: 700px;
    height: 400px;
    background-color: rosybrown;
    img {
      width: 700px;
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