<template>
  <v-app>
    <h1>{{ motd }}</h1>
    <h4>Connection targets {{ backendUrl }}</h4>
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
  computed: {
    backendUrl: {
      get() {
        return process.env.VUE_APP_BACKEND_URL
      },
    },
    motd: {
      get() {
        return this.$store.state.motd
      },
    },
  },
  methods: {
    handleReceived(e) {
      this.$refs.logbox.write(e)
    },
  },
}
</script>

<style lang="scss" scoped>
h1,
h2,
h3,
h4,
h5,
h6 {
  text-align: center;
  width: 100%;
}
</style>
