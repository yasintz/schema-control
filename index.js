var isObjectLodash = require("lodash.isobject");
var isEqual = require("lodash.isequal");
var mapValues = require("lodash.mapvalues");
var isArray = Array.isArray;
var isObject = data => isObjectLodash(data) && !isArray(data);

function mapValuesDeep(valMain, schema) {
  if (isArray(valMain)) {
    if (isArray(schema))
      if (SchemaControl(valMain, schema)) return schema;
      else return false;
    else return false;
  } else if (isObject(valMain)) {
    return mapValues(valMain, (valChild, keyChild) => {
      let schemaControl = schema[keyChild];
      if (schemaControl === undefined) {
        return false;
      } else return mapValuesDeep(valChild, schemaControl);
    });
  } else {
    if (typeof valMain === schema) return schema;
    else return false;
  }
}

function SchemaControl(data, schema) {
  if (isArray(schema) && isArray(data)) {
    if (schema.length === 0) return true;
    let typeOfArray = data.map((item, index) => {
      return mapValuesDeep(item, schema[0]);
    });
    let isCorrect = typeOfArray
      .map(typeOfItem => isEqual(typeOfItem, schema[0]))
      .find(bool => !bool);
    return typeof isCorrect === "undefined";
  } else if (isObject(data) && isObject(schema)) {
    if (Object.keys(schema).length === 0) {
      return true;
    }
    let typeOfObject = mapValuesDeep(data, schema);
    let isCorrect = isEqual(typeOfObject, schema);
    return isCorrect;
  }
  return typeof data === schema;
}
function MultiSchemaControl (data,schema){
if(isArray(schema) && schema.length >1){
  if(isArray(data)){
    let multiControl = data.map(item=>{
      let schemaMap= schema.map(types=>SchemaControl(item,types))
      return schemaMap.includes(true)
    })
    return multiControl.filter(c=>c).length === data.length
  }
  let multiControl = schema.map(types=>SchemaControl(data,types))
  return multiControl.includes(true)
}
else return SchemaControl(data,schema)
}
module.exports = MultiSchemaControl;
