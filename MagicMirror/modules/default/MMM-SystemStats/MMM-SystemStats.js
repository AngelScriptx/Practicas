/* eslint-disable */

Module.register("MMM-SystemStats", {
  defaults: {
      updateInterval: 60000, // Actualización cada minuto
  },
  getStyles: function() {
    return ["MMM-SystemStats.css"]; 
  },
  start: function() {
      this.systemData = {};
      this.getData();
      this.scheduleUpdate();
  },

  getDom: function() {
      var wrapper = document.createElement("div");
          wrapper.className = "grid"
      if (!this.systemData.ram || !this.systemData.storage || !this.systemData.speed) {
          wrapper.innerHTML = "Loading system stats...";
          return wrapper;
      }

      // Mostrar los datos de memoria RAM, almacenamiento y velocidad de conexión
      wrapper.innerHTML = `
          <div id="ram_libre"><strong>RAM Libre:</strong> ${this.systemData.ram.free} MB</div>
          <div id="ram_total"><strong>RAM Total:</strong> ${this.systemData.ram.total} MB</div>
          <div id="almacenamiento_libre"><strong>Almacenamiento Libre:</strong> ${this.systemData.storage.free} GB</div>
          <div id="almacenamiento_total"><strong>Almacenamiento Total:</strong> ${this.systemData.storage.total} GB</div>
          <div id="velocidad_descarga"><strong>Velocidad de Descarga:</strong> ${this.systemData.speed.download} Mbps</div>
          <div id="velocidad_subida"><strong>Velocidad de Subida:</strong> ${this.systemData.speed.upload} Mbps</div>
      `;

      return wrapper;
	},

  getData: function() {
      // Enviar el socket al servidor para obtener datos
      this.sendSocketNotification("GET_SYSTEM_STATS");
  },

  scheduleUpdate: function() {
      var self = this;
      setInterval(function() {
          self.getData();
      }, this.config.updateInterval);
  },

  socketNotificationReceived: function(notification, payload) {
      if (notification === "SYSTEM_STATS") {
          this.systemData = payload;
          this.updateDom();
      }
  },
});
