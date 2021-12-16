<template>
  <div>
    <div class="cinema">
      <div class="cinema__name">
        <p>Название кинотеатра:</p>
        <input
          v-model="cinemaRu.name"
          type="text"
          placeholder="Название кинотеатра"
        />
      </div>
      <div class="cinema__description">
        <p>Описание:</p>
        <textarea v-model="cinemaRu.description" placeholder="Текст" />
      </div>
      <div class="cinema__conditions">
        <p>Условия:</p>
        <textarea v-model="cinemaRu.conditions" placeholder="Текст" />
      </div>

      <div class="cinema__logo-img">
        <span>Логотип</span>
        <label class="cinema__img-logo"
          ><input
            ref="imgLogo"
            class="cinema__img"
            accept=".png, .jpg, .jpeg"
            @change="previewLogo()"
            type="file" />
          <img :src="logoSrc" alt=""
        /></label>
        <button @click="logoRemove()" class="cinema__logo-remove">
          Удалить
        </button>
      </div>

      <div class="cinema__banner-img">
        <span>Фото верхнего баннера</span>
        <label class="cinema__img-banner"
          ><input
            ref="imgBanner"
            class="cinema__img"
            accept=".png, .jpg, .jpeg"
            @change="previewBanner()"
            type="file" />
          <img :src="bannerSrc" alt=""
        /></label>
        <button @click="bannerRemove()" class="cinema__banner-remove">
          Удалить
        </button>
      </div>

      <div class="cinema__gallary gallary">
        <p class="gallary__title">Галерея картинок</p>
        <div class="gallary__main">
          <span class="gallary__size">Размер: 1000x190</span>
          <div class="gallary__list-img">
            <div v-for="(img, index) in gallary" :key="img.id">
              <gallary-img
                @removeGallaryId="gallaryRemove"
                v-model="gallary[index]"
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
      </div>

      <div class="cinema__list-hall hall">
        <p>Список залов</p>
        <div class="hall__title">
          <div class="hall__name">Название</div>
          <div class="hall__date">Дата создания</div>
        </div>
        <div class="hall__list">
          <div v-for="(hall, index) in halls" :key="hall.id">
            <preview-hall @removeHall="hallForDelete" v-model="halls[index]" />
          </div>
        </div>
        <div class="hall__create">
          <button @click="saveLocal()">
            <router-link
              :to="{
                name: 'hallCard',
                params: { idCinema: this.cinemaRu.cinemaId },
              }"
              >Создать Зал</router-link
            >
          </button>
        </div>
      </div>

      <div class="cinema__seo">
        <div class="cinema__seo-block">
          <span>SEO блок:</span>
          <div class="cinema__seo-input">
            <p>URL: <input type="text" placeholder="URL" /></p>
            <p>
              Title:
              <input type="text" placeholder="Title" />
            </p>
            <p class="keywords">
              Keywords:
              <input type="text" placeholder="word" />
            </p>
            <p class="description">
              Description:<textarea
                class="description-textarea"
                placeholder="Description"
              ></textarea>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const defaultImg = require("@/assets/img/prevue.png");
import PreviewHall from "@/components/cinemas/PreviewHall.vue";
import GallaryImg from "@/components/cinemas/GallaryImg.vue";

export default {
  components: {
    PreviewHall,
    GallaryImg,
  },
  data() {
    GallaryImg;
    return {
      logoImg: {
        logoFile: "",
        logoUrl: "",
        logoId: this.cinemaRu.logo.id,
        logoLocalUrl: this.cinemaRu.logo.logoLocal,
      },
      bannerImg: {
        bannerFile: "",
        bannerUrl: "",
        bannerId: "",
        bannerLocalUrl: "",
      },
      gallary: this.cinemaRu.gallary,
      gallaryUrl: "",
      halls: "",
    };
  },
  props: {
    hallList: {
      type: Array,
    },
    cinemaRu: {
      type: Object,
    },
  },

  computed: {
    logoSrc() {
      if (this.cinemaRu.logo.logoLocal) {
        return this.cinemaRu.logo.logoLocal;
      }
      if (this.cinemaRu.logo.imgUrl) {
        return this.cinemaRu.logo.imgUrl;
      } else {
        return defaultImg;
      }
    },
    bannerSrc() {
      if (this.cinemaRu.banner.bannerLocal) {
        return this.cinemaRu.banner.bannerLocal;
      }
      if (this.cinemaRu.banner.imgUrl) {
        return this.cinemaRu.banner.imgUrl;
      } else {
        return defaultImg;
      }
    },
  },
  watch: {
    hallList: {
      handler(hallList) {
        this.halls = hallList;
      },
    },
    cinemaRu: {
      handler(cinemaRu) {
        this.gallary = cinemaRu.gallary;
      },
    },
  },
  mounted() {
    this.halls = this.hallList;
  },

  methods: {
    hallForDelete(hall) {
      this.$emit("removeDatabaseHall", hall);
    },
    gallaryRemove(id) {
      this.$emit("removeGallaryRu", id);
    },
    saveLocal() {
      this.$emit("saveLocalFilm");
    },
    bannerRemove() {
      this.bannerImg.bannerFile = "";
      this.bannerImg.bannerUrl = "";
      this.bannerImg.bannerId = "";
      this.cinemaRu.banner.bannerLocal = "";
    },
    logoRemove() {
      this.logoImg.logoFile = "";
      this.logoImg.logoUrl = "";
      this.logoImg.logoId = "";
      this.cinemaRu.logo.logoLocal = "";
    },
    previewLogo() {
      if (!this.$refs.imgLogo || !this.$refs.imgLogo.files?.length) {
        this.logoImg.logoFile = "";
        this.logoImg.logoLocalUrl = "";
        return;
      }

      const file = this.$refs.imgLogo.files[0];
      const reader = new FileReader();
      this.cinemaRu.logo.img = file;
      reader.onload = (ev) => {
        this.logoImg.logoFile = file;
        if (!this.cinemaRu.logo.id) {
          this.cinemaRu.logo.id = new Date().valueOf();
        }
        //this.layoutImg.layoutLocalUrl = ev.currentTarget.result;
        this.cinemaRu.logo.logoLocal = ev.currentTarget.result;
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
      this.cinemaRu.banner.img = file;
      reader.onload = (ev) => {
        this.bannerImg.bannerFile = file;
        if (!this.cinemaRu.banner.id) {
          this.cinemaRu.banner.id = new Date().valueOf();
        }
        this.cinemaRu.banner.bannerLocal = ev.currentTarget.result;
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
.cinema {
  padding: 0px 200px 0px 0px;
  &__name {
    display: flex;
    height: 30px;
    input {
      margin-left: 10px;
      width: 400px;
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

  &__conditions {
    margin-top: 20px;
    display: flex;
    width: 100%;
    height: 100px;
    textarea {
      width: 100%;
      margin-left: 10px;
    }
  }

  &__logo-img,
  &__banner-img {
    display: flex;
    align-items: center;
    span {
      font-weight: 500;
    }
  }

  &__img-logo,
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

  &__logo-remove,
  &__banner-remove {
    margin: 0px 20px;
    border-radius: 7px;
    width: 120px;
    background-color: rgb(226, 97, 97);
  }

  &__list-hall {
  }

  &__save {
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

  &__seo {
    display: flex;
    justify-content: center;
    margin: 30px 0;
  }
}
.hall {
  width: 800px;
  margin: 0 auto;
  p {
    display: flex;
    justify-content: center;
    font-weight: 700;
    font-size: 27px;
  }
  &__title {
    height: 40px;
    background-color: rgb(180, 180, 180);
    display: flex;
    align-items: center;
    justify-content: space-around;
    border: solid 1px black;
  }

  &__name {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    padding: 0px 10px;
    height: 100%;
    align-items: center;
    font-weight: 500;
  }

  &__date {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    padding: 0px 10px;
    border-left: solid 1px black;
    font-weight: 500;
  }

  &__list {
  }

  &__create {
    display: flex;
    justify-content: center;
    margin-top: 20px;
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