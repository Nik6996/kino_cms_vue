<template>
  <div>
    <div class="contacts">
      <div class="contacts__content">
        <div class="contacts__title">Контакты</div>
        <div class="contacts__list">
          <div v-for="(contact, index) in contacts.listCinema" :key="index">
            <preview-contacts v-model="contacts.listCinema[index]" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PreviewContacts from "@/components/home/info/PreviewContacts";
export default {
  data() {
    return {};
  },
  components: {
    PreviewContacts,
  },
  computed: {
    ...mapGetters({
      contacts: "contactsPage/getContacts",
    }),
  },
  async mounted() {
    await this.$store.dispatch("contactsPage/load");
  },
};
</script>

<style lang="scss" scoped>
.contacts {
  &__content {
  }

  &__title {
    display: flex;
    justify-content: center;
    font-size: 35px;
    font-weight: 500;
  }

  &__list {
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
  }
}
</style>