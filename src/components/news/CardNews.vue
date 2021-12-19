<template>
  <div>
    <div v-if="isLoading" class="overlay">
      <div class="overlay__img">
        <span>Загрузка...</span>
        <img src="@/assets/img/overlay.gif" alt="" />
      </div>
    </div>
    <div class="news">
      <div class="news__header">
        <div v-if="news.toggle == 'false'" class="news__off">Выкл</div>
        <div v-else class="news__on">Вкл</div>
        <div class="news__btn-slider">
          <label class="switch">
            <input
              v-model="this.news.toggle"
              true-value="true"
              false-value="false"
              type="checkbox"
            />
            <span class="slider"></span>
          </label>
        </div>
        <div class="news__lang">
          <button
            v-bind:class="{ active: isActive }"
            @click="currentComponent = 'UaNews'"
            class="news__ua"
          >
            Украинский
          </button>
          <button
            v-bind:class="{ active: !isActive }"
            @click="currentComponent = 'RuNews'"
            class="news__ru"
          >
            Русский
          </button>
        </div>
      </div>

      <div class="news__content">
        <keep-alive>
          <component
            :newsUa="news.newsUa"
            :newsRu="news.newsRu"
            :is="currentComponent"
            @removeGallaryUa="gallaryRemoveUa"
            @removeGallaryRu="gallaryRemoveRu"
          >
          </component>
        </keep-alive>
        <button @click="save()" class="news__save">Сохранить</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UaNews from "@/components/news/UaNews.vue";
import RuNews from "@/components/news/RuNews.vue";

export default {
  data() {
    return {
      news: {
        newsUa: {
          name: "",
          date: "",
          description: "",
          mainImg: {
            img: "",
            imgUrl: "",
            id: "",
            mainLocal: "",
          },
          gallary: [],
          refVideo: "",
          seoUrl: "",
          seoTitle: "",
          seoKeywords: "",
          seoDescription: "",
          idGallaryRemove: [],
        },
        newsRu: {
          name: "",
          date: "",
          description: "",
          mainImg: {
            img: "",
            imgUrl: "",
            id: "",
            mainLocal: "",
          },
          gallary: [],
          refVideo: "",
          seoUrl: "",
          seoTitle: "",
          seoKeywords: "",
          seoDescription: "",
          idGallaryRemove: [],
        },
        id: "",
        toggle: true,
      },
      currentComponent: "UaNews",
      isActive: true,
    };
  },
  components: {
    UaNews,
    RuNews,
  },
  computed: {
    ...mapGetters({
      newsList: "news/getNews",
      isLoading: "news/getIsLoading",
    }),
  },
  watch: {
    currentComponent: {
      handler(data) {
        if (data == "UaNews") {
          this.isActive = true;
        } else {
          this.isActive = false;
        }
      },
    },
  },
  async mounted() {
    if (!this.news.id) {
      (this.news.id = this.$route.params.id) ||
        (this.news.id = new Date().valueOf());
    }
    if (this.$route.params.id) {
      this.loadNews();
      if (!this.newsList.length) {
        await this.$store.dispatch("news/loadNews");
        this.loadNews();
      }
    }
  },
  methods: {
    gallaryRemoveUa(id) {
      this.news.newsUa.idGallaryRemove.push(id);
    },
    gallaryRemoveRu(id) {
      this.news.newsRu.idGallaryRemove.push(id);
    },
    async loadNews() {
      const id = this.$route.params.id;
      await this.newsList.forEach((news) => {
        if (id == news.id) {
          this.news = news;
        }
      });
    },
    async save() {
      await this.dateAdd();
      await this.$store.dispatch("news/saveNews", this.news);
      this.$router.push("/news");
    },
    async dateAdd() {
      if (!this.news.newsUa.date) {
        this.news.newsUa.date = new Date();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.news {
  margin-top: 120px;
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
  &__btn-slider {
    margin: 0px 30px;
  }
  &__header {
    display: flex;
    justify-content: flex-end;
  }

  &__off,
  &__on {
    font-weight: 500;
    padding-top: 5px;
  }
  &__save {
    border-radius: 5px;
    display: flex;
    justify-content: center;
    margin: 30px auto;
  }
}

.active {
  background-color: rgb(121, 120, 120);
}
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  input:checked + .slider {
    background-color: #01dd01;
  }
}
.slider {
  border-radius: 34px;
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  transition: 0.4s;
  border-radius: 50%;
}
input:checked + .slider:before {
  transform: translateX(26px);
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