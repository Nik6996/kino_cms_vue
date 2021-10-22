
<template>
  <div><h1>CINEMAS</h1></div>
  <form action="">
    <label class="lable-input" for="input-img">
      <input
        accept=".png, .jpg, .jpeg"
        type="file"
        id="input-img"
        ref="inputImg"
        v-on:change="previewImg()"
        class="input"
      />
      <img v-bind:src="fileUrl" alt="" />
    </label>

    <button @click="addInStorege">add</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      file: "",
      fileUrl: "",
      imgId: "",
    };
  },

  // mounted: function () {
  //   this.$store.dispatch("uploadImg");
  // },
  methods: {
    previewImg() {
      this.file = this.$refs.inputImg.files[0];
      const reader = new FileReader();
      reader.onload = (ev) => {
        this.fileUrl = ev.currentTarget.result;
      };
      reader.readAsDataURL(this.file);
      this.imgId = new Date().valueOf();

      if (this.file !== "") {
        this.$store.commit("setImg", this.file);
      }
    },

    addInStorege() {
      this.$store.dispatch("addImage");
    },
  },
  mounted: function () {},
};
</script>

<style>
.input {
  display: none;
}
.lable-input {
  display: flex;
  justify-content: center;
  width: 100px;
  height: 100px;
  max-width: 100px;
  overflow: hidden;
  background-color: blue;
}
</style>