<template>
  <div>
    <div class="background-banner">
      <div class="background-banner__title">
        <p>Сквозной банер на заднем фоне</p>
      </div>
      <div class="background-banner__main">
        <div class="background-banner__size"><p>Размер: 2000x3000</p></div>
        <div class="background-banner__form">
          <div class="background-banner__radio">
            <p>
              <input
                value="Фото на фоне"
                v-model="item.radioBtn"
                class="background-banner__input"
                type="radio"
                id="photoOnBackground"
              />
              <label for="photoOnBackground">Фото на фоне</label>
            </p>
            <p>
              <input
                value="Просто фото"
                v-model="item.radioBtn"
                class="background-banner__input"
                type="radio"
                id="JustAPhoto"
              />
              <label for="JustAPhoto">Просто фото</label>
            </p>
          </div>
          <div class="background-banner__img">
            <label class="banner-img">
              <input
                ref="ImgInput"
                class="input-img"
                v-on:change="previewImg()"
                accept=".png, .jpg, .jpeg"
                type="file"
              />
              <img v-bind:src="imageSrc" alt="" />
            </label>
            <strong>{{ item.radioBtn }}</strong>
          </div>
          <div class="background-banner__btns">
            <button @click="save" class="background-banner__add">
              Добавить
            </button>
            <button @click="remove" class="background-banner__delete">
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
const defaultImg = require("@/assets/img/prevue.png");
export default {
  data() {
    return {
      item: {
        file: null,
        radioBtn: null,
      },
      fileUrl: null,
      urlStorage: null,
    };
  },
  mounted: function () {
    this.$store.dispatch("backgroundBanner/load");
  },

  computed: {
    imageSrc() {
      if (this.fileUrl) {
        return this.fileUrl;
      } else if (this.urlStorage) {
        return this.urlStorage;
      } else {
        return defaultImg;
      }
    },

    ...mapGetters({
      url: "backgroundBanner/getFile",
      radio: "backgroundBanner/getRadio",
    }),
  },
  watch: {
    url: {
      handler(url) {
        this.urlStorage = url;
      },
    },
    radio: {
      handler(radio) {
        this.item.radioBtn = radio;
      },
    },
  },

  methods: {
    save() {
      this.$store.dispatch("backgroundBanner/save", this.item);
    },
    remove() {
      this.$store.dispatch("backgroundBanner/remove");
      this.fileUrl = null;
      this.item.radioBtn = null;
      this.urlStorage = null;
    },

    previewImg() {
      if (!this.$refs.ImgInput || !this.$refs.ImgInput.files?.length) {
        this.file = null;
        this.fileUrl = null;
        return;
      }

      const file = this.$refs.ImgInput.files[0];
      const reader = new FileReader();

      reader.onload = (ev) => {
        this.item.file = file;
        this.fileUrl = ev.currentTarget.result;
      };

      reader.readAsDataURL(file);
    },
  },
};
</script>

<style  lang="scss" scoped>
.background-banner {
  margin: 30px 0px;
  &__title {
    display: flex;
    justify-content: center;
    font-size: 30px;
  }

  &__main {
    padding: 20px;
    border: solid 2px black;
    border-radius: 20px;
  }

  &__size {
  }

  &__form {
    display: flex;
    align-items: flex-start;
  }

  &__radio {
    display: flex;
    flex-direction: column;
    p {
      margin: 25px 0px;
    }
  }

  &__img {
    margin: 0px 30px;
  }

  &__btns {
  }

  &__add,
  &__delete {
    margin: 20px;
    padding: 0px 20px;
    border-radius: 10px;
  }
  &__input {
    margin-right: 10px;
  }
}
.banner-img {
  display: flex;
  justify-content: center;
  width: 130px;
  min-height: 80px;
  background: grey;
  border: solid 2px black;
  img {
    max-width: 130px;
    max-height: 80px;
  }
}
.input-img {
  display: none;
}
</style>