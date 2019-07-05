<template>
  <v-card class="logbox-container">
    <v-card class="logs-display px-2 ma-2" flat>
      <p v-for="(log, index) in logs" :key="'log_' + index">
        {{ log }}
      </p>
    </v-card>
    <v-btn outline @click="clear()">clear</v-btn>
  </v-card>
</template>

<script>
const maxLimit = 25

export default {
  name: 'Logbox',

  data() {
    return {
      logs: [],
    }
  },

  methods: {
    write(message) {
      if (this.logs.length >= maxLimit) {
        this.logs.pop()
      }
      this.logs.unshift(message.toString())
    },
    clear() {
      this.logs = []
    },
  },
}
</script>

<style lang="scss" scoped>
.logs-display {
  border: solid 1px lightgrey;
  height: 480px;
  overflow-y: scroll;
}
</style>
