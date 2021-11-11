<template>
  <div>
    <div class="cart">
      <div class="cart__img">
        <img src="@/assets/img/prevue.png" alt="" />
      </div>
      <div class="cart__name"><span>Название фильма</span></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.cart {
  width: 200px;
  height: 300px;
  &__img {
    cursor: pointer;
    img {
      width: 180px;
      height: 200px;
    }
  }

  &__name {
  }
}
</style>