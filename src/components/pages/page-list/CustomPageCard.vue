<template>
  <div>
    <div class="card-page">
      <div class="card-page__header">
        <div v-if="custom.toggle == 'false'" class="card-page__off">Выкл</div>
        <div v-else class="card-page__on">Вкл</div>
        <div class="card-page__btn-slider">
          <label class="switch">
            <input
              v-model="this.custom.toggle"
              true-value="true"
              false-value="false"
              type="checkbox"
            />
            <span class="slider"></span>
          </label>
        </div>
        <div class="card-page__lang">
          <button
            v-bind:class="{ active: isActive }"
            @click="currentComponent = 'CustomPageUa'"
            class="card-page__ua"
          >
            Украинский
          </button>
          <button
            v-bind:class="{ active: !isActive }"
            @click="currentComponent = 'CustomPageRu'"
            class="card-page__ru"
          >
            Русский
          </button>
        </div>
      </div>
      <div class="card-page__content">
        <keep-alive>
          <component
            @removeGallaryUa="getIdRemoveGallaryUa"
            @removeGallaryRu="getIdRemoveGallaryRu"
            :customUa="custom.customUa"
            :customRu="custom.customRu"
            :is="currentComponent"
          ></component>
        </keep-alive>
        <!-- <router-link :to="{name:'pagesHome', params:{toggle: this.custom.toggle}}"></router-link> -->
        <button @click="save()" class="card-page__save">Сохранить</button>
      </div>
    </div>
  </div>
</template>

<script>
import CustomPageUa from "@/components/pages/page-list/CustomPageUa.vue";
import CustomPageRu from "@/components/pages/page-list/CustomPageRu.vue";
export default {
  data() {
    return {
      custom: {
        customUa: {
          name: "",
          description: "",
          mainImg: {
            id: "",
            img: "",
            imgUrl: "",
            localUrl: "",
          },
          gallary: [],
          seoUrl: "",
          seoTitle: "",
          seoKeywords: "",
          seoDescription: "",
          idGallaryRemove: [],
        },
        customRu: {
          name: "",
          description: "",
          mainImg: {
            id: "",
            img: "",
            imgUrl: "",
            localUrl: "",
          },
          gallary: [],
          seoUrl: "",
          seoTitle: "",
          seoKeywords: "",
          seoDescription: "",
          idGallaryRemove: [],
        },
        toggle: true,
        date: new Date().toLocaleDateString(),
        id: "",
      },
      isActive: true,
      currentComponent: "CustomPageUa",
    };
  },
  components: {
    CustomPageUa,
    CustomPageRu,
  },
  watch: {
    currentComponent: {
      handler(data) {
        if (data == "CustomPageUa") {
          this.isActive = true;
        } else {
          this.isActive = false;
        }
      },
    },
  },
  async mounted() {
    console.log(this.$route.params.id);
    if (this.$route.params.id) {
      this.custom.id = this.$route.params.id;
      const customPages = this.$store.getters[`customPage/getCustom`];
      await customPages.forEach((item) => {
        if (item.id == this.custom.id) {
          this.custom = item;
        }
      });
    } else {
      this.custom.id = new Date().valueOf();
    }
    // await this.$store.dispatch("customPage/load");
    // if (this.$store.getters[`customPage/getCustom`]) {

    //   this.custom = this.$store.getters[`customPage/getCustom`];
    // }
  },
  methods: {
    async save() {
      await this.$store.dispatch("customPage/save", this.custom);
      this.$router.push("/pages");
    },
    getIdRemoveGallaryUa(id) {
      console.log(id);
      this.custom.customUa.idGallaryRemove.push(id);
    },
    getIdRemoveGallaryRu(id) {
      console.log(id);
      this.custom.customRu.idGallaryRemove.push(id);
    },
  },
};
</script>

<style lang="scss" scoped>
.card-page {
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