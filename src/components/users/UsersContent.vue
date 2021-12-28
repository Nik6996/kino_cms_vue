<template>
  <div>
    <div class="users">
      <div class="users__header">
        <div class="users__title"><span>Пользователи</span></div>
        <div class="users__search">
          <input v-model="search" placeholder=" Поиск..." type="text" />
        </div>
      </div>
      <div class="users__content">
        <div class="users__header-list">
          <div class="users__block">ID</div>
          <div class="users__block">Дата регистрации</div>
          <div class="users__block">День рождения</div>
          <div class="users__block">Email</div>
          <div class="users__block">Телефон</div>
          <div class="users__block">ФИО</div>
          <div class="users__block">Псевдоним</div>
          <div class="users__block">Город</div>
        </div>
        <div class="users__list">
          <div v-for="(user, index) in returnSearchUser" :key="user.id">
            <preview-user v-model="returnSearchUser[index]" />
          </div>
        </div>
        <div class="users__wrapper">
          <div
            class="users__page"
            :class="{ 'current-page': page === pageNumber }"
            v-for="page in totalPage"
            :key="page"
            @click="chengePage(page)"
          >
            {{ page }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PreviewUser from "@/components/users/PreviewUser.vue";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      users: [],
      search: "",
      pageNumber: 1,
      limitUser: 2,
      totalPage: 0,
    };
  },
  components: {
    PreviewUser,
  },
  computed: {
    ...mapGetters({
      usersStore: "registration/getUsers",
    }),
    returnSearchUser() {
      return this.usersStore.filter(
        (user) =>
          user?.name.toLowerCase().includes(this.search.toLowerCase()) ||
          user?.alias.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  watch: {
    usersStore: {
      handler(userStore) {
        this.users = userStore;
        this.totalPage = Math.ceil(userStore.length / this.limitUser);
      },
    },
  },
  mounted() {
    if (!this.userStore) {
      this.$store.dispatch("registration/load");
    }
  },
  methods: {
    chengePage(pageNumber) {
      this.pageNumber = pageNumber;
    },
  },
};
</script>

<style lang="scss" scoped>
.users {
  max-width: 1100px;
  margin: 140px auto;
  &__header {
    display: flex;
    justify-content: flex-end;
  }

  &__title {
    font-size: 23px;
    font-weight: 500;
    margin-right: 100px;
  }

  &__search {
    height: 30px;
    display: flex;
    margin-left: 200px;
  }

  &__content {
    margin-top: 30px;
  }
  &__header-list {
    border: solid 1px black;
    padding: 0;
    display: flex;
    justify-content: space-between;
  }
  &__block {
    border-left: solid 1px black;
    padding-left: 5px;
    font-size: 15px;
    font-weight: 500;
    width: 100%;
    background-color: rgb(184, 183, 183);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
  }

  &__wrapper {
    margin-top: 40px;
    display: flex;
    justify-content: center;
  }
  &__page {
    cursor: pointer;
    border: solid black 1px;
    font-weight: 500;
    margin-left: 5px;
    width: 16px;
    display: flex;
    justify-content: center;
  }
}
.current-page {
  border: solid rgb(0, 82, 4) 2px;
}
</style>