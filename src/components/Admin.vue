<template>
  <div>
    <header-kino />
    <sidebar />
    <div class="main"><router-view></router-view></div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar";
import HeaderKino from "@/components/HeaderKino";

export default {
  components: {
    Sidebar,
    HeaderKino,
  },
};
</script>

<style>
.main {
  margin-left: 250px;
}
</style>