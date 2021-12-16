<template>
  <div>
    <div class="news">
      <div class="news__title">Список Новостей</div>
      <div class="news__button">
        <button class="news__btn-create">
          <router-link to="/news/create">
            <img src="@/assets/icon/plus.svg" alt="" />
            <span>Создать Новость</span>
          </router-link>
        </button>
      </div>

      <div class="news__list"></div>
    </div>
  </div>
</template>

<script>
import PrewiewNews from "@/components/news/PrewiewNews.vue";
export default {
  data() {
    return {
      newsList: [],
    };
  },
  components: {
    PrewiewNews,
  },
};
</script>

<style lang="scss" scoped>
.news {
  margin-right: 200px;
  &__title {
    display: flex;
    justify-content: center;
    font-size: 30px;
    font-weight: 500;
  }
  &__button {
    display: flex;
    justify-content: flex-end;
    button {
      border-radius: 5px;
    }
    span {
      color: black;
    }
    img {
      position: relative;
      top: -1px;
      width: 25px;
      height: 25px;
      margin-right: 5px;
    }
  }
  &__list {
  }
}
</style>