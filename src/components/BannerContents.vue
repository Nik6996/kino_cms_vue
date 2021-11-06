<template>
  <div>
    <top-header-banner />
    <background-banner />
    <main-news-stock />
  </div>
</template>

<script>
import TopHeaderBanner from "@/components/TopHeaderBanner.vue";
import BackgroundBanner from "@/components/BackgroundBanner.vue";
import MainNewsStock from "@/components/MainNewsStock.vue";

export default {
  components: {
    TopHeaderBanner,
    BackgroundBanner,
    MainNewsStock,
  },
};
</script>


  <style>
</style>
