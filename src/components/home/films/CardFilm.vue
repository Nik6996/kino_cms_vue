<template>
  <div>
    <div class="film">
      <div class="film__content">
        <div class="film__trailer">
          <iframe
            width="1300"
            height="500"
            :src="video"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <div class="film__header">
          <div class="film__title">Расписание сеансов кинотеатра</div>
          <div class="film__city">
            <select class="film__town-list">
              <option disabled value="">Выберите город</option>
              <option>Киев</option>
              <option>Одесса</option>
              <option>Харьков</option>
            </select>
          </div>
          <div class="film__block">Все</div>
          <div class="film__block">3D</div>
          <div class="film__block">2D</div>
        </div>
        <div class="film__main">
          <div class="film__main-img"><img :src="mainImg" alt="" /></div>
          <div>
            <button>Купить</button>
            <div class="film__name">{{ name }}</div>
            <div class="film__description">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore
              sequi deleniti nulla fuga alias explicabo porro accusantium
              excepturi optio maxime voluptate iusto blanditiis dolorum
              architecto ullam velit voluptatibus, sint eos. Necessitatibus
              officiis inventore saepe qui odio recusandae tempora iste dolorem
              delectus cum, ducimus nihil nesciunt, ab atque temporibus
              explicabo illum aliquid, nam commodi autem. Reiciendis tempore
              porro dolorem quam amet! Consequuntur nulla quae minima dolor
              quidem maiores quos dicta mollitia esse sunt sint fugit molestias
              saepe odit deserunt id tempora quasi, aliquid vel molestiae qui?
              Officia, labore! At, blanditiis beatae?
            </div>
          </div>
        </div>
        <div class="film__footer">
          <div class="film__info-img">
            <img src="@/assets/img/decription-film.png" alt="" />
          </div>

          <div class="film__gallary">
            <span>Кадры и постеры</span>
            <div>
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
      gallary: [],
      film: "",
      mainImg: "",
      name: "",
      video: "",
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },

  computed: {
    ...mapGetters({
      films: "film/getFilms",
    }),
  },
  watch: {
    film: {
      handler(film) {
        this.name = film.itemUa.nameFilm;
        this.mainImg = film.itemUa.mainImgUrl.url;
        this.video = film.itemUa.refTrailer;
        const gallary = film.itemUa.galleryImgUrl;

        gallary.forEach((item) => {
          this.gallary.push(item.imageStorage);
        });
      },
      deep: true,
    },
  },
  async created() {
    await this.$store.dispatch("film/loadFims");
    if (this.$route.params.id) {
      await this.loadFilm();
    } else {
      console.log("false");
    }
  },
  methods: {
    async loadFilm() {
      const routeId = this.$route.params.id;

      this.films.forEach((film) => {
        if (routeId == film.id) {
          this.film = film;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.film {
  width: 1300px;
  margin: 0 auto;
  &__content {
  }

  &__trailer {
    background-color: rgb(143, 142, 142);
  }

  &__header {
    margin-top: 20px;
    justify-content: center;
    display: flex;
    align-items: center;
  }

  &__title {
    margin-right: 20px;
    font-weight: 500;
    font-size: 20px;
  }

  &__city {
    margin-right: 20px;
  }

  &__town-list {
  }

  &__block {
    width: 70px;
    height: 40px;
    border: solid 1px black;
    cursor: pointer;
    margin: 0px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__main {
    margin-top: 40px;
    display: flex;
    justify-content: space-around;
    button {
      margin: 0 auto;
      width: 200px;
      height: 40px;
      background-color: green;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 15px;
    }
  }

  &__main-img {
    width: 300px;
    height: 300px;
    //  background-color: cadetblue;
    img {
      width: 300px;
      height: 300px;
      object-fit: cover;
    }
  }

  &__name {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    font-size: 20px;
    font-weight: 500;
  }

  &__description {
    margin-top: 100px;
    max-width: 700px;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
  }

  &__info-img {
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
  }
}
</style>