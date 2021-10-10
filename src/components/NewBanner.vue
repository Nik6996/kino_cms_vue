<template>
  <div>
    <form action="#" class="banner-form">
      <div @click="deleteBanner" class="banner-delete"><span>x</span></div>
      <input type="file" class="banner-img" />
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
    return {};
  },
  created() {
    console.log(this);
  },
  methods: {
    updateValue(key, value) {
      this.$emit("update:modelValue", { ...this.modelValue, [key]: value });
    },
    deleteBanner() {
      this.$emit("deleteBanner");
    },
    async fachBanners() {},
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
  width: 150px;
  height: 100px;
  background: grey;
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
</style>