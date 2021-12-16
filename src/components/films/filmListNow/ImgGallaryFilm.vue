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
      fileUrl: null,
      fileStorage: null,
      imgId: null,
    };
  },

  computed: {
    imageSrc() {
      if (this.fileUrl) {
        return this.fileUrl;
      }
      if (this.fileStorage) {
        return this.fileStorage;
      } else {
        return defaultImg;
      }
    },
  },

  created() {
    this.file = this.$attrs.modelValue.image || null;
    this.fileStorage = this.$attrs.modelValue.imageStorage || null;
    this.imgId = this.$attrs.modelValue.id || null;
    this.displayFileImage();
  },

  methods: {
    deleteImg() {
      this.$emit("reload");
    },

    async previewImg() {
      if (!this.$refs.ImgInput || !this.$refs.ImgInput.files?.length) {
        this.file = null;
        this.fileUrl = null;
        this.fileStorage = null;

        return;
      }

      this.file = this.$refs.ImgInput.files[0];
      if (this.imgId) {
        this.file.imgId = this.imgId;
      } else {
        this.file.imgId = new Date().valueOf();
      }

      this.$attrs.modelValue.image = this.file;

      this.displayFileImage();
    },

    displayFileImage() {
      if (!this.file) {
        this.fileUrl = null;
        return;
      }
      if (this.file) {
        this.fileStorage = null;
        this.$parent.btnControl = false;
        if (!this.imgId) {
          this.file.imgId = new Date().valueOf();
        }
      }

      const reader = new FileReader();

      reader.onload = (ev) => {
        this.fileUrl = ev.currentTarget.result;
      };
      reader.readAsDataURL(this.file);
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