<template>
  <div>
    <div class="stock">
      <div class="stock__content">
        <div class="stock__header">
          <div class="stock__name">
            <span>Назва Акції</span>
            <input
              v-model="stockUa.name"
              placeholder="Назва акції"
              type="text"
            />
          </div>
          <div class="stock__calendar">
            <div class="stock__published">
              <span>Дата публiкацiї</span>
              <div class="stock__date-published">
                <span>{{ date.toLocaleDateString() }}</span>
                <button @click="calendar()" class="stock__calendar-btn">
                  <img
                    class="stock__btn-calendar"
                    src="@/assets/icon/calendar.svg"
                    alt=""
                  />
                  <div class="stock__arrow">
                    <img
                      v-bind:class="{ active: isActive }"
                      src="@/assets/icon/arrow.svg"
                      alt=""
                    />
                  </div>
                </button>
              </div>
            </div>
            <div v-if="isActive" class="stock__date">
              <DatePicker v-model="date" />
            </div>
          </div>
        </div>
        <div class="stock__description">
          <span>Опис</span>
          <textarea v-model="stockUa.description" placeholder="Опис"></textarea>
        </div>
        <div class="stock__main-img">
          <span>Головна картинка</span>
          <label class="stock__lable-main">
            <input
              accept=".png, .jpg, .jpeg"
              class="stock__img-main"
              ref="mainImg"
              @change="previewLogo()"
              type="file"
            />
            <img :src="imageSrc" alt="" />
          </label>
          <button @click="imgMainRemove()" class="stock__remove-main-img">
            Видалити
          </button>
        </div>
        <div class="stock__gallary gallary">
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
        <div class="stock__ref-video">
          <span>Посилання на вiдео</span>
          <input
            v-model="stockUa.refVideo"
            placeholder="Посилання на вiдео"
            type="text"
          />
        </div>

        <div class="stock__seo">
          <div class="stock__seo-block">
            <span>SEO блок:</span>
            <div class="stock__seo-input">
              <p>
                URL:
                <input v-model="stockUa.seoUrl" type="text" placeholder="URL" />
              </p>
              <p>
                Title:
                <input
                  v-model="stockUa.seoTitle"
                  type="text"
                  placeholder="Title"
                />
              </p>
              <p class="keywords">
                Keywords:
                <input
                  v-model="stockUa.seoKeywords"
                  type="text"
                  placeholder="word"
                />
              </p>
              <p class="stock__seo-description">
                Description:<textarea
                  v-model="stockUa.seoDescription"
                  class="stock__seo-description-textarea"
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
import { Calendar, DatePicker } from "v-calendar";
import GallaryImg from "@/components/cinemas/GallaryImg.vue";

export default {
  data() {
    return {
      mainImg: {
        file: "",
        url: "",
        id: "",
        mainLocal: "",
      },
      gallary: this.stockUa.gallary,
      date: new Date(),
      isActive: false,
    };
  },
  components: {
    Calendar,
    DatePicker,
    GallaryImg,
  },
  props: {
    stockUa: {
      type: Object,
    },
  },
  computed: {
    imageSrc() {
      if (this.stockUa.mainImg.mainLocal) {
        return this.stockUa.mainImg.mainLocal;
      }
      if (this.stockUa.mainImg.imgUrl) {
        return this.stockUa.mainImg.imgUrl;
      } else {
        return defaultImg;
      }
    },
  },

  watch: {
    stockUa: {
      handler(stockUa) {
        this.gallary = stockUa.gallary;
        this.date = this.stockUa.date;
      },
    },
    date: {
      handler(date) {
        this.stockUa.date = date;
      },
    },
  },

  methods: {
    gallaryRemove(id) {
      this.$emit("removeGallaryUa", id);
      console.log(id);
    },
    calendar() {
      if (!this.isActive) {
        this.isActive = true;
      } else {
        this.isActive = false;
      }
    },
    previewLogo() {
      if (!this.$refs.mainImg || !this.$refs.mainImg.files?.length) {
        this.mainImg.file = "";
        this.mainImg.localUrl = "";
        return;
      }
      const file = this.$refs.mainImg.files[0];
      const reader = new FileReader();
      this.stockUa.mainImg.img = file;
      reader.onload = (ev) => {
        this.mainImg.file = file;
        if (!this.stockUa.mainImg.id) {
          this.stockUa.mainImg.id = new Date().valueOf();
        }
        this.stockUa.mainImg.mainLocal = ev.currentTarget.result;
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
      this.stockUa.mainImg.url = "";
      this.stockUa.mainImg.mainLocal = "";
      this.stockUa.mainImg.img = "";
      this.mainImg.id = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.stock {
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

  &__calendar {
    margin-right: 150px;
    position: relative;
    span {
      margin-right: 40px;
      font-weight: 500;
    }
  }
  &__date-published {
    display: flex;
    justify-content: space-between;
    border: solid 2px black;
    max-height: 30px;
    width: 250px;
    span {
      padding-left: 5px;
    }
  }
  &__published {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding-left: 5px;
    button {
      position: relative;
      top: -2px;
      width: 60px;
      height: 30px;
      right: -2px;
    }
  }
  &__date {
    display: flex;
    justify-content: flex-end;
    position: absolute;
    right: 0;
  }
  &__calendar-btn {
    display: flex;
  }
  &__btn-calendar {
    position: relative;
    top: 2px;
    left: -2px;
    width: 23px;
    height: 20px;
  }
  &__arrow {
    position: relative;
    top: -3px;
    img {
      width: 25px;
      height: 25px;
      transition: all 0.5s;
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

  &__ref-video {
    margin-bottom: 40px;
    span {
      font-weight: 500;
      margin-right: 30px;
    }
    input {
      width: 400px;
    }
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
.active {
  transform: rotateX(180deg);
  transition: all 0.5s;
}
</style>