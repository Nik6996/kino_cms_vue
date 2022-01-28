<template>
  <div>
    <div class="hall">
      <div class="hall__content">
        <div class="hall__main-img"><img :src="banner" alt="" /></div>
        <div class="hall__row">
          <div class="hall__column1">
            <span>Сеанс 1</span>
            <span>Сеанс 2</span>
            <span>Сеанс 3</span>
            <span>Сеанс 4</span>
            <span>Сеанс 5</span>
          </div>
          <div class="hall__column">
            <div class="hall__title">Зал {{ number }}</div>
            <div class="hall__description">{{ description }}</div>
            <div class="hall__title">Карта зала</div>
            <div class="hall__layout"><img :src="layout" alt="" /></div>
            <div class="hall__title">Фотогалерея</div>
            <div class="hall__gallary">
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
                class="hall__swiper"
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
      hall: "",
      banner: "",
      number: "",
      description: "",
      layout: "",
      gallary: [],
    };
  },
  watch: {
    hall: {
      handler(hall) {
        this.banner = hall.hallUa.banner.imgUrl;
        this.number = hall.hallUa.number;
        this.layout = hall.hallUa.layout.imgUrl;
        this.description = hall.hallUa.description;

        const gallary = hall.hallUa.gallary;
        gallary.forEach((item) => {
          this.gallary.push(item.url);
        });
      },
      deep: true,
    },
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  async mounted() {
    await this.$store.dispatch("cinema/loadCinema");
    const id = this.$route.params.id;

    await this.halls.forEach((hall) => {
      if (id == hall.id) {
        this.hall = hall;
      }
    });
  },
  computed: {
    ...mapGetters({
      halls: "cinema/getHalls",
    }),
  },
};
</script>

<style lang="scss" scoped>
.hall {
  &__content {
    width: 1300px;
    margin: 0 auto;
  }

  &__main-img {
    width: 100%;
    height: 500px;
    background-color: rosybrown;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 500px;
      object-fit: cover;
    }
  }

  &__row {
    display: flex;
    justify-content: space-between;
  }

  &__column1 {
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 200px;
      height: 40px;
      border: solid 1px black;
    }
  }
  &__column {
    width: 100%;
    margin: 0px 30px;
  }

  &__title {
    font-weight: 500;
    font-size: 30px;
    margin: 20px;
    display: flex;
    justify-content: center;
  }

  &__description {
    padding: 10px;
  }

  &__layout {
    margin: 0 auto;
    width: 70%;
    height: 400px;
    background-color: rosybrown;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 400px;
      object-fit: cover;
    }
  }

  &__gallary {
    width: 700px;
    height: 400px;
    img {
      width: 700px;
      height: 400px;
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