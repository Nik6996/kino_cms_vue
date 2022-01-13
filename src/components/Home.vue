<template>
  <div>
    <header-home />
    <div><router-view></router-view></div>
    <footer-home />
  </div>
</template>

<script>
import HeaderHome from "@/components/home/HeaderHome.vue";
import FooterHome from "@/components/home/FooterHome.vue";

export default {
  components: {
    HeaderHome,
    FooterHome,
  },
};
</script>

<style>
</style>