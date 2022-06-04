const inquirer = require ('inquirer');
require('colors');

const preguntas = [
    {
        type:'list',
        name:'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear Tarea`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar Tareas`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar Tareas completas`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar Tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar Tarea`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`
            },
        ]
    }
];

const inquirerMenu = async () =>{
    console.clear();

    console.log("===========================".green);
    console.log("   Seleccione una opción  ".white);
    console.log("===========================\n".green);

    const {opcion} = await inquirer.prompt(preguntas);

    return opcion;
}

const leerInput = async (message) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if( value.length === 0 ){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ]

    const {desc} = await inquirer.prompt (question)
    return desc;
}

const inquirerPausa = async () => {

    const presioneEnter = [
        {
            type: 'input',
            name:'tecla',
            message: `Presione ${"ENTER".blue} para continuar\n `,
         
        }
    ]

    await inquirer.prompt(presioneEnter);

}

const listadoTareasBorrar = async ( tareas = [] ) => {

    const choices = tareas.map ( (tarea, i) => {

        const idx = `${i + 1}`.green;

        return {
            value:  tarea.id,
            name: `${idx} ${tarea.desc}`
        }

    })

    choices.unshift({
        value: '0',
        name: '0.'.green + 'Cancelar'
    })

    const preguntas =[
        {
            type: 'list',
            name: 'id',
            massge: 'borrar',
            choices
        }
    ]

    const {id} = await inquirer.prompt(preguntas);
    return id;
    // {
    //     value: tarea.id,
    //     name: `${'1.'.green} Listar Tareas pendientes`
    // },



} 

const mostrarListadoCheckList = async ( tareas = [] ) => {

    const choices = tareas.map ( (tarea, i) => {

        const idx = `${i + 1}`.green;

        return {
            value:  tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }

    })

    const pregunta =[
        {
            type: 'checkbox',
            name: 'ids',
            massge: 'Seleccione',
            choices
        }
    ]

    const {ids} = await inquirer.prompt(pregunta);
    return ids;

} 


const confirmar = async(message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const {ok} = await inquirer.prompt(question);
    return ok;
}

module.exports = {
    inquirerMenu,
    inquirerPausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList
}