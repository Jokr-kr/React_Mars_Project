// Import individual database interaction modules
const Connect = require('./DB_Connect');
const TestDB = require('./testdb');
const CreateTable = require('./Create');
const DeleteTable = require('./Delete');


module.exports = {
    Connect,
    TestDB,
    CreateTable,
    DeleteTable,
};