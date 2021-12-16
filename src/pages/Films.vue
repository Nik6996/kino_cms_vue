<template>
  <div>
    <div class="main-film"><router-view></router-view></div>
  </div>
</template>

<script>
import FilmsContent from "@/components/films/FilmsContent";

export default {
  components: {
    FilmsContent,
  },
};
</script>

<style lang="scss" scoped>
.main-film {
  margin: 100px;
}
</style>