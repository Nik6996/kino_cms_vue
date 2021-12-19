<template>
  <div>
    <div class="main-stock">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import StockContent from "@/components/stock/StockContent.vue";
export default {
  components: {
    StockContent,
  },
};
</script>

<style lang="scss" scoped>
.main-stock {
  margin-top: 100px;
}
</style>