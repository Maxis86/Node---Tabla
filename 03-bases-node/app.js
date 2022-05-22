const {crearArchivo} = require('./helpers/multiplicar');
const argv = require ('./config/yargs')
require('colors');

console.clear();

// console.log(process.argv);
// console.log(argv);

// console.log('base: yargs', argv.base)

// const [ , , argumento3 = 'base=5'] = process.argv

// const [ , base = 5] =argumento3.split('=');

// console.log(base);

//const base = 4;

crearArchivo(argv.base, argv.listar, argv.hasta)
    .then (nombreArchivo => console.log (nombreArchivo.rainbow, 'creado'))
    .catch(err => console.log(err));
