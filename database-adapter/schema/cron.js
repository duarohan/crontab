const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const counters = require('./counters')

const cronSchema = new Schema
(   
    { 
        id : Number,
        name : String,
        status :  { 
            type: String, 
            enum : ['ACTIVE', 'INACTIVE'], 
            default: 'ACTIVE' 
        }, 
        lastRun : Date,
        cronTab : String,
        script : String,
    },
    {
    strict: false,
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

cronSchema.pre('save', async function(next) {
    let count = await counters.findOneAndUpdate({collection_name: 'crons'}, {$inc: { seq: 1} });
    this.id = count.seq;
    next()
});


module.exports = mongoose.models && mongoose.models.crons ? mongoose.models.crons : mongoose.model('crons', cronSchema);