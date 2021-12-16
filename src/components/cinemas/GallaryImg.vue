<template>
  <div>
    <div class="delete-img"><span @click="deleteImg()">X</span></div>
    <label class="img-main">
      <input
        accept=".png, .jpg, .jpeg"
        type="file"
        ref="ImgInput"
        class="img"
        v-on:change="previewImg()"
      />
      <img v-bind:src="imageSrc" alt="" />
    </label>
  </div>
</template>

<script>
const defaultImg = require("@/assets/img/prevue.png");
export default {
  data() {
    return {
      file: null,
      img: null,
      imgUrl: null,
      id: null,
    };
  },
  computed: {
    imageSrc() {
      if (this.img) {
        return this.img;
      }
      if (this.imgUrl) {
        return this.imgUrl;
      } else {
        return defaultImg;
      }
    },
  },
  created() {
    this.file = this.$attrs.modelValue.image || null;
    this.imgUrl = this.$attrs.modelValue.url;
    this.id = this.$attrs.modelValue.id || null;
    this.displayFileImage();
  },

  methods: {
    deleteImg() {
      if (this.imgUrl) {
        this.$emit("removeGallaryId", this.id);
      }
      this.$parent.gallary.forEach((item, index) => {
        if (item.id == this.id) {
          this.$parent.gallary.splice(index, 1);
        }
      });
    },

    async previewImg() {
      if (!this.$refs.ImgInput || !this.$refs.ImgInput.files?.length) {
        this.file = null;
        this.img = null;
        this.imgUrl = null;
        return;
      }
      this.file = this.$refs.ImgInput.files[0];

      if (this.id) {
        //this.file.imgId = this.id;
      } else {
        this.id = new Date().valueOf();
        // this.file.imgId = this.id;
      }
      this.$attrs.modelValue.image = this.file;
      this.$attrs.modelValue.id = this.id;
      this.displayFileImage();
    },

    displayFileImage() {
      if (!this.file) {
        this.img = null;
        return;
      }
      if (this.file) {
        //this.imgUrl = null;
        // this.$parent.btnControl = false;

        const reader = new FileReader();

        reader.onload = (ev) => {
          this.img = ev.currentTarget.result;
        };
        reader.readAsDataURL(this.file);
      }
      // if (!this.id) {
      //   this.id = new Date().valueOf();
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
.img-main {
  display: flex;
  justify-content: center;
  width: 120px;
  height: 80px;
  background-color: rgb(179, 179, 179);
  margin: 0px 20px;
  img {
    max-width: 120px;
    max-height: 80px;
  }
}
.img {
  display: none;
}
.delete-img {
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  position: relative;
  right: 10px;
}
</style>