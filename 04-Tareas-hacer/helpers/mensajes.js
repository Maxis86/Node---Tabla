const { __esModule } = require("uuid");

require("colors");

const mostrarMenu = () => {
  return new Promise((resolve) => {
    console.clear();

    console.log("===========================".green);
    console.log("   Seleccione una opción  ".green);
    console.log("===========================\n".green);

    console.log(`${"1".green}. Crear Tarea`);
    console.log(`${"2".green}. Listar Tareas`);
    console.log(`${"3".green}. Listar Tareas completas`);
    console.log(`${"4".green}. Listar Tareas pendientes`);
    console.log(`${"5".green}. Completar tarea(s)`);
    console.log(`${"6".green}. Borrar Tarea`);
    console.log(`${"0".green}. Salir \n`);

    //Preparo la interfaz para recibir una información del usurio
    const readline = require("readline").createInterface({
      input: process.stdin, // ya seba node que va a tener que pausar la interfaz de mi aplicación
      output: process.stdout, // mostrarle algún mensaje en consola
    });

    //Para mostrarle información al usuario con la pregunta
    readline.question("Seleccione una opción: ", (opt) => {
      readline.close();
      resolve(opt);
    });
  });
};

const pausa = () => {
  return new Promise((resolve) => {
    const readline = require("readline").createInterface({
      input: process.stdin, // ya seba node que va a tener que pausar la interfaz de mi aplicación
      output: process.stdout, // mostrarle algún mensaje en consola
    });

    //Para mostrarle información al usuario con la pregunta
    readline.question(
      `\nPresione ${"ENTER".green} para continuar\n `,
      (opt) => {
        readline.close();
        resolve();
      }
    );
  });
};

module.exports = {
  mostrarMenu,
  pausa,
};
