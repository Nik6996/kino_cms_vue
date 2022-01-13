<template>
  <div>
    <mailing-sms />
    <mailing-email />
  </div>
</template>

<script>
import MailingSms from "@/components/mailing/MailingSms.vue";
import MailingEmail from "@/components/mailing/MailingEmail.vue";
export default {
  components: {
    MailingSms,
    MailingEmail,
  },
};
</script>

<style>
</style>