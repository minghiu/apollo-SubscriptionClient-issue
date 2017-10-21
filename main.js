const GRAPHQL_ENDPOINT = 'wss://subscriptions.ap-northeast-1.graph.cool/v1/cj8x7ubz503n60189b0k306w6'

var logger = {
  log: (msg) => {
    console.log(msg)
    document.write(new Date() + ' ' + msg + '<br>')
  }
}

const client = new SubscriptionsTransportWs.SubscriptionClient(
  GRAPHQL_ENDPOINT, {
    reconnect: true,
    connectionCallback: (data) => { logger.log('connectionCallback') }
  })
client.onConnected((data) => logger.log('onConnected'))
client.onReconnected((data) => logger.log('onReconnected'))
client.onConnecting((data) => logger.log('onConnecting'))
client.onReconnecting((data) => logger.log('onReconnecting'))
client.onDisconnected((data) => logger.log('onDisconnected'))

client.request({
  query: `
  subscription {
    Message(filter: {
      mutation_in: [CREATED],
      node : {
        user: {
          id : "cj914wxvyfet00198zahcpghf"
        }
      }
    }) {
      node {
        id
        text
      }
    }
  }
  `
}).subscribe((data) => {
  logger.log(JSON.stringify(data))
}, console.error.bind(console))
