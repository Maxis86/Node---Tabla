const {
  inquirerMenu,
  inquirerPausa,
  leerInput,
  listadoLugares,
} = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async () => {
  const busquedas = new Busquedas();

  let opc = "";

  do {
    opc = await inquirerMenu();

    switch (opc) {
      case 1:
        //Mostrar mensaje
        const lugares = await busquedas.ciudad();
        //Selecciona el lugar
        const id = await listadoLugares(lugares);
        if (id !== "0") {
          const lugarSel = lugares.find((l) => l.id === id);

          busquedas.agregarHistorial( lugarSel.nombre)
          const ubicacion = await busquedas.ubicacion(lugarSel.nombre);

          // Datos del clima
          const clima = await busquedas.climaLugar(
            ubicacion.lat,
            ubicacion.lng
          );

          //Mostrar resultados
          console.clear();
          console.log("\n Información de la ciudad\n".green);
          console.log(`Ciudad: ${lugarSel.nombre}`.green);
          console.log(`Lat: ${ubicacion.lat}`);
          console.log(`Long: ${ubicacion.lng}`);
          console.log(`Temperatura: ${clima.temp}°`);
          console.log(`Mínima: ${clima.min}°`);
          console.log(`Máxima: ${clima.max}°`);
          console.log(`Como está el clima: ${clima.desc} `);

          break;
        }

      case 2:
        busquedas.historialCapitalizado.forEach ((lugar,i) => {
          const idx = `${ i + 1 }.`.green;
          console.log(`${idx} ${lugar}`)
        })
        break;

      default:
        break;
    }

    if (opc !== 0) {
      await inquirerPausa();
    }
  } while (opc !== 0);

  console.log("\n");
  console.log("Fin de la aplicación");
};

main();
