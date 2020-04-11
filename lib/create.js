const inquirer = require('inquirer');
const values = require('../lib/values');
const fs = require('fs');
const dirname = process.cwd()

const questions = [
    { type: 'list', name: 'status', message: 'Current status of cron', choices: values.status },
    { type: 'input', name: 'cronTab', message: 'Enter the cron tab', default: "* * * * *" },
    { type: 'confirm', name: 'file', message: 'Do you want to create the file', default: true },
    { type: 'confirm', name: 'sync', message: 'Do you want to create the sync file', default: true },
];

module.exports = async (value) => {
    if (fs.existsSync(`${dirname}/scripts/${value}.js`)){
        console.log('Script already exists')
        return
    }
    inquirer
        .prompt(questions)
        .then(async function (answers) { 
            await fs.writeFileSync(`${dirname}/scripts/${value}.js`,'module.exports =  async () => {}')
            if (!fs.existsSync(`${dirname}/scripts/sync.json`)) {
                const array = [{
                    "name" : value,
                    "status" : answers.status,
                    "cronTab" : answers.cronTab,
                    "script" : value
                }]
                await fs.writeFileSync(`${dirname}/scripts/sync.json`,JSON.stringify(array,null,4))
            }else{
                const array = await fs.readFileSync(`${dirname}/scripts/sync.json`,'utf-8')
                const array2 = JSON.parse(array)
                array2.push({
                    "name" : value,
                    "status" : answers.status,
                    "cronTab" : answers.cronTab,
                    "script" : value
                })
                await fs.writeFileSync(`${dirname}/scripts/sync.json`,JSON.stringify(array2,null,4))
            }
            return
        });
};