/* eslint-disable */
const NamingStrategy = require('typeorm-model-generator/dist/src/NamingStrategy');

// https://github.com/Kononnable/typeorm-model-generator/issues/171
NamingStrategy.entityName = function (entityName, entity) {
  // console.log(entityName, entity.database);
  return entityName;
};

// https://github.com/Kononnable/typeorm-model-generator/issues/236
NamingStrategy.fileName = function (fileName) {
  // https://docs.nestjs.com/openapi/cli-plugin
  // Add entity suffix for analysed in swagger plugin
  return `${fileName}.entity`;
};

module.exports = {
  ...NamingStrategy,
};
