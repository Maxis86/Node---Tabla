const argv = require('yargs')
                .option('b', {
                    alias: 'base',
                    type: 'number',
                    demandOption: true,
                    describe: 'Es la base de la tabla de multiplicar'
                })
                .option('l', {
                    alias: 'listar',
                    type: 'boolean',
                    default: 'false',
                    describe: 'Mostrar tabla por consola'
                })
                .option('h', {
                    alias: 'hasta',
                    type: 'number',
                    demandOption: true,
                    describe: 'Cantidad de multiplicaciones del número'
                })
                .check( (argv, options) => {
                    if ( isNaN(argv.b)){
                        throw 'La base tiene que ser un número';
                    }
                    if ( isNaN(argv.h)){
                        throw 'La cantidad de multiplicaciones tiene que ser un número';
                    }
                    return true;
                })
                .argv;

module.exports = argv;