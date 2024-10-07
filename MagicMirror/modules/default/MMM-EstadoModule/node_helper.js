/* eslint-disable */
const NodeHelper = require("node_helper");
const fetch = require("node-fetch"); // Para hacer la solicitud HTTP

module.exports = NodeHelper.create({
    start: function() {
        console.log("Iniciando node_helper para: MMM-EstadoModule");
    },

    // Recibe notificaciones del cliente (MMM-EstadoModule.js)
    socketNotificationReceived: function(notification, payload) {
        if (notification === "GET_ESTADOS") {
            console.log("node_helper: Recibido GET_ESTADOS con URL:", payload.url);
            // Llama a la función que realiza la solicitud a la URL
            this.getEstadosFromUrl(payload.url);
        }
    },

    // Función para obtener los estados desde la URL y enviar la respuesta
    async getEstadosFromUrl(url) {
        try {
            const response = await fetch(url); // Realiza la solicitud HTTP
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }

            const data = await response.json(); // Transforma la respuesta a JSON
            console.log(`node_helper: Data recibida ${JSON.stringify(data)}`);

            // Enviar los datos al cliente (MMM-EstadoModule.js)
            this.sendSocketNotification("ESTADOS_DATA", {
                estado1: data.id,
                estado2: data.id,
                estado3: data.id
            });
        } catch (error) {
            console.error("Error al obtener los estados desde la URL:", error);
        }
    }
});
