<template>
  <div>
    <div class="card">
      <div class="card__content">
        <router-link
          class="card__link"
          :to="'/film/soon/' + this.$attrs.modelValue.id"
        >
          <div class="card__img">
            <img :src="img" alt="" />
            <div v-show="twoD" class="card__2d">2D</div>
            <div v-show="treeD" class="card__3d">3D</div>
            <div v-show="imax" class="card__imax">IMAX</div>
          </div>
          <div class="card__title">
            <span>{{ name }}</span>
          </div>
        </router-link>
        <button>купить</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      img: this.$attrs.modelValue.itemUa.mainImgUrl.url,
      name: this.$attrs.modelValue.itemUa.nameFilm,
      types: this.$attrs.modelValue.itemUa.typeFilm,
      twoD: false,
      treeD: false,
      imax: false,
    };
  },
  async mounted() {
    await this.$store.dispatch("film/loadFims");
    this.types.forEach((type) => {
      if (type === "2D") {
        this.twoD = true;
      }
      if (type === "3D") {
        this.treeD = true;
      }
      if (type === "IMAX") {
        this.imax = true;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.card {
  width: 150px;
  height: 270px;
  margin: 25px;
  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &__img {
    position: relative;
    img {
      width: 150px;
      height: 200px;
      object-fit: cover;
    }
  }

  &__2d {
    position: absolute;
    top: 20px;
    right: -14px;
    width: 35px;
    height: 22px;
    background-color: indigo;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }

  &__3d {
    position: absolute;
    top: 40px;
    right: -14px;
    width: 35px;
    height: 22px;
    background-color: rgb(14, 177, 76);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }

  &__imax {
    position: absolute;
    top: 60px;
    right: -20px;
    width: 45px;
    height: 30px;
    background-color: rgb(12, 3, 133);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }

  &__title {
    display: flex;
    justify-content: center;
    font-weight: 800;
    font-size: 14px;
    margin: 10px 0px;
    color: blue;
  }
  button {
    display: flex;
    align-items: center;
    height: 25px;
    width: 70px;
    background-color: rgb(209, 136, 40);
    font-weight: 500;
    color: white;
    border-radius: 12px;
    border: solid 0;
    padding-bottom: 3px;
  }
}
</style>