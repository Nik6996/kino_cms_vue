<template>
  <div>
    <div class="schedule__content">
      <div class="schedule__title-list">
        <div class="schedule__film">{{ film }}</div>
        <div class="schedule__cinema">{{ cinema }}</div>
        <div class="schedule__hall">{{ hall }}</div>
        <div class="schedule__date">{{ date }}</div>
        <div class="schedule__time">{{ time }}</div>
        <div class="schedule__price">{{ price }}</div>
      </div>
      <div class="schedule__edit">
        <router-link :to="'/schedule/edit/' + this.$attrs.modelValue.id">
          <img src="@/assets/icon/edit-hall.png" alt="" />
        </router-link>
      </div>
      <div @click="remove()" class="schedule__delete">
        <img src="@/assets/icon/remove-hall.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      film: this.$attrs.modelValue.film.filmName,
      cinema: this.$attrs.modelValue.cinema.cinemaName,
      hall: this.$attrs.modelValue.hall.hallName,
      date: this.$attrs.modelValue.date,
      time: this.$attrs.modelValue.time,
      price: this.$attrs.modelValue.price,
    };
  },
  methods: {
    remove() {
      this.$store.dispatch("schedule/remove", this.$attrs.modelValue);
    },
  },
};
</script>

<style lang="scss" scoped>
.schedule {
  &__content {
    display: flex;
    align-items: center;
    margin: 0 auto;
  }

  &__title-list {
    display: flex;
    max-width: 800px;
    font-weight: 500;
    height: 40px;
    background-color: rgb(219, 219, 219);
    border: solid 1px black;
  }

  &__film {
    width: 150px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    padding: 0px 5px;
  }

  &__cinema {
    width: 178px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    padding: 0px 5px;
    border-left: solid 1px black;
  }

  &__hall {
    width: 127px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    padding: 0px 5px;
    border-left: solid 1px black;
  }

  &__time {
    width: 148px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    padding: 0px 5px;
    border-left: solid 1px black;
  }

  &__price {
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    padding: 0px 5px;
    border-left: solid 1px black;
  }
  &__date {
    width: 135px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    padding: 0px 5px;
    border-left: solid 1px black;
  }
  &__edit,
  &__delete {
    margin: 0px 10px;
    cursor: pointer;
    img {
      width: 25px;
      height: 25px;
    }
  }
}
</style>
