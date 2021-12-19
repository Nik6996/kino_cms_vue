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
      <div class="news__content">
        <div class="news__title-list">
          <div class="news__name">Название</div>
          <div class="news__date">Дата создания</div>
          <div class="news__status">Статус</div>
        </div>
        <div class="news__list">
          <div v-for="(news, index) in newsList" :key="news.id">
            <prewiew-news v-model="newsList[index]" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PrewiewNews from "@/components/news/PrewiewNews.vue";
export default {
  data() {
    return {};
  },
  components: {
    PrewiewNews,
  },
  computed: {
    ...mapGetters({
      newsList: "news/getNews",
    }),
  },
  async mounted() {
    if (this.newsList.length <= 0) await this.$store.dispatch("news/loadNews");
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

  &__content {
    max-width: 800px;
    margin: 0 auto;
  }

  &__title-list {
    margin-top: 50px;
    display: flex;
    justify-content: space-between;
    font-weight: 500;
    height: 40px;
    background-color: rgb(180, 180, 180);
    border: solid 1px black;
  }

  &__name {
    display: flex;
    justify-content: flex-start;
    width: 140%;
    padding: 0px 10px;
    height: 100%;
    align-items: center;
    font-weight: 500;
  }

  &__date,
  &__status {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    padding: 0px 10px;
    border-left: solid 1px black;
  }
  &__status {
    width: 60%;
  }

  &__list {
  }
}
</style>