#!/usr/bin/env node
const { program } = require('commander');
const fs = require('fs');
const dirname = process.cwd()
const create = require('../lib/create');

program
    .command('-c, --create <name>') 
    .alias('c') 
    .description('creates new cron')
    .action(async function (value) {
        await create(value);
    });

program
    .command('-d, --delete <name>') 
    .alias('d') 
    .description('deletes existing cron')
    .action(async function (value) {
        if (fs.existsSync(`${dirname}/scripts/${value}.js`)) {
            await fs.unlinkSync(`${dirname}/scripts/${value}.js`)
            if (fs.existsSync(`${dirname}/scripts/sync.json`)) {
                const array = await fs.readFileSync(`${dirname}/scripts/sync.json`,'utf-8')
                let array2 = JSON.parse(array)
                array2 = array2.filter(el => value != el.name)
                await fs.writeFileSync(`${dirname}/scripts/sync.json`,JSON.stringify(array2,null,4))
            }
            console.log('Script Deleted')
          }else{
            console.log('Script is not present')
          }
    });

program
    .command('-l, --list') 
    .alias('l') 
    .description('list existing cron')
    .action(async function () {
        if (fs.existsSync(`${dirname}/scripts/sync.json`)){
            const list = await fs.readFileSync(`${dirname}/scripts/sync.json`,'utf-8');
            console.log('Listing ->',JSON.parse(list))
        }else{
            console.log('No listing present on Local')
        }
    });
program.parse(process.argv);
