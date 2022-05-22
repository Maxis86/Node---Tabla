const fs = require("fs");
const colors = require('colors');

const crearArchivo = (base = 5, listar = false, hasta=10) => {
  console.clear();

  let salida = "";

  if (listar === true) {
    console.log("========================================".green);
    console.log(`               TABLA DEL `.green, colors.blue(base));
    console.log("========================================".green);
  }

  for (let index = 1; index <= hasta; index++) {
    salida += `${base} x ${index} = ${base * index}\n`;
  }

  if (listar === true) {
    console.log(salida);
  }
  

  return new Promise((resolve, reject) => {
    try {
      fs.writeFileSync(`./salida/tabla-${base}.txt`, salida);
      resolve(`tabla-${base}.txt`);
      console.log("Archivo Creado");
    } catch (error) {
      reject(error);
    }
  });

  
};

module.exports = {
  crearArchivo,
};
