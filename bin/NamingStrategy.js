const NamingStrategy = require('typeorm-model-generator/dist/src/NamingStrategy');

// https://github.com/Kononnable/typeorm-model-generator/issues/171
NamingStrategy.entityName = function (entityName, entity) {
  // console.log(entityName, entity.database);
  return entityName;
}

module.exports = {
  ...NamingStrategy
}
