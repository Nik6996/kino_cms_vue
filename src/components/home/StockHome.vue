<template>
  <div>
    <div class="stock">
      <div class="stock__content">
        <div class="stock__title">Акции и скидки</div>
        <div class="stock__list">
          <div v-for="(item, index) in stockItems" :key="item.id">
            <preview-stock v-model="stockItems[index]" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PreviewStock from "@/components/home/stock/PreviewStock";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      stockItems: [],
    };
  },
  components: {
    PreviewStock,
  },
  computed: {
    ...mapGetters({
      stockList: "stock/getStock",
    }),
  },
  watch: {
    stockList: {
      handler(items) {
        items.forEach((item) => {
          if (item.toggle === "true") {
            this.stockItems.push(item);
          }
        });
      },
    },
  },
  async mounted() {
    await this.$store.dispatch("stock/loadStock");
  },
};
</script>

<style lang="scss" scoped>
.stock {
  width: 1300px;
  margin: 0 auto;
  background-color: rgb(37, 36, 36);
  &__content {
  }

  &__title {
  }

  &__list {
    display: flex;
  }
}
</style>