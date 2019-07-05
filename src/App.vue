<template>
  <v-app>
    <logbox ref="logbox" class="logbox ma-2"></logbox>
    <connector @received="handleReceived($event)"></connector>
  </v-app>
</template>

<script>
import Connector from '@/components/Connector'
import Logbox from '@/components/Logbox'

export default {
  name: 'App',
  components: {
    Connector,
    Logbox,
  },
  data() {
    return {
      //
    }
  },
  methods: {
    handleReceived(e) {
      this.$refs.logbox.write(e)
    },
  },
}
</script>
