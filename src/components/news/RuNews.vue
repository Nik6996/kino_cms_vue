<template>
  <div>
    <div class="news">
      <div class="news__content">
        <div class="news__header">
          <div class="news__name">
            <span>Название новости</span>
            <input
              v-model="newsRu.name"
              placeholder="Название новости"
              type="text"
            />
          </div>
          <div class="news__calendar">
            <div class="news__published">
              <span>Дата публикации</span>
              <div class="news__date-published">
                <span>{{ date.toLocaleDateString() }}</span>
                <button @click="calendar()" class="news__calendar-btn">
                  <img
                    class="news__btn-calendar"
                    src="@/assets/icon/calendar.svg"
                    alt=""
                  />
                  <div class="news__arrow">
                    <img
                      v-bind:class="{ active: isActive }"
                      src="@/assets/icon/arrow.svg"
                      alt=""
                    />
                  </div>
                </button>
              </div>
            </div>
            <div v-if="isActive" class="news__date">
              <DatePicker v-model="date" />
            </div>
          </div>
        </div>
        <div class="news__description">
          <span>Описание</span>
          <textarea
            v-model="newsRu.description"
            placeholder="Описание"
          ></textarea>
        </div>
        <div class="news__main-img">
          <span>Главная картинка</span>
          <label class="news__lable-main">
            <input
              accept=".png, .jpg, .jpeg"
              class="news__img-main"
              ref="mainImg"
              @change="previewLogo()"
              type="file"
            />
            <img :src="imageSrc" alt="" />
          </label>
          <button @click="imgMainRemove()" class="news__remove-main-img">
            Удалить
          </button>
        </div>
        <div class="news__gallary gallary">
          <span class="gallary__title">Галерея картинок</span>
          <div class="gallary__main">
            <div class="gallary__size">Размер 1000x190</div>
            <div class="gallary__list">
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
        <div class="news__ref-video">
          <span>Ссылка на видео</span>
          <input
            v-model="newsRu.refVideo"
            placeholder="Ссылка на видео"
            type="text"
          />
        </div>

        <div class="news__seo">
          <div class="news__seo-block">
            <span>SEO блок:</span>
            <div class="news__seo-input">
              <p>
                URL:
                <input v-model="newsRu.seoUrl" type="text" placeholder="URL" />
              </p>
              <p>
                Title:
                <input
                  v-model="newsRu.seoTitle"
                  type="text"
                  placeholder="Title"
                />
              </p>
              <p class="keywords">
                Keywords:
                <input
                  v-model="newsRu.seoKeywords"
                  type="text"
                  placeholder="word"
                />
              </p>
              <p class="news__seo-description">
                Description:<textarea
                  v-model="newsRu.seoDescription"
                  class="news__seo-description-textarea"
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
      gallary: this.newsRu.gallary,
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
    newsRu: {
      type: Object,
    },
  },
  computed: {
    imageSrc() {
      if (this.newsRu.mainImg.mainLocal) {
        return this.newsRu.mainImg.mainLocal;
      }
      if (this.newsRu.mainImg.url) {
        return this.newsRu.mainImg.url;
      } else {
        return defaultImg;
      }
    },
  },
  watch: {
    newsRu: {
      handler(newsRu) {
        this.gallary = newsRu.gallary;
        this.date = this.newsRu.date;
      },
    },
    date: {
      handler(date) {
        this.newsRu.date = date;
      },
    },
  },

  methods: {
    gallaryRemove(id) {
      this.$emit("removeGallaryRu", id);
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
      this.newsRu.mainImg.img = file;
      reader.onload = (ev) => {
        this.mainImg.file = file;
        if (!this.newsRu.mainImg.id) {
          this.newsRu.mainImg.id = new Date().valueOf();
        }
        this.newsRu.mainImg.mainLocal = ev.currentTarget.result;
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
      this.newsRu.mainImg.url = "";
      this.newsRu.mainImg.mainLocal = "";
      this.newsRu.mainImg.img = "";
      this.mainImg.id = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.news {
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