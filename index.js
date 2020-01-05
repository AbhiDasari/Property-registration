'use strict';

const regnetcontract = require('./RegistrarChaincode.js');
const usernercontract=require('./userChaincode.js')
module.exports.contracts = [regnetcontract,usernercontract];
