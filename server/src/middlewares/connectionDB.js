
const mongoose = require('mongoose');

async function connectDataBase(req = null, res = null, next = null){
    try {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true});
        console.log('Connected to MongoDB');
        try { next () } catch { };
        return mongoose;
    } catch (error) {
        console.error(error);
        return error;
    }
}

module.exports = connectDataBase;