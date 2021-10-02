<template>
  <div class="main-sidebar">
    <div class="sidebar">
      <nav class="mt-1">
        <ul
          class="nav nav-pills nav-sidebar flex-column"
          data-widget="treeview"
          role="menu"
        >
          <li @click="$router.push('/statistic')" class="nav-item">
            <i class="nav-icon fas fa-th"></i>
            <p>Статистика</p>
          </li>
          <li @click="$router.push('/')" class="nav-item">
            <i class="nav-icon fas fa-th"></i>
            <p>Баннера/Слайдеры</p>
          </li>
          <li @click="$router.push('/films')" class="nav-item">
            <i class="nav-icon fas fa-th"></i>
            <p>Фильмы</p>
          </li>
          <li @click="$router.push('/cinemas')" class="nav-item">
            <i class="nav-icon fas fa-th"></i>
            <p>Кинотеатры</p>
          </li>
          <li @click="$router.push('/news')" class="nav-item">
            <i class="nav-icon fas fa-th"></i>
            <p>Новости</p>
          </li>
          <li class="nav-item">
            <i class="nav-icon fas fa-th"></i>
            <p>Акции</p>
          </li>
          <li class="nav-item">
            <i class="nav-icon fas fa-th"></i>
            <p>Страницы</p>
          </li>
          <li class="nav-item">
            <i class="nav-icon fas fa-th"></i>
            <p>Пользователи</p>
          </li>
          <li class="nav-item">
            <i class="nav-icon fas fa-th"></i>
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

<style scoped>
.sidebar {
  border: solid 2px black;
  max-width: 200px;
  margin-top: 120px;
  margin-left: 20px;
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