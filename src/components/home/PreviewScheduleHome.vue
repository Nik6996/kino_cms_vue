<template>
  <div>
    <div class="seance">
      <div class="seance__date">{{ date }}</div>
      <div class="seance__time">{{ time }}</div>
      <div class="seance__film">{{ film }}</div>
      <div class="seance__cinema">{{ cinema }}</div>
      <div class="seance__hall">{{ hall }}</div>
      <div class="seance__price">{{ price }}</div>
      <div class="seance__booc">
        <!-- <router-link :to="'/schedule/edit/' + this.$attrs.modelValue.id">
          <img src="@/assets/icon/booc.png" alt=""
        /></router-link> -->
        <router-link
          :to="{
            name: 'filmId',
            params: {
              idFilm: this.$attrs.modelValue.film.filmId,
              id: this.id,
              hallImg: this.$attrs.modelValue.hallImg,
            },
          }"
        >
          <img src="@/assets/icon/booc.png" alt=""
        /></router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: this.$attrs.modelValue.date,
      time: this.$attrs.modelValue.time,
      film: this.$attrs.modelValue.film.filmName,
      cinema: this.$attrs.modelValue.cinema.cinemaName,
      hall: this.$attrs.modelValue.hall.hallName,
      price: this.$attrs.modelValue.price,
      id: this.$attrs.modelValue.id,
    };
  },
};
</script>

<style lang="scss" scoped>
.seance {
  border-top: solid 1px gray;
  height: 40px;
  width: 950px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;

  &__date {
    width: 90px;
    margin: 0px 10px;
  }

  &__time {
    display: flex;
    justify-content: center;
    width: 80px;
    margin: 0px 10px;
  }

  &__film {
    display: flex;
    justify-content: center;
    width: 180px;
    margin: 0px 10px;
  }

  &__cinema {
    display: flex;
    justify-content: center;
    width: 150px;
    margin: 0px 10px;
  }

  &__hall {
    display: flex;
    justify-content: center;
    width: 60px;
    margin: 0px 10px;
  }

  &__price {
    display: flex;
    justify-content: center;
    width: 80px;
    margin: 0px 10px;
  }
  &__booc {
    display: flex;
    justify-content: center;
    width: 100px;
    margin: 0px 10px;
    img {
      width: 25px;
      height: 25px;
    }
  }
}
</style>