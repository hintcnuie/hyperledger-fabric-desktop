const path = require('path');

const Datastore = require('nedb');

let chaincodeDB;
let configDB;
let blockDB;
let invokeDB;

export function getChaincodeDBSingleton() {
  if (!chaincodeDB) {
    chaincodeDB = new Datastore({ filename: path.join(__dirname, '../../resources/persistence/chaincode.db'), autoload: true });
  }
  return chaincodeDB;
}

export function getConfigDBSingleton() {
  if (!configDB) {
    configDB = new Datastore({ filename: path.join(__dirname, '../../resources/persistence/config.db'), autoload: true });
  }
  return configDB;
}

export function getBlockDBSingleton() {
  if (!blockDB) {
    blockDB = new Datastore({ filename: path.join(__dirname, '../../resources/persistence/block.db'), autoload: true });
  }
  return blockDB;
}

export function getInvokeDBSingleton() {
  if (!invokeDB) {
    invokeDB = new Datastore({ filename: path.join(__dirname, '../../resources/persistence/invoke.db'), autoload: true });
  }
  return invokeDB;
}
