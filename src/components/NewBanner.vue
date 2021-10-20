<template>
  <div>
    <form action="#" class="banner-form">
      <div @click="deleteBanner" class="banner-delete"><span>x</span></div>
      <label class="banner-img">
        <input
          accept=".png, .jpg, .jpeg"
          type="file"
          id="input-img"
          ref="inputImg"
          v-on:change="addImg()"
          class="input-img"
        />
        <img v-if="fileUrl === ''" src="@/assets/img/prevue.png" alt="" />
        <img v-else v-bind:src="fileUrl" alt="" />
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
export default {
  props: {
    modelValue: {
      type: Object,
    },
  },
  data() {
    return {
      file: "",
      fileUrl: "",
    };
  },
  // created() {
  //   console.log(this);
  // },
  methods: {
    updateValue(key, value) {
      this.$emit("update:modelValue", { ...this.modelValue, [key]: value });
    },
    deleteBanner() {
      this.$emit("deleteBanner");
    },
    addImg() {
      this.file = this.$refs.inputImg.files[0];
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