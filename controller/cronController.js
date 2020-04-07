
const cron =  require('../database-adapter/schema/cron');
const genericFn = require('../database-adapter/generic/crudOps');
const Ajv = require('ajv');
const ajv = new Ajv({ removeAdditional: 'all' });
const apiSchemas = require('../apiSchemas');
const cronJob = require('../scripts')

exports.getCron = async function getCron(req,res){
    try{
        if (!ajv.validate(apiSchemas.getCron, req.query)) {
            res.status(400).send({ error: `Validation Error :${ajv.errors[0].message}` });
            return;
        }
        let query = req.query
        console.log('query',query)
        let response = await genericFn.list(cron,query)
        if(response.status && response.res){
            return res.status(200).send({response : response.res})
        }else{
            return res.status(404).send({error : 'Data Not Found'})
        }
    }catch(e){
        return res.status(500).send({Error : e})
    }
}

exports.postCron = async function postCron(req,res){
    if (!ajv.validate(apiSchemas.postCron, req.body)) {
        res.status(400).send({ error: `Validation Error :${ajv.errors[0].message}` });
        return;
    }
    try{
        let body = req.body
        let response = await genericFn.createOne(cron,body)
        if(response.status){
            await cronJob.restartCron()
            return res.status(200).send({response : 'cron created'})
        }
    }catch(e){
        return res.status(500).send({Error : e})
    }
}

exports.putCron = async function putCron(req,res){
    if(!req.params){
        res.status(400).send({ error: `Validation Error : Missing parameters` });
        return;
    }
    if (!ajv.validate(apiSchemas.postCron, req.body)) {
        res.status(400).send({ error: `Validation Error :${ajv.errors[0].message}` });
        return;
    }
    try{
        let where = req.body
        let { id } = req.params
        let response = await genericFn.updateOne(cron,{id},where)
        if(response.status && response.res){
            await cronJob.restartCron()
            return res.status(200).send({response : response.res})
        }else{
            return res.status(404).send({error : 'Data Not Found'})
        }
    }catch(e){
        return res.status(500).send({Error : e})
    }
}

exports.deleteCron = async function deleteCron(req,res){
    if(!req.query){
        res.status(400).send({ error: `Validation Error : Missing parameters` });
        return;
    }
    try{
        let { id } = req.params
        let response = await genericFn.updateOne(cron,{id},{status : 'INACTIVE'})
        if(response.status && response.res){
            await cronJob.restartCron()
            return res.status(200).send({response : response.res})
        }else{
            return res.status(404).send({error : 'Data Not Found'})
        }
    }catch(e){
        return res.status(500).send({Error : e})
    }
}