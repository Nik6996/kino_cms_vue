
<template>
  <div><h1>CINEMAS</h1></div>
  <form action="">
    <label class="lable-input" for="input-img">
      <input class="input" type="file" id="input-img" />
    </label>
  </form>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  mounted: function () {
    this.$store.dispatch("addImage");
  },
};
</script>

<style>
.input {
  display: none;
}
.lable-input {
  width: 100px;
  height: 100px;
  background-color: blue;
}
</style>