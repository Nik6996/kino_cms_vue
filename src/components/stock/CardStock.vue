<template>
  <div>
    <div v-if="isLoading" class="overlay">
      <div class="overlay__img">
        <span>Загрузка...</span>
        <img src="@/assets/img/overlay.gif" alt="" />
      </div>
    </div>
    <div class="stock">
      <div class="stock__header">
        <div v-if="stock.toggle == 'false'" class="stock__off">Выкл</div>
        <div v-else class="stock__on">Вкл</div>
        <div class="stock__btn-slider">
          <label class="switch">
            <input
              v-model="this.stock.toggle"
              true-value="true"
              false-value="false"
              type="checkbox"
            />
            <span class="slider"></span>
          </label>
        </div>
        <div class="stock__lang">
          <button
            v-bind:class="{ active: isActive }"
            @click="currentComponent = 'UaStock'"
            class="stock__ua"
          >
            Украинский
          </button>
          <button
            v-bind:class="{ active: !isActive }"
            @click="currentComponent = 'RuStock'"
            class="stock__ru"
          >
            Русский
          </button>
        </div>
      </div>

      <div class="stock__content">
        <keep-alive>
          <component
            :stockUa="stock.stockUa"
            :stockRu="stock.stockRu"
            :is="currentComponent"
            @removeGallaryUa="gallaryRemoveUa"
            @removeGallaryRu="gallaryRemoveRu"
          >
          </component>
        </keep-alive>
        <button @click="save()" class="stock__save">Сохранить</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UaStock from "@/components/stock/UaStock.vue";
import RuStock from "@/components/stock/RuStock.vue";

export default {
  data() {
    return {
      stock: {
        stockUa: {
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
        stockRu: {
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
      currentComponent: "UaStock",
      isActive: true,
    };
  },
  components: {
    UaStock,
    RuStock,
  },
  computed: {
    ...mapGetters({
      stockList: "stock/getStock",
      isLoading: "stock/getIsLoading",
    }),
  },
  watch: {
    currentComponent: {
      handler(data) {
        if (data == "UaStock") {
          this.isActive = true;
        } else {
          this.isActive = false;
        }
      },
    },
  },
  async mounted() {
    if (!this.stock.id) {
      (this.stock.id = this.$route.params.id) ||
        (this.stock.id = new Date().valueOf());
    }
    if (this.$route.params.id) {
      this.loadStock();
      if (!this.stockList.length) {
        await this.$store.dispatch("stock/loadStock");
        this.loadStock();
      }
    }
  },
  methods: {
    gallaryRemoveUa(id) {
      this.stock.stockUa.idGallaryRemove.push(id);
    },
    gallaryRemoveRu(id) {
      this.stock.stockRu.idGallaryRemove.push(id);
    },
    async loadStock() {
      const id = this.$route.params.id;
      await this.stockList.forEach((stock) => {
        if (id == stock.id) {
          this.stock = stock;
        }
      });
    },
    async save() {
      await this.dateAdd();
      await this.$store.dispatch("stock/saveStock", this.stock);
      this.$router.push("/stock");
    },
    async dateAdd() {
      if (!this.stock.stockUa.date) {
        this.stock.stockUa.date = new Date();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.stock {
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