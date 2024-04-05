// Import individual database interaction modules
const Connect = require('./Connect');
const TestDB = require('./testdb');
const CreateTable = require('./Create');
const DeleteTable = require('./Delete');


module.exports = {
    Connect,
    TestDB,
    CreateTable,
    DeleteTable,
};