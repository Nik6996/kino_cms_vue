<template>
  <div>
    <div class="stock">
      <div class="stock__title">Список Акций</div>
      <div class="stock__button">
        <button class="stock__btn-create">
          <router-link to="/stock/create">
            <img src="@/assets/icon/plus.svg" alt="" />
            <span>Создать Акцию</span>
          </router-link>
        </button>
      </div>
      <div class="stock__content">
        <div class="stock__title-list">
          <div class="stock__name">Название</div>
          <div class="stock__date">Дата создания</div>
          <div class="stock__status">Статус</div>
        </div>
        <div class="stock__list">
          <div v-for="(stock, index) in stockList" :key="stock.id">
            <prewiew-stock v-model="stockList[index]" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PrewiewStock from "@/components/stock/PrewiewStock.vue";
export default {
  data() {
    return {};
  },
  components: {
    PrewiewStock,
  },
  computed: {
    ...mapGetters({
      stockList: "stock/getStock",
    }),
  },
  async mounted() {
    if (this.stockList.length <= 0)
      await this.$store.dispatch("stock/loadStock");
  },
};
</script>

<style lang="scss" scoped>
.stock {
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