<template>
  <div>
    <div class="banner-main"><banner-contents /></div>
  </div>
</template>

<script>
import BannerContents from "@/components/banners/BannerContents";

export default {
  components: {
    BannerContents,
  },
};
</script>

<style lang="scss" scoped>
.banner-main {
  margin: 100px;
}
</style>