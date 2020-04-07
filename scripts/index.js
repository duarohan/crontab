const cron = require("node-cron");
const genericFn = require('../database-adapter/generic/crudOps');
const cronSchedule = require('../database-adapter/schema/cron');

let crons = []

exports.startCron =  async ()=>{
            const cronsList = await getActiveCrons()
            crons = cronsList.res.map(el=>{
                cron.id = el.id
                return cron.schedule(el.cronTab,async() =>{
                    const script = require(`./${el.script}.js`)
                    await script()
                },{
                    scheduled: false
              })
            })

            crons.map(el=>{
                el.start()
            })
        }

exports.stopCron =  async ()=>{
    crons.map(el=>{
        el.destroy()
    })
}

exports.destroyCron =  async ()=>{
    crons.map(el=>{
        el.destroy()
    })
}

exports.restartCron =  async ()=>{
    this.destroyCron()
    this.startCron()
}

async function getActiveCrons(){
    const cronsList  = await genericFn.list(cronSchedule,{status : 'ACTIVE'})
    if(cronsList.status && cronsList.res){
        return cronsList
    }else{
        return []
    }
}