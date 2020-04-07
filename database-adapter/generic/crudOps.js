const mongoose = require('mongoose');

const options = {
  poolSize: 10,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

exports.connect = async function connect(dbURI) {
  await mongoose.connect(dbURI, options, (err) => {
    if (err) {
      console.error(`MongoDB connection error: ${err}`);
    } else {
      mongoose.connection.once('open', () => {
        console.info('MongoDB connected [%s]', options);
        mongoose.connection.on('connected', () => {
          console.info('MongoDB event connected');
        });

        mongoose.connection.on('disconnected', () => {
          console.warn('MongoDB event disconnected');
        });

        mongoose.connection.on('reconnected', () => {
          console.info('MongoDB event reconnected');
        });

        mongoose.connection.on('error', (error) => {
          console.error(`MongoDB event error: ${error}`);
        });
      });
    }
  });
};

exports.listOne = async function listOne(model, condition) {
  let res = null;
  res = await model.findOne(condition).lean()
    .catch((error) => {
      throw (error);
    });
  return { status: true, res };
};

exports.list = async function list(model, condition, operation = {}) {
  let {
    sort,
    limit,
    skip,
    select,
  } = operation;
  select = select || [];
  sort = sort || {};
  skip = skip || 0;
  limit = limit || 0;
  let res = null;
  res = await model.find(condition).lean()
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .select(select)
    .catch((error) => {
      throw (error);
    });
  return { status: true, res };
};

exports.createOne = async function createOne(Model, data) {
  let res = null;
  const newEntry = new Model(data);
  res = await newEntry.save()
    .catch((error) => {
      throw error;
    });
  return { status: true, res };
};

exports.createMany = async function createMany(model, data) {
  const bulkUpdateOps = data.map((doc) => ({ insertOne: { document: doc } }));
  await model.bulkWrite(bulkUpdateOps);
};

exports.updateOne = async function updateOne(model, condition, data) {
  let res = null;
  res = await model.findOneAndUpdate(condition, {
    $set: data,
  }, {
    new: true,
    upsert: true,
  }).lean()
    .catch((error) => {
      throw error;
    });
  return { status: true, res };
};

exports.updateMany = async function updateMany(model, condition, data) {
  let res = null;
  res = await model.update(condition, {
    $set: data,
  }, {
    mutli: true,
    new: true,
  }).lean()
    .catch((error) => {
      throw error;
    });
  return { status: true, res };
};

exports.removeOne = async function removeOne(model, condition) {
  let res = null;
  res = await model.findOneAndRemove(condition)
    .catch((error) => {
      throw error;
    });
  return { status: true, res };
};

exports.removeMany = async function removeMany(model, condition) {
  let res = null;
  res = await model.remove(condition)
    .catch((error) => {
      throw error;
    });
  return { status: true, res };
};

exports.aggregate = async function aggregate(model, condition) {
  let res = null;
  res = await model.aggregate(condition)
    .lean()
    .catch((error) => {
      throw error;
    });
  return { status: true, res };
};

exports.drop = function drop(model){
  return new Promise((resolve,reject)=>{
      model.collection.drop((err)=>{
          if (err){
              console.log('Error cleaning up:',err)
          }
          console.log('Data Cleaned up')
          resolve('true');
      });
  })
}

