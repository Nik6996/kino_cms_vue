<template>
  <div>
    <div class="card-page">
      <div class="card-page__header">
        <div v-if="vip.toggle == 'false'" class="card-page__off">Выкл</div>
        <div v-else class="card-page__on">Вкл</div>
        <div class="card-page__btn-slider">
          <label class="switch">
            <input
              v-model="this.vip.toggle"
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
            @click="currentComponent = 'VipUa'"
            class="card-page__ua"
          >
            Украинский
          </button>
          <button
            v-bind:class="{ active: !isActive }"
            @click="currentComponent = 'VipRu'"
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
            :vipUa="vip.vipUa"
            :vipRu="vip.vipRu"
            :is="currentComponent"
          ></component>
        </keep-alive>
        <!-- <router-link :to="{name:'pagesHome', params:{toggle: this.vip.toggle}}"></router-link> -->
        <button @click="save()" class="card-page__save">Сохранить</button>
      </div>
    </div>
  </div>
</template>

<script>
import VipUa from "@/components/pages/page-list/vip-hall-page/VipUa.vue";
import VipRu from "@/components/pages/page-list/vip-hall-page/VipRu.vue";
export default {
  data() {
    return {
      vip: {
        vipUa: {
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
        vipRu: {
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
        date: "",
      },
      isActive: true,
      currentComponent: "VipUa",
    };
  },
  components: {
    VipUa,
    VipRu,
  },
  watch: {
    currentComponent: {
      handler(data) {
        if (data == "VipUa") {
          this.isActive = true;
        } else {
          this.isActive = false;
        }
      },
    },
  },
  async mounted() {
    await this.$store.dispatch("vipPage/load");
    if (this.$store.getters[`vipPage/getVip`]) {
      this.vip = this.$store.getters[`vipPage/getVip`];
    }
  },
  methods: {
    async save() {
      await (this.vip.date = new Date().toLocaleDateString());
      await this.$store.dispatch("vipPage/save", this.vip);
      this.$router.push("/pages");
    },
    getIdRemoveGallaryUa(id) {
      console.log(id);
      this.vip.vipUa.idGallaryRemove.push(id);
    },
    getIdRemoveGallaryRu(id) {
      console.log(id);
      this.vip.vipRu.idGallaryRemove.push(id);
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