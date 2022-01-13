<template>
  <div>
    <div class="mail">
      <div class="mail__main">
        <input v-model="toggle" type="checkbox" />
        <div class="mail__name">{{ name }}</div>
      </div>

      <div @click="remove()" class="mail__delete">Удалить</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: this.$attrs.modelValue.name,
      id: this.$attrs.modelValue.id,
      toggle: false,
    };
  },
  watch: {
    toggle: {
      handler(toggle) {
        this.$attrs.modelValue.toggle = toggle;
      },
    },
  },
  async mounted() {
    await this.$store.dispatch("mailing/load");
  },
  methods: {
    remove() {
      this.$store.dispatch("mailing/remove", this.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.mail {
  display: flex;
  justify-content: space-between;
  &__main {
    display: flex;
    align-items: center;
    input {
      margin-right: 5px;
    }
  }
  &__name {
    font-weight: 500;
  }

  &__delete {
    cursor: pointer;
    color: red;
  }
  &__delete:hover {
    transform: scale(1.1);
  }
}
</style>