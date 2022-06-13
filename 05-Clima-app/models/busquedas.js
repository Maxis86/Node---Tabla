const fs = require("fs");

const axios = require("axios");
const inquirer = require("inquirer");

require("dotenv").config();

class Busquedas {

  historial = [];
  dbPath = "./db/database.json";

  constructor() {
    this.leerDB();
  }

  get historialCapitalizado() {
    return this.historial.map((lugar) => {
      let palabras = lugar.split(" ");
      palabras = palabras.map((p) => p[0].toUpperCase() + p.substring(1));

      return palabras.join(" ");
    });
  }

  async ubicacion(provincia) {
    try {
      const intance = axios.create({
        baseURL: `https://apis.datos.gob.ar/georef/api/provincias?nombre=${provincia}`,
      });

      const resp = await intance.get();

      const datos = {
        lng: 0,
        lat: 0,
      };

      datos.lng = resp.data.provincias[0].centroide.lon;
      datos.lat = resp.data.provincias[0].centroide.lat;

      return datos;
    } catch (error) {}
  }

  async ciudad() {
    try {
      //Petición http
      const intance = axios.create({
        baseURL: `https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre`,
      });

      const resp = await intance.get();

      return resp.data.provincias.map((provincia) => ({
        id: provincia.id,
        nombre: provincia.nombre,
      }));
    } catch (error) {}
    //petición http
    return [];
  }

  async climaLugar(lat, lon) {
    try {
      const intance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: {
          lat: lat,
          lon: lon,
          appid: process.env.OPENWEATHER_KEY,
          units: "metric",
          lang: "es",
        },
      });

      const resp = await intance.get();

      return {
        desc: resp.data.weather[0].description,
        min: resp.data.main.temp_min,
        max: resp.data.main.temp_max,
        temp: resp.data.main.temp,
      };
    } catch (error) {
      console.log(error);
    }
  }

  agregarHistorial(lugar = "") {
    //Prevenir duplicados
    if (this.historial.includes(lugar.toLocaleLowerCase())) {
      return;
    }
    this.historial = this.historial.slice(0,5);
    this.historial.unshift(lugar.toLocaleLowerCase());

    //Grabar en BD
    this.guardarDB();
  }

  guardarDB() {
    const payload = {
      historial: this.historial,
    };

    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }

  leerDB() {
    if (!fs.existsSync(this.dbPath)) return;

    const info = fs.readFileSync(this.dbPath, { encoding: "utf-8" });
    const data = JSON.parse(info);

    this.historial = data.historial;
  }
}

module.exports = Busquedas;
