const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
const {
  inquirerMenu,
  inquirerPausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoCheckList
} = require("./helpers/inquirer");
const Tareas = require("./models/tareas");

require("colors");

const main = async () => {
  let opt = "";
  
  const tareas = new Tareas();

  const tareasDB = leerDB();

  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB);
  }

  //await inquirerPausa();

  do {
    //Imprimir el Menú
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        //crear opcion
        const desc = await leerInput("Descripción:");
        tareas.crearTarea(desc);
        break;
      case "2":
        tareas.listadoCompleto();
        //console.log(tareas.listadoArr);
        break;
      case "3":
        tareas.listarPendientesCompletas(true);
        break;
      case "4":
        tareas.listarPendientesCompletas(false);
        break;
      case "5":
        const ids = await mostrarListadoCheckList (tareas.listadoArr);
        tareas.toggleCompletadas (ids);
        break;
      case "6":
        const id = await listadoTareasBorrar ( tareas.listadoArr);
        
        if ( id!=='0') {
          const ok = await confirmar('Estas seguro?')
          if ( ok ) {
            tareas.borrarTarea(id);
            console.log('tarea borrada');
          }
        }
        
        
        break;
    }
    //
    guardarDB(tareas.listadoArr);

    console.log("\n");

    await inquirerPausa();
  } while (opt !== "0");
};

main();
