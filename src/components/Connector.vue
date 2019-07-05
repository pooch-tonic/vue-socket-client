<template>
  <v-btn :color="color" @click="executeAction(action)">{{ action }}</v-btn>
</template>

<script>
export default {
  name: 'Connector',

  data() {
    return {
      connected: false,
    }
  },

  computed: {
    action: {
      get() {
        return this.connected === true ? 'disconnect' : 'connect'
      },
    },
    color: {
      get() {
        return this.connected === true ? 'error' : 'success'
      },
    },
  },

  methods: {
    handleReceive(e) {
      this.$emit('received', e)
    },
    executeAction(action) {
      if (action === 'connect') {
        this.handleReceive('connect')
      } else if (action === 'disconnect') {
        this.handleReceive('disconnect')
      } else {
        console.error('executeAction@Connector : undefined action')
      }
    },
  },

  sockets: {
    connect() {
      this.sockets.subscribe('request', data => {
        this.handleReceive(data)
      })
      this.connected = true
      console.log(
        'You are now connected to: ' + process.env.VUE_APP_BACKEND_URL
      )
    },
    disconnect() {
      this.handleReceive(
        '[' +
          new Date().toTimeString().slice(0, 8) +
          '] You are now disconnected.'
      )
      this.sockets.unsubscribe('request')
    },
  },
}
</script>
