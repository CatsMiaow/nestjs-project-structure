const NamingStrategy = require('typeorm-model-generator/dist/src/NamingStrategy');

/**
 * https://github.com/Kononnable/typeorm-model-generator/issues/171
 * https://github.com/Kononnable/typeorm-model-generator/blob/master/src/AbstractNamingStrategy.ts
 */
class CustomNamingStrategy extends NamingStrategy.default {
  entityName(entityName, entity) {
    // console.log(entityName, entity.Database);
    return super.entityName(entityName);
  }
}

exports.NamingStrategy = CustomNamingStrategy;
