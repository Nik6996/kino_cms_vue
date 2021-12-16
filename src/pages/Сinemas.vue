
<template>
  <div>
    <div class="main-cinemas"><router-view></router-view></div>
  </div>
</template>

<script>
import CinemasContent from "@/components/cinemas/CinemasContent.vue";

export default {
  data() {
    return {};
  },
  components: {
    CinemasContent,
  },
};
</script>

<style lang="scss" scoped>
.main-cinemas {
  margin-top: 100px;
}
</style>
