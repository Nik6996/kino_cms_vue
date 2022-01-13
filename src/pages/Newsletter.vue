<template>
  <div><h1>NEWSLETTER</h1></div>
  <div class="mailing">
    <mailing-content />
  </div>
</template>

<script>
import MailingContent from "@/components/mailing/MailingContent";
export default {
  components: {
    MailingContent,
  },
};
</script>

<style lang="scss" scoped>
.mailing {
  margin-top: 100px;
}
</style>