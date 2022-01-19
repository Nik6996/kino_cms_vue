<template>
  <div>
    <nav class="main-header">
      <div class="header-logo">
        <label class="header-img">
          <input
            ref="ImgInput"
            class="input-img"
            v-on:change="previewImg()"
            accept=".png, .jpg, .jpeg"
            type="file"
          />
          <img v-bind:src="imageSrc" alt="" />
        </label>
      </div>

      <div class="right-bar">
        <button @click="$router.push('/')">Главная</button>
        <div class="user-name">{{ nameCurrentUser }}</div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
const defaultImg = require("@/assets/img/prevue.png");
export default {
  data() {
    return {
      item: {
        file: null,
      },
      fileUrl: null,
      urlStorage: null,
    };
  },
  computed: {
    ...mapGetters({
      nameCurrentUser: "registration/getCurrentUserName",
      logoImg: "logo/getLogo",
    }),
    imageSrc() {
      if (this.fileUrl) {
        return this.fileUrl;
      } else if (this.logoImg.url) {
        return this.logoImg.url;
      } else {
        return defaultImg;
      }
    },
  },

  mounted() {
    this.$store.dispatch("registration/load");
    this.$store.dispatch("logo/load");
  },
  methods: {
    previewImg() {
      const file = this.$refs.ImgInput.files[0];
      const reader = new FileReader();

      reader.onload = (ev) => {
        this.item.file = file;
        this.fileUrl = ev.currentTarget.result;
      };

      reader.readAsDataURL(file);
      this.$store.dispatch("logo/save", file);
    },
  },
};
</script>

<style lang="scss" scoped>
.header-logo {
  position: relative;
  width: 204px;
  height: 84px;
  background: ghostwhite;
  border: solid 2px black;
  margin: 10px 80px;
  img {
    object-fit: cover;
    width: 200px;
    height: 80px;
  }
}
.main-header {
  background-color: white;
  position: fixed;
  width: 100%;
  top: 0;
  margin-left: 0 !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black !important;
  z-index: 10340;
}
.right-bar {
  font-size: 30px;
  display: flex;
}
.header-btn {
  cursor: pointer;
  margin: 0px 20px;
}
.user-name {
  margin: 0px 20px;
  font-weight: 500;
}
.input-img {
  display: none;
}
</style>