<template>
  <div>
    <div class="users">
      <div class="users__content">
        <div class="users__header-list">
          <div class="users__block">{{ this.id }}</div>
          <div class="users__block">{{ this.dateRegistration }}</div>
          <div class="users__block">{{ this.date }}</div>
          <!--  -->
          <div class="users__block">{{ this.email }}</div>
          <div class="users__block">{{ this.phone }}</div>
          <div class="users__block">
            {{ this.name }} <br />
            {{ this.surname }}
          </div>
          <div class="users__block">{{ this.alias }}</div>
          <div class="users__block">{{ this.town }}</div>
        </div>
        <div class="users__edit">
          <router-link
            @click="userEdit()"
            :to="'/edit/user/' + this.$attrs.modelValue.id"
          >
            <img src="@/assets/icon/edit-hall.png" alt="" />
          </router-link>
        </div>
        <div @click="userRemove()" class="users__delete">
          <img src="@/assets/icon/remove-hall.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: this.$attrs.modelValue.name,
      surname: this.$attrs.modelValue.surname,
      alias: this.$attrs.modelValue.alias,
      email: this.$attrs.modelValue.email,
      phone: this.$attrs.modelValue.phone,
      date: this.$attrs.modelValue.date,
      //.toLocaleDateString()
      town: this.$attrs.modelValue.town,
      id: this.$attrs.modelValue.id,
      dateRegistration: this.$attrs.modelValue.dateRegistration,
      user: {
        email: this.$attrs.modelValue.email,
        password: this.$attrs.modelValue.password,
      },
    };
  },

  methods: {
    userEdit() {
      this.$store.dispatch("registration/logIn", this.user);
    },
    async userRemove() {
      await this.$store.dispatch("registration/logIn", this.user);
      await this.$store.dispatch("registration/removeUser", this.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.users {
  max-width: 1100px;

  &__content {
    display: flex;
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

    width: 137.25px;
    background-color: rgb(231, 231, 231);
    display: flex;
    align-items: center;
    height: 50px;
    flex-wrap: wrap;
  }

  &__town {
    border-left: solid 1px black;
    font-size: 15px;
    font-weight: 500;
    padding: 0px 20px;
    background-color: rgb(231, 231, 231);
    display: flex;
    align-items: center;
    height: 50px;
  }
  &__edit {
    cursor: pointer;
    margin: 0px 20px;
    img {
      width: 25px;
      height: 25px;
    }
  }
  &__delete {
    cursor: pointer;
    img {
      width: 20px;
      height: 25px;
    }
  }
}
</style>