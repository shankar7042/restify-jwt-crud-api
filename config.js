module.exports = {
    ENV: process.env.NODE_ENV || 'developement',
    PORT: process.env.PORT || 3000,
    URL: process.env.BASE_URL || 'http://localhost:3000',
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://shankar4171:shankar4171@cluster0-r6new.mongodb.net/test?retryWrites=true',
    JWT_SECRET: process.env.JWT_SECRET || 'secretkey' 
}