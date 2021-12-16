<template>
  <div>
    <form action="#" class="banner-form">
      <div @click="deleteBanner" class="banner-delete"><span>x</span></div>
      <label class="banner-img">
        <input
          accept=".png, .jpg, .jpeg"
          type="file"
          ref="inputImg"
          class="input-img"
          v-on:change="previewImg()"
        />
        <img v-bind:src="imageSrc" alt="" />
      </label>

      <p>
        URL:<input
          @input="updateValue('url', $event.target.value)"
          :value="modelValue.url"
          type="text"
          placeholder="URL"
          class="banner-url"
        />
      </p>
      <p>
        Text:<input
          @input="updateValue('text', $event.target.value)"
          :value="modelValue.text"
          type="text"
          placeholder="text"
          class="banner-text"
        />
      </p>
    </form>
  </div>
</template>

<script>
const defaultImg = require("@/assets/img/prevue.png");
export default {
  props: {
    modelValue: {
      type: Object,
    },
  },

  computed: {
    imageSrc() {
      if (this.fileUrl) {
        return this.fileUrl;
      } else if (this.modelValue.image) {
        return this.modelValue.image;
      } else {
        return defaultImg;
      }
    },

    fileId() {
      return this.modelValue.id;
    },
  },

  data() {
    return {
      fileUrl: null,
      file: null,
    };
  },

  mounted: function () {},

  watch: {
    file: {
      handler(file) {
        this.updateValue("file", file);
      },
    },
  },

  methods: {
    updateValue(key, value) {
      this.$emit("update:modelValue", { ...this.modelValue, [key]: value });
    },
    deleteBanner() {
      this.$emit("deleteBanner");
    },
    previewImg() {
      if (!this.$refs.inputImg || !this.$refs.inputImg.files?.length) {
        this.file = null;
        this.fileUrl = null;
        return;
      }

      const file = this.$refs.inputImg.files[0];
      const reader = new FileReader();

      reader.onload = (ev) => {
        this.file = file;
        this.fileUrl = ev.currentTarget.result;
        this.file.imgId = this.fileId;
      };

      reader.readAsDataURL(file);
    },
  },
};
</script>



<style lang="scss" scoped>
.banner-form {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 150px;
  height: 200px;
  margin: 0px 20px;
}
.banner-img {
  display: flex;
  justify-content: center;
  width: 150px;
  min-height: 100px;
  background: grey;
  img {
    max-width: 150px;
    max-height: 100px;
  }
}
.banner-url {
  margin-top: 20px;
  width: 150px;
}
.banner-text {
  width: 150px;
}
p {
  white-space: nowrap;
}
.banner-delete {
  cursor: pointer;
  position: absolute;
  right: -10px;
  top: -20px;
}
.input-img {
  display: none;
}
</style>