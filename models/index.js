const mongoose = require('mongoose');
const URI = process.env.MONGO_URL;
module.exports = {
    mongoose,
    connectDB: () => {
        return mongoose.connect(URI, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
    }
}