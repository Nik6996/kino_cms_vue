<template>
  <div>
    <div class="hall">
      <div class="hall__number">
        <span>Номер залу</span>
        <input v-model="hallUa.number" type="text" placeholder="Номер залу" />
      </div>
      <div class="hall__description">
        <span>Опис залу</span>
        <textarea
          v-model="hallUa.description"
          type="text"
          placeholder="Опис залу"
        />
      </div>
      <div class="hall__layout">
        <span>Схема зали</span>
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
          Видалити
        </button>
      </div>

      <div class="hall__banner-img">
        <span>Верхній банер</span>
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
          Видалити
        </button>
      </div>

      <div class="hall__gallary gallary">
        <p class="gallary__title">Галерея картинок</p>
        <div class="gallary__main">
          <span class="gallary__size">Размiр: 1000x190</span>
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

        <div class="hall__seo">
          <div class="hall__seo-block">
            <span>SEO блок:</span>
            <div class="hall__seo-input">
              <p>
                URL:
                <input v-model="hallUa.seoUrl" type="text" placeholder="URL" />
              </p>
              <p>
                Title:
                <input
                  v-model="hallUa.seoTitle"
                  type="text"
                  placeholder="Title"
                />
              </p>
              <p class="keywords">
                Keywords:
                <input
                  v-model="hallUa.seoKeywords"
                  type="text"
                  placeholder="word"
                />
              </p>
              <p class="description">
                Description:<textarea
                  v-model="hallUa.seoDescription"
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
        layoutId: this.hallUa.layout.id,
        layoutLocalUrl: this.hallUa.layout.layoutLocal,
      },
      bannerImg: {
        bannerFile: "",
        bannerUrl: "",
        bannerId: this.hallUa.banner.id,
        bannerLocalUrl: this.hallUa.banner.bannerLocal,
      },
      gallary: this.hallUa.gallary,
    };
  },
  components: {
    GallaryImg,
  },
  props: {
    hallUa: {
      type: Object,
    },
  },
  watch: {
    hallUa: {
      handler(hallUa) {
        this.gallary = hallUa.gallary;
      },
    },
  },

  computed: {
    layoutSrc() {
      if (this.hallUa.layout.layoutLocal) {
        return this.hallUa.layout.layoutLocal;
      }
      if (this.hallUa.layout.imgUrl) {
        return this.hallUa.layout.imgUrl;
        //console.log(this.nallUa.layout.imgUrl)
      } else {
        return defaultImg;
      }
    },
    bannerSrc() {
      if (this.hallUa.banner.bannerLocal) {
        return this.hallUa.banner.bannerLocal;
      }
      if (this.hallUa.banner.imgUrl) {
        return this.hallUa.banner.imgUrl;
      } else {
        return defaultImg;
      }
    },
  },
  methods: {
    deleteGallaryImg(id) {
      this.$emit("deleteGallaryImgUa", id);
    },
    layoutRemove() {
      this.layoutImg.layoutFile = "";
      this.layoutImg.layoutUrl = "";
      this.layoutImg.layoutId = "";
      this.hallUa.layout.layoutLocal = "";
    },
    bannerRemove() {
      this.bannerImg.bannerFile = "";
      this.bannerImg.bannerUrl = "";
      this.bannerImg.bannerId = "";
      this.hallUa.banner.bannerLocal = "";
    },
    previewLayout() {
      if (!this.$refs.imgLayout || !this.$refs.imgLayout.files?.length) {
        this.layoutImg.layoutFile = "";
        this.layoutImg.layoutLocalUrl = "";
        return;
      }

      const file = this.$refs.imgLayout.files[0];
      const reader = new FileReader();
      this.hallUa.layout.img = file;
      reader.onload = (ev) => {
        this.layoutImg.layoutFile = file;
        if (!this.hallUa.layout.id) {
          this.hallUa.layout.id = new Date().valueOf();
        }

        //this.layoutImg.layoutLocalUrl = ev.currentTarget.result;
        this.hallUa.layout.layoutLocal = ev.currentTarget.result;
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
      this.hallUa.banner.img = file;
      reader.onload = (ev) => {
        this.bannerImg.bannerFile = file;
        if (!this.hallUa.banner.id) {
          this.hallUa.banner.id = new Date().valueOf();
        }

        this.hallUa.banner.bannerLocal = ev.currentTarget.result;
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