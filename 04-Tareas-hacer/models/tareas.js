const Tarea = require("./tarea");

class Tareas {
  _listado = {};

  get listadoArr() {
    const listado = [];

    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });
    return listado;
  }

  constructor() {
    this._listado = {};
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((element) => {
      //console.log(element)
      this._listado[element.id] = element;
    });
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);

    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    console.log();
    this.listadoArr.forEach((element, index) => {
      let indice = `${index + 1}`.green;

      if (element.completadoEn === null) {
        console.log(`${indice}. ${element.desc} :: ${"Pendiente".red}`);
      } else {
        console.log(`${indice}. ${element.desc} :: ${"Completado".green}`);
      }
    });
  }

  listarPendientesCompletas(completadas = true) {
    console.log();

    if (completadas) {
      let indice = 1;

      this.listadoArr.forEach((element) => {
        if (element.completadoEn !== null) {
          console.log(`${indice}. `.green + `${element.desc} ::` + `${element.completadoEn}`.green);
          indice = indice + 1;
        }
      });
    } else {
      let indice = 1;

      this.listadoArr.forEach((element) => {
        if (element.completadoEn === null) {
          console.log(`${indice}. `.green + `${element.desc} :: ${"Pendiente".red}`);
          indice = indice + 1;
        }
      });
    }
  }

  borrarTarea ( id= '' ) {

    if ( this._listado[id]) {
      delete this._listado[id];
    }

  }

  toggleCompletadas( ids = [] ) {

    ids.forEach( id => {

        const tarea = this._listado[id];
        if ( !tarea.completadoEn ) {
            tarea.completadoEn = new Date().toISOString()
        }

    });

    this.listadoArr.forEach( tarea => {

        if ( !ids.includes(tarea.id) ) {
            this._listado[tarea.id].completadoEn = null;
        }

    });


}

}

module.exports = Tareas;
