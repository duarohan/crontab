const rp = require('request-promise')

module.exports =  async function test(){
    console.log('Current Time', new Date())
    //keeps the server active
    console.log(await rp({uri: 'http://localhost:3000/ping', json: true}))
}