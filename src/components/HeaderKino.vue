<template>
  <div>
    <nav class="main-header">
      <div class="header-logo">
        <a href=""><img src="" alt="LOGO" /></a>
      </div>
      <div class="right-bar">
        <div class="header-login">Администратор</div>
        <div class="header-btn">ON</div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style>
.header-logo {
  width: 200px;
  height: 80px;
  background: ghostwhite;
  border: solid 2px black;
  margin: 10px 80px;
}
.main-header {
  background-color: white;
  position: fixed;
  width: 100%;
  top: 0;
  margin-left: 0 !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black !important;
  z-index: 1034;
}
.right-bar {
  font-size: 30px;
  display: flex;
}
.header-btn {
  margin: 0px 20px;
}
</style>