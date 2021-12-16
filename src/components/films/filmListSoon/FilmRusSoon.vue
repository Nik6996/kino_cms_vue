<template>
  <div>
    <div class="film">
      <div class="film__title">
        <p>
          Название фильма
          <input
            v-model="itemRu.nameFilm"
            class="film__title-input"
            type="text"
            placeholder="Назвние фильма"
          />
        </p>
      </div>
      <div class="film__description">
        <p>Описание</p>
        <textarea
          v-model="itemRu.descriptionFilm"
          class="film__description-aria"
          type="text-aria"
          placeholder="Текст"
        />
      </div>
      <div class="film__main-img">
        <span>Главное изображение</span>
        <label class="film__img-main"
          ><input
            ref="ImgInput"
            class="film__img"
            v-on:change="previewImg()"
            accept=".png, .jpg, .jpeg"
            type="file" />
          <img v-bind:src="imageSrc" alt=""
        /></label>

        <button @click="deleteImg()" class="film__remove">Удалить</button>
      </div>
      <div class="film__gallery-img">
        <span>Галерея изображений</span>
        <div class="film__gallery">
          <div class="film__size-gallery">Размер: 1000x190</div>

          <div class="film__gallery-list">
            <div v-for="(img, index) in galleryImgUrl" :key="img.id">
              <img-gallary-soon
                v-model="galleryImgUrl[index]"
                @reload="removeImageOld(index, img.id)"
                ref="imgGallaryFilm"
              />
            </div>

            <div v-for="(img, index) in galleryImg" :key="img.key">
              <img-gallary-soon
                v-model="galleryImg[index]"
                @reload="removeImageNew(index)"
                ref="imgGallaryFilm"
              />
            </div>
          </div>

          <label class="btn bg-olive margin" for="clearImgGallay">
            <span>Добавить</span>
          </label>

          <input
            accept=".png, .jpg, .jpeg"
            type="file"
            ref="InputImg"
            class="img-input"
            v-on:change="addImageGallery()"
            id="clearImgGallay"
          />
        </div>
      </div>
      <div class="film__ref-trailer">
        <span>Ссылка на трейлер </span>
        <input
          v-model="itemRu.refTrailer"
          type="text"
          placeholder="Ссылка на трейлер"
        />
      </div>
      <div class="film__type-film">
        <span>Тип кино</span>
        <p>
          <input v-model="itemRu.typeFilm" type="checkbox" value="3D" />
          3D
        </p>
        <p>
          <input v-model="itemRu.typeFilm" type="checkbox" value="2D" checked />
          2D
        </p>
        <p>
          <input v-model="itemRu.typeFilm" type="checkbox" value="IMAX" />
          IMAX
        </p>
      </div>
      <div class="film__seo-block">
        <span>SEO блок:</span>
        <div class="film__seo-input">
          <p>
            URL: <input v-model="itemRu.seoUrl" type="text" placeholder="URL" />
          </p>
          <p>
            Title:
            <input v-model="itemRu.seoTitle" type="text" placeholder="Title" />
          </p>
          <p class="keywords">
            Keywords:
            <input
              v-model="itemRu.seoKeywords"
              type="text"
              placeholder="word"
            />
          </p>
          <p class="description">
            Description:<textarea
              v-model="itemRu.seoDescription"
              class="description-textarea"
              placeholder="Description"
            ></textarea>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImgGallarySoon from "@/components/films/filmListSoon/ImgGallarySoon.vue";
const defaultImg = require("@/assets/img/prevue.png");
export default {
  components: {
    ImgGallarySoon,
  },
  data() {
    return {
      galleryImg: this.itemRu.galleryImg,
      galleryImgUrl: null,
      file: null,
      fileUrl: null,
      fileLocal: this.itemRu.fileLocal,
      btnControl: false,
      uniqueKey: 0,
    };
  },
  props: {
    itemRu: {
      type: Object,
    },
  },

  computed: {
    imageSrc() {
      if (this.fileUrl) {
        return this.fileUrl;
      }
      if (this.itemRu.fileLocal) {
        return this.itemRu.fileLocal;
      }
      if (this.itemRu.mainImgUrl.url) {
        return this.itemRu.mainImgUrl.url;
      } else {
        return defaultImg;
      }
    },
  },
  watch: {
    file: {
      handler(file) {
        this.itemRu.mainImg = file;
      },
    },
  },
  created() {
    this.galleryImgUrl = this.itemRu.galleryImgUrl;
  },

  methods: {
    removeImageNew(index) {
      if (this.galleryImg.length >= 1) {
        this.galleryImg.splice(index, 1);
      }
    },
    removeImageOld(index, id) {
      if (this.galleryImgUrl.length >= 1) {
        console.log(id);
        this.$emit("imgIdRemove", id);

        this.galleryImgUrl.splice(index, 1);
      }
    },

    loadImg() {
      this.galleryImgUrl = this.itemRu.galleryImgUrl;
    },

    async addImageGallery() {
      await this.galleryImg.push({
        image: this.$refs.InputImg.files[0],
        key: this.uniqueKey++,
      });
      this.itemRu.galleryImg = this.galleryImg;
      document.getElementById("clearImgGallay").value = "";
      this.galleryImg.forEach((img, index) => {
        if (!img.image) {
          this.galleryImg.splice(index, 1);
        }
      });
    },

    deleteImg() {
      (this.fileUrl = null),
        (this.file = null),
        (this.itemRu.fileLocal = ""),
        (this.itemRu.mainImgUrl.imgId = "");
      this.itemRu.mainImgUrl.url = "";
    },
    previewImg() {
      if (!this.$refs.ImgInput || !this.$refs.ImgInput.files?.length) {
        this.file = null;
        this.fileUrl = null;
        return;
      }

      const file = this.$refs.ImgInput.files[0];
      const reader = new FileReader();
      this.itemRu.mainImg = file;
      reader.onload = (ev) => {
        this.file = file;
        this.file.imgId = new Date().valueOf();
        this.fileUrl = ev.currentTarget.result;
        this.itemRu.fileLocal = ev.currentTarget.result;
      };

      reader.readAsDataURL(file);
    },
  },
};
</script>

<style lang="scss" scoped>
.film {
  &__title {
    font-weight: 500;
  }
  &__title-input {
    width: 300px;
    height: 25px;
  }

  &__description {
    display: flex;
    font-weight: 500;
    p {
      margin-right: 10px;
    }
  }

  &__description-aria {
    width: 100%;
    height: 200px;
  }

  &__main-img {
    display: flex;
    align-items: center;
    span {
      font-weight: 500;
    }
  }

  &__img-main {
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

  &__add-img,
  &__remove {
    margin: 0px 20px;
    border-radius: 7px;
    width: 120px;
    background-color: rgb(226, 97, 97);
  }

  &__gallery-img {
    margin: 20px 0px;
    span {
      font-weight: 500;
    }
  }

  &__gallery {
    margin-top: 30px;
    display: flex;
    align-items: center;
  }

  &__size-gallery {
    margin-right: 50px;
  }

  &__gallery-list {
    display: flex;
    align-items: center;
    min-height: 90px;
    flex-wrap: wrap;
  }

  &__ref-trailer {
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    input {
      width: 300px;
    }
    span {
      margin-right: 20px;
      font-weight: 500;
    }
  }

  &__type-film {
    display: flex;
    margin-bottom: 30px;
    font-weight: 500;
    p {
      margin: 0px 20px;
    }
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
.save-img {
  display: flex;
  justify-content: center;
}
.img-input {
  display: none;
}
</style>