<template>
  <div>
    <div class="film">
      <div class="film__lang">
        <button class="film__ukr">
          <label for="1">Украинский</label>
          <input
            class="radio1"
            type="radio"
            id="1"
            name="contact"
            value="1"
            checked
            v-model="ukr"
          />
        </button>
        <button class="film__rus">
          <label for="2">Русский</label>

          <input
            class="radio2"
            type="radio"
            id="2"
            name="contact"
            value="2"
            v-model="rus"
          />
        </button>
      </div>
    </div>
    <div><film-pages-rus /></div>

    <div class="film__btns">
      <button @click="$router.push('/films')">Сохранить</button>
      <button class="film__return">Вернуть базовую версию</button>
    </div>
  </div>
</template>

<script>
import FilmPagesRus from "@/components/FilmPagesRus.vue";
export default {
  data() {
    return {
      ukr: "",
      rus: "",
    };
  },
  components: {
    FilmPagesRus,
  },
};
</script>

<style lang="scss" scoped>
.film {
  margin: 10px 40px;
  &__lang {
    display: flex;
    justify-content: flex-end;
  }

  &__ukr,
  &__rus {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    width: 120px;
    height: 30px;
  }
  &__rus:focus {
    background-color: rgb(182, 182, 182);
  }
  &__ukr:focus {
    background-color: rgb(212, 212, 212);
  }
  &__btns {
    display: flex;
    justify-content: center;
    margin: 30px 0px;
  }
  &__return {
    margin-left: 50px;
  }
}
.radio1 {
  //   opacity: 0;
  //   visibility: hidden;
}
.radio2 {
  //   opacity: 0;
  //   visibility: hidden;
}
</style>