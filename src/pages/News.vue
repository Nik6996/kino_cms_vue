<template>
  <div>
    <div class="main-news">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NewsContent from "@/components/news/NewsContent.vue";
export default {
  components: {
    NewsContent,
  },
};
</script>

<style lang="scss" scoped>
.main-news {
  margin-top: 100px;
}
</style>