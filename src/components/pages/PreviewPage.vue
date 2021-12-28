<template>
  <div class="page__card">
    <div class="page__main">
      <div class="page__name-card">{{ this.name }}</div>
      <div class="page__date">{{ this.date }}</div>
      <div class="page__status">
        <div v-if="status == true">ВКЛ</div>
        <div v-if="status == 'false'">ВЫКЛ</div>
      </div>
    </div>
    <div class="page__btns">
      <div class="page__edit">
        <router-link :to="'/pages/edit/' + this.$attrs.modelValue.id">
          <img src="@/assets/icon/edit-hall.png" alt="" />
        </router-link>
      </div>
      <div @click="remove()" class="page__remove">
        <img src="@/assets/icon/remove-hall.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: this.$attrs.modelValue.customUa.name,
      date: this.$attrs.modelValue.date,
      status: this.$attrs.modelValue.toggle,
    };
  },
  methods: {
    remove() {
      this.$store.dispatch("customPage/remove", this.$attrs.modelValue);
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  &__card {
    position: relative;
    margin: 0 auto;
    height: 40px;
    display: flex;
  }

  &__main {
    min-width: 800px;
    height: 40px;
    background-color: rgb(231, 230, 230);
    display: flex;
    align-items: center;
    justify-content: space-around;
    border: solid 1px black;
  }

  &__name-card {
    display: flex;
    justify-content: flex-start;
    width: 140%;
    padding: 0px 10px;
    height: 100%;
    align-items: center;
    font-weight: 500;
    span {
      margin-left: 6px;
    }
  }

  &__date,
  &__status {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    padding: 0px 10px;
    border-left: solid 1px black;
    font-weight: 500;
  }

  &__status {
    width: 60%;
  }

  &__btns {
    display: flex;
  }

  &__edit,
  &__remove {
    cursor: pointer;
    margin: 0px 20px;
    img {
      width: 25px;
      height: 25px;
    }
  }
}
</style>