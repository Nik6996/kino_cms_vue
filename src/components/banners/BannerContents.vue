<template>
  <div>
    <top-header-banner />
    <background-banner />
    <main-news-stock />
  </div>
</template>

<script>
import TopHeaderBanner from "@/components/banners/TopHeaderBanner.vue";
import BackgroundBanner from "@/components/banners/BackgroundBanner.vue";
import MainNewsStock from "@/components/banners/MainNewsStock.vue";

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
