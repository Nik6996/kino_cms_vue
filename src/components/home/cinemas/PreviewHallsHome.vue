<template>
  <div>
    <router-link
      class="button"
      :to="'/cinema/hall/' + this.$attrs.modelValue.id"
    >
      <div class="halls">
        <div class="halls__name">
          <span> Зал {{ name }}</span>
        </div>
      </div></router-link
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: this.$attrs.modelValue.hallUa.number,
    };
  },
  mounted() {
    console.log(this.$attrs.modelValue);
  },
};
</script>

<style lang="scss" scoped>
.halls {
  width: 200px;
  height: 40px;
  border: solid 1px black;
  &__name {
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    color: black;
  }
}
</style>