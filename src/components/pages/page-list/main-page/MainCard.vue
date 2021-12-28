<template>
  <div>
    <div class="main-card">
      <div class="main-card__header">
        <div v-if="main.toggle == 'false'" class="main-card__off">Выкл</div>
        <div v-else class="main-card__on">Вкл</div>
        <div class="main-card__btn-slider">
          <label class="switch">
            <input
              v-model="this.main.toggle"
              true-value="true"
              false-value="false"
              type="checkbox"
            />
            <span class="slider"></span>
          </label>
        </div>
        <div class="main-card__lang">
          <button
            v-bind:class="{ active: isActive }"
            @click="currentComponent = 'MainUa'"
            class="main-card__ua"
          >
            Украинский
          </button>
          <button
            v-bind:class="{ active: !isActive }"
            @click="currentComponent = 'MainRu'"
            class="main-card__ru"
          >
            Русский
          </button>
        </div>
      </div>
      <div class="main-card__content">
        <keep-alive>
          <component
            :mainUa="main.mainUa"
            :mainRu="main.mainRu"
            :is="currentComponent"
          ></component>
        </keep-alive>
        <button @click="save()" class="main-card__save">Сохранить</button>
      </div>
    </div>
  </div>
</template>

<script>
import MainUa from "@/components/pages/page-list/main-page/MainUa.vue";
import MainRu from "@/components/pages/page-list/main-page/MainRu.vue";
//const mainStore = this.$store.getters[`mainPage/getMain`];
export default {
  data() {
    return {
      main: {
        mainUa: {
          phone1: "",
          phone2: "",
          seoText: "",
          seoUrl: "",
          seoTitle: "",
          seoKeywords: "",
          seoDescription: "",
        },
        mainRu: {
          phone1: "",
          phone2: "",
          seoText: "",
          seoUrl: "",
          seoTitle: "",
          seoKeywords: "",
          seoDescription: "",
        },
        toggle: true,
        id: "",
        date: "",
      },
      isActive: true,
      currentComponent: "MainUa",
    };
  },
  components: {
    MainUa,
    MainRu,
  },
  async mounted() {
    await this.$store.dispatch("mainPage/loadMainPage");
    if (this.$store.getters[`mainPage/getMain`]) {
      this.main = this.$store.getters[`mainPage/getMain`];
    } else {
      this.main.id = new Date().valueOf();
    }
  },
  watch: {
    currentComponent: {
      handler(data) {
        if (data == "MainUa") {
          this.isActive = true;
        } else {
          this.isActive = false;
        }
      },
    },
  },
  methods: {
    async save() {
      await (this.main.date = new Date().toLocaleDateString());
      await this.$store.dispatch("mainPage/saveMainPage", this.main);
      this.$router.push("/pages");
    },
  },
};
</script>

<style lang="scss" scoped>
.main-card {
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
</style>