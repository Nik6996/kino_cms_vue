<template>
  <div>
    <div v-if="isLoading" class="overlay"></div>
    <div class="top-banner-title">На главной верх</div>
    <div class="top-banner">
      <div class="top-banner__size">
        <p>Размер: 1000x190</p>
        <div class="top-banner__btn-slider">
          <label class="switch">
            <input
              v-model="formData.toggle"
              true-value="true"
              false-value="false"
              type="checkbox"
            />
            <span class="slider"></span>
          </label>
        </div>
      </div>

      <div class="top-banner__banners">
        <div class="top-banner__list">
          <div v-for="(banner, index) in formData.items" :key="index">
            <new-banner
              v-model="formData.items[index]"
              @deleteBanner="removeBanner(index)"
            />
          </div>
        </div>
        <button @click="createBanner" class="create-banner">Добавить</button>
      </div>
      <div class="top-banner__bottom-btns">
        <div class="top-banner__speed">
          <form action="formdata" method="post" name="form1">
            <p>
              Скорость вращения
              <select v-model="formData.interval" name="list1">
                <option>5с</option>
                <option>10с</option>
                <option>15с</option>
              </select>
            </p>
          </form>
        </div>
        <button @click="save" class="save" type="submit">Сохранить</button>
      </div>
    </div>
  </div>
</template>

<script>
import NewBanner from "@/components/banners/NewBanner.vue";
import { mapGetters } from "vuex";
import { cloneDeep } from "lodash/fp";

export default {
  data() {
    return {
      formData: {
        items: [],
        interval: "5c",
        toggle: "",
      },
    };
  },
  components: { NewBanner },

  computed: {
    ...mapGetters({
      isLoading: "bannersMainTop/isLoading",
      items: "bannersMainTop/items",
      interval: "bannersMainTop/interval",
      toggle: "bannersMainTop/toggle",
    }),
  },

  watch: {
    items: {
      handler(items) {
        this.formData.items = cloneDeep(items);
      },
    },
    interval: {
      handler(interval) {
        this.formData.interval = interval;
      },
    },
    toggle: {
      handler(toggle) {
        if (toggle === "true") {
          this.formData.toggle = true;
        }
        if (toggle === "false") {
          this.formData.toggle = false;
        }
      },
    },
  },

  mounted: function () {
    this.$store.dispatch("bannersMainTop/load");
  },

  methods: {
    createBanner() {
      const date = new Date().valueOf();
      this.formData.items.push({
        url: "",
        text: "",
        image: "",
        id: date,
      });
    },
    removeBanner(index) {
      this.formData.items.splice(index, 1);
    },
    save() {
      this.$store.dispatch("bannersMainTop/save", this.formData);
    },
  },
};
</script>

<style lang="scss" scoped>
.top-banner-title {
  display: flex;
  justify-content: center;
  font-size: 30px;
}
.top-banner {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 350px;
  margin-right: 30px;
  border: solid 2px black;
  border-radius: 20px;
  &__size {
    margin: 30px 0px 0px 20px;
    display: flex;
    justify-content: space-between;
  }

  &__btn-slider {
    margin: 0px 30px;
  }

  &__banners {
    display: flex;
  }

  &__list {
    display: flex;
    margin: 20px 20px 20px 70px;
    flex-wrap: wrap;
  }

  &__bottom-btns {
    position: relative;
    display: flex;
    margin: 20px 0px;
  }

  &__speed {
    margin: 0px 0px 0px 50px;
  }
}
.overlay {
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 3000px;
  background: rgba(32, 31, 31, 0.733);
}
.create-banner {
  position: relative;
  top: 20px;
  max-height: 50px;
}
.save {
  position: absolute;
  left: 45%;
  width: 140px;
  height: 40px;
  border-radius: 7px;
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