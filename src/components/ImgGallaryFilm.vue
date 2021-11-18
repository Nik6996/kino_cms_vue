<template>
  <div>
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
    };
  },

  computed: {
    imageSrc() {
      if (this.fileUrl) {
        return this.fileUrl;
      } else {
        return defaultImg;
      }
    },
  },

  created() {
    this.file = this.$attrs.modelValue.image || null;
    this.displayFileImage();
  },

  methods: {
    previewImg() {
      if (!this.$refs.ImgInput || !this.$refs.ImgInput.files?.length) {
        this.file = null;
        this.fileUrl = null;
        return;
      }

      this.file = this.$refs.ImgInput.files[0];
      this.file.imgId = new Date().valueOf();
      this.$attrs.modelValue.image = this.file;

      this.displayFileImage();
    },

    displayFileImage() {
      if (!this.file) {
        this.fileUrl = null;
        return;
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
</style>