<template>
  <div class="connector-container">
    <v-btn :color="color" @click="executeAction(action)">{{ action }}</v-btn>
    <v-btn color="info" @click="startOperation()">Start operation</v-btn>
  </div>
</template>

<script>
export default {
  name: 'Connector',

  data() {
    return {
      connected: false,
      operating: false,
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
    writeToLogs(e) {
      this.$emit('write', e)
    },
    executeAction(action) {
      if (action === 'connect') {
        this.$socket.connect()
      } else if (action === 'disconnect') {
        this.$socket.disconnect()
      } else {
        console.error('executeAction@Connector : undefined action')
      }
    },
    startOperation() {
      this.sockets.subscribe('finalize-operation', data => {
        // TODO
      })
      this.operating = true
      this.$socket.emit('start-operation')
    },
    endOperation() {
      this.sockets.unsubscribe('finalize-operation')
      this.operating = false
      this.writeToLogs(
        '[' + new Date().toTimeString().slice(0, 8) + '] Operation completed.'
      )
      this.$socket.emit('end-operation')
    },
  },

  sockets: {
    connect() {
      this.sockets.subscribe('message', data => {
        this.writeToLogs(data)
      })
      this.connected = true
      console.log(
        'You are now connected to: ' + process.env.VUE_APP_BACKEND_URL
      )
    },
    disconnect() {
      this.writeToLogs(
        '[' +
          new Date().toTimeString().slice(0, 8) +
          '] You are now disconnected.'
      )
      this.connected = false
      this.sockets.unsubscribe('message')
    },
  },
}
</script>
