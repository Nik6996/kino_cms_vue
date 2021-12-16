<template>
  <div>
    <div class="hall">
      <div class="hall__number">
        <span>Номер зала</span>
        <input v-model="hallRu.number" type="text" placeholder="Номер зала" />
      </div>
      <div class="hall__description">
        <span>Описание зала</span>
        <textarea
          v-model="hallRu.description"
          type="text"
          placeholder="Описание зала"
        />
      </div>
      <div class="hall__layout">
        <span>Схема зала</span>
        <label class="hall__img-layout">
          <input
            ref="imgLayout"
            class="hall__img"
            accept=".png, .jpg, .jpeg"
            @change="previewLayout()"
            type="file"
          />
          <img :src="layoutSrc" alt="" />
        </label>
        <button @click="layoutRemove()" class="hall__layout-remove">
          Удалить
        </button>
      </div>

      <div class="hall__banner-img">
        <span>Верхний баннер</span>
        <label class="hall__img-banner"
          ><input
            ref="imgBanner"
            class="hall__img"
            accept=".png, .jpg, .jpeg"
            @change="previewBanner()"
            type="file" />
          <img :src="bannerSrc" alt=""
        /></label>
        <button @click="bannerRemove()" class="hall__banner-remove">
          Удалить
        </button>
      </div>

      <div class="hall__gallary gallary">
        <p class="gallary__title">Галерея картинок</p>
        <div class="gallary__main">
          <span class="gallary__size">Размер: 1000x190</span>
          <div class="gallary__list-img">
            <div v-for="(img, index) in gallary" :key="img.id">
              <gallary-img
                @removeGallaryId="deleteGallaryImg"
                v-model="gallary[index]"
                ref="imgGallary"
              />
            </div>
          </div>

          <label class="btn bg-olive margin" for="clearImgGallay">
            <span>Добавить</span>
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

        <div class="hall__seo">
          <div class="hall__seo-block">
            <span>SEO блок:</span>
            <div class="hall__seo-input">
              <p>
                URL:
                <input v-model="hallRu.seoUrl" type="text" placeholder="URL" />
              </p>
              <p>
                Title:
                <input
                  v-model="hallRu.seoTitle"
                  type="text"
                  placeholder="Title"
                />
              </p>
              <p class="keywords">
                Keywords:
                <input
                  v-model="hallRu.seoKeywords"
                  type="text"
                  placeholder="word"
                />
              </p>
              <p class="description">
                Description:<textarea
                  v-model="hallRu.seoDescription"
                  class="description-textarea"
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
      layoutImg: {
        layoutFile: "",
        layoutUrl: "",
        layoutId: this.hallRu.layout.id,
        layoutLocalUrl: this.hallRu.layout.layoutLocal,
      },
      bannerImg: {
        bannerFile: "",
        bannerUrl: "",
        bannerId: this.hallRu.banner.id,
        bannerLocalUrl: this.hallRu.banner.bannerLocal,
      },
      gallary: this.hallRu.gallary,
      gallaryUrl: "",
    };
  },
  components: {
    GallaryImg,
  },
  props: {
    hallRu: {
      type: Object,
    },
  },

  watch: {
    hallRu: {
      handler(hallRu) {
        this.gallary = hallRu.gallary;
      },
    },
  },

  computed: {
    layoutSrc() {
      if (this.hallRu.layout.layoutLocal) {
        return this.hallRu.layout.layoutLocal;
      }
      if (this.hallRu.layout.imgUrl) {
        return this.hallRu.layout.imgUrl;
      } else {
        return defaultImg;
      }
    },
    bannerSrc() {
      if (this.hallRu.banner.bannerLocal) {
        return this.hallRu.banner.bannerLocal;
      }
      if (this.hallRu.banner.imgUrl) {
        return this.hallRu.banner.imgUrl;
      } else {
        return defaultImg;
      }
    },
  },
  methods: {
    deleteGallaryImg(id) {
      this.$emit("deleteGallaryImgRu", id);
    },
    layoutRemove() {
      this.layoutImg.layoutFile = "";
      this.layoutImg.layoutUrl = "";
      this.layoutImg.layoutId = "";
      this.hallRu.layout.layoutLocal = "";
    },
    bannerRemove() {
      this.bannerImg.bannerFile = "";
      this.bannerImg.bannerUrl = "";
      this.bannerImg.bannerId = "";
      this.hallRu.banner.bannerLocal = "";
    },
    previewLayout() {
      if (!this.$refs.imgLayout || !this.$refs.imgLayout.files?.length) {
        this.layoutImg.layoutFile = "";
        this.layoutImg.layoutLocalUrl = "";
        return;
      }

      const file = this.$refs.imgLayout.files[0];
      const reader = new FileReader();
      this.hallRu.layout.img = file;
      reader.onload = (ev) => {
        this.layoutImg.layoutFile = file;
        this.hallRu.layout.id = new Date().valueOf();
        //this.layoutImg.layoutLocalUrl = ev.currentTarget.result;
        this.hallRu.layout.layoutLocal = ev.currentTarget.result;
      };
      reader.readAsDataURL(file);
    },
    previewBanner() {
      if (!this.$refs.imgBanner || !this.$refs.imgBanner.files?.length) {
        this.bannerImg.bannerFile = "";
        this.bannerImg.bannerLocalUrl = "";
        return;
      }

      const file = this.$refs.imgBanner.files[0];
      const reader = new FileReader();
      this.hallRu.banner.img = file;
      reader.onload = (ev) => {
        this.bannerImg.bannerFile = file;
        this.hallRu.banner.id = new Date().valueOf();
        this.hallRu.banner.bannerLocal = ev.currentTarget.result;
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
  },
};
</script>

<style lang="scss" scoped>
.hall {
  &__number {
    display: flex;
    height: 30px;
    span {
      margin-right: 10px;
    }
  }

  &__description {
    margin-top: 20px;
    display: flex;
    width: 100%;
    height: 100px;
    textarea {
      width: 100%;
      margin-left: 10px;
    }
  }

  &__layout,
  &__banner-img {
    display: flex;
    align-items: center;
    span {
      font-weight: 500;
    }
  }

  &__img-layout,
  &__img-banner {
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

  &__img {
    display: none;
  }

  &__layout-remove,
  &__banner-remove {
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

  &__list-img {
    display: flex;
    height: 150px;
    align-items: center;
    margin: 0px 20px;
  }
}

.description {
  display: flex;
  position: relative;
  left: -50px;
}
.description-textarea {
  width: 600px;
  height: 70px;
}
.keywords {
  position: relative;
  left: -38px;
}
.img-input {
  display: none;
}
</style>