<template>
  <div>
    <div class="card-page">
      <div class="card-page__content">
        <div class="card-page__header">
          <div class="card-page__name">
            <span>Назва</span>
            <input
              v-model="advertisingUa.name"
              placeholder="Назва"
              type="text"
            />
          </div>
        </div>
        <div class="card-page__description">
          <span>Опис</span>
          <textarea
            v-model="advertisingUa.description"
            placeholder="Опис"
          ></textarea>
        </div>
        <div class="card-page__main-img">
          <span>Головна картинка</span>
          <label class="card-page__lable-main">
            <input
              accept=".png, .jpg, .jpeg"
              class="card-page__img-main"
              ref="mainImg"
              @change="previewMain()"
              type="file"
            />
            <img :src="imageSrc" alt="" />
          </label>
          <button @click="imgMainRemove()" class="card-page__remove-main-img">
            Видалити
          </button>
        </div>
        <div class="card-page__gallary gallary">
          <span class="gallary__title">Галерея картинок</span>
          <div class="gallary__main">
            <div class="gallary__size">Розмiр 1000x190</div>
            <div class="gallary__list">
              <div v-for="(img, index) in gallary" :key="img.id">
                <gallary-img
                  @removeGallaryId="gallaryRemove"
                  v-model="gallary[index]"
                />
              </div>
            </div>
            <label class="btn bg-olive margin" for="clearImgGallay">
              <span>Додати</span>
            </label>
            <input
              accept=".png, .jpg, .jpeg"
              type="file"
              ref="InputImgGallary"
              class="img-input"
              v-on:change="addImageGallery()"
              id="clearImgGallay"
            />
          </div>
        </div>

        <div class="card-page__seo">
          <div class="card-page__seo-block">
            <span>SEO блок:</span>
            <div class="card-page__seo-input">
              <p>
                URL:
                <input
                  v-model="advertisingUa.seoUrl"
                  type="text"
                  placeholder="URL"
                />
              </p>
              <p>
                Title:
                <input
                  v-model="advertisingUa.seoTitle"
                  type="text"
                  placeholder="Title"
                />
              </p>
              <p class="keywords">
                Keywords:
                <input
                  v-model="advertisingUa.seoKeywords"
                  type="text"
                  placeholder="word"
                />
              </p>
              <p class="card-page__seo-description">
                Description:<textarea
                  v-model="advertisingUa.seoDescription"
                  class="card-page__seo-description-textarea"
                  placeholder="Description"
                ></textarea>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const defaultImg = require("@/assets/img/prevue.png");

import GallaryImg from "@/components/cinemas/GallaryImg.vue";

export default {
  data() {
    return {
      // mainImg: {
      //   file: "",
      //   url: "",
      //   id: "",
      //   mainLocal: "",
      // },
      gallary: this.advertisingUa.gallary,
    };
  },
  components: {
    GallaryImg,
  },
  props: {
    advertisingUa: {
      type: Object,
    },
  },
  computed: {
    imageSrc() {
      if (this.advertisingUa.mainImg.localUrl) {
        return this.advertisingUa.mainImg.localUrl;
      }
      if (this.advertisingUa.mainImg.imgUrl) {
        return this.advertisingUa.mainImg.imgUrl;
      } else {
        return defaultImg;
      }
    },
  },
  watch: {
    advertisingUa: {
      handler(advertisingUa) {
        this.gallary = advertisingUa.gallary;
      },
    },
  },
  methods: {
    gallaryRemove(id) {
      this.$emit("removeGallaryUa", id);
      console.log(id);
    },

    previewMain() {
      if (!this.$refs.mainImg || !this.$refs.mainImg.files?.length) {
        this.advertisingUa.mainImg.img = "";
        this.advertisingUa.mainImg.localUrl = "";
        return;
      }
      const file = this.$refs.mainImg.files[0];
      const reader = new FileReader();
      this.advertisingUa.mainImg.img = file;
      reader.onload = (ev) => {
        if (!this.advertisingUa.mainImg.id) {
          this.advertisingUa.mainImg.id = new Date().valueOf();
        }
        this.advertisingUa.mainImg.localUrl = ev.currentTarget.result;
      };
      reader.readAsDataURL(file);
    },
    async addImageGallery() {
      await this.gallary.push({
        image: this.$refs.InputImgGallary.files[0],
        id: new Date().valueOf(),
        url: "",
      });
      document.getElementById("clearImgGallay").value = "";
    },
    imgMainRemove() {
      this.mainImg.file = "";
      this.advertisingUa.mainImg.url = "";
      this.advertisingUa.mainImg.mainLocal = "";
      this.advertisingUa.mainImg.img = "";
      this.mainImg.id = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.card-page {
  margin-top: 40px;
  &__content {
  }

  &__header {
    display: flex;
    justify-content: space-between;
  }

  &__name {
    margin-bottom: 40px;
    span {
      font-weight: 500;
      margin-right: 30px;
    }
    input {
      width: 400px;
    }
  }

  &__description {
    display: flex;
    margin-bottom: 40px;
    span {
      font-weight: 500;
      margin-right: 40px;
    }
    textarea {
      width: 600px;
      height: 150px;
    }
  }

  &__main-img {
    display: flex;
    align-items: center;
    span {
      font-weight: 500;
    }
  }

  &__lable-main {
    margin: 20px 50px;
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

  &__img-main {
    display: none;
  }

  &__remove-main-img {
    margin: 0px 20px;
    border-radius: 7px;
    width: 120px;
    background-color: rgb(226, 97, 97);
  }

  &__seo {
    display: flex;
    justify-content: center;
    margin: 30px 0;
  }

  &__seo-block {
    display: flex;

    span {
      margin-right: 100px;
      font-weight: 500;
    }
  }

  &__seo-input {
    width: 800px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    p {
      display: flex;
    }
    input {
      width: 600px;
    }
  }

  &__seo-description {
    display: flex;
    position: relative;
    left: -50px;
  }

  &__seo-description-textarea {
    width: 600px;
    height: 70px;
  }
}
.gallary {
  &__title {
    font-weight: 500;
  }
  &__main {
    display: flex;
    align-items: center;
  }

  &__size {
    margin-right: 20px;
  }

  &__list {
    display: flex;
    height: 150px;
    align-items: center;
    margin: 0px 20px;
  }
}

.img-input {
  display: none;
}
.keywords {
  position: relative;
  left: -38px;
}
</style>