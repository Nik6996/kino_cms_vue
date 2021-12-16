<template>
  <div class="main-sidebar">
    <div class="sidebar">
      <nav class="mt-1">
        <ul class="nav nav-pills nav-sidebar flex-column">
          <li @click="$router.push('/statistic')" class="nav-item">
            <p>Статистика</p>
          </li>
          <li @click="$router.push('/')" active class="nav-item">
            <p>Баннера/Слайдеры</p>
          </li>
          <li @click="$router.push('/films')" class="nav-item">
            <p>Фильмы</p>
          </li>
          <li @click="$router.push('/cinemas')" class="nav-item">
            <p>Кинотеатры</p>
          </li>
          <li @click="$router.push('/news')" class="nav-item">
            <p>Новости</p>
          </li>
          <li @click="$router.push('/stock')" class="nav-item">
            <p>Акции</p>
          </li>
          <li @click="$router.push('/pages')" class="nav-item">
            <p>Страницы</p>
          </li>
          <li @click="$router.push('/users')" class="nav-item">
            <p>Пользователи</p>
          </li>
          <li @click="$router.push('/newsletter')" class="nav-item">
            <p>Рассылка</p>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.sidebar {
  border: solid 2px black;
  max-width: 200px;
  margin-top: 120px;
  margin-left: 20px;
  position: fixed;
  height: 400px;
}

.nav-pills .nav-link {
  color: black;
  padding: 4px;
}
.nav-pills .nav-link:hover {
  background: gray;
  color: black;
}
.nav-item {
  cursor: pointer;
}
</style>