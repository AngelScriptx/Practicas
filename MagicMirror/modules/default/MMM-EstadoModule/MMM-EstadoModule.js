/* eslint-disable */
Module.register("MMM-EstadoModule", {
    // Definir las propiedades por defecto del módulo
    defaults: {
        url: "",             // URL para traer los estados
        name: "EstadoModule",// Nombre de la instancia del módulo
        updateInterval: 60000 // Intervalo de actualización en milisegundos (cada minuto)
    },
    getStyles: function() {
        return ["MMM-EstadoModule.css"]; 
      },
    start: function() {
        console.log(`MMM-EstadoModule: Iniciando con la URL: ${this.config.url}`);
        this.estado1 = null;
        this.estado2 = null;
        this.estado3 = null;
        this.getData(); // Llamar a la función que obtiene los datos
        this.scheduleUpdate(); // Programar la actualización periódica
    },

    getDom: function() {
        var wrapper = document.createElement("div");
        wrapper.className = 'containStats'
        wrapper.innerHTML = `<strong>${this.config.name}`
        // Si los datos aún no están disponibles, mostrar "Cargando"
        if (this.estado1 === null || this.estado2 === null || this.estado3 === null) {
            wrapper.innerHTML = "Cargando estados...";
            return wrapper;
        }

        // Mostrar los tres estados recibidos desde la URL
        wrapper.innerHTML += `
            <div> Mode:</strong> <br>${this.estado1}</div>
            <div> Status :</strong> <br>${this.estado2}</div>
            <div> Internet:</strong> <br>${this.estado3}</div>
        `;

        return wrapper;
    },

    // Programar la actualización de los datos
    scheduleUpdate: function() {
        var self = this;
        setInterval(function() {
            self.getData();
        }, this.config.updateInterval);
    },

    // Función para solicitar los datos del servidor
    getData: function() {
        console.log("MMM-EstadoModule: Solicitando datos al servidor");
        this.sendSocketNotification("GET_ESTADOS", { url: this.config.url });
    },

    // Recibir notificaciones del servidor con los datos
    socketNotificationReceived: function(notification, payload) {
        if (notification === "ESTADOS_DATA") {
            console.log("MMM-EstadoModule: Recibidos datos:", payload);
            this.estado1 = payload.estado1;
            this.estado2 = payload.estado2;
            this.estado3 = payload.estado3;
            this.updateDom(); 
        }
    }
});
