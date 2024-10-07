/* eslint-disable */
const NodeHelper = require("node_helper");
const os = require("os");
const si = require("systeminformation");
const speedTest = require("speedtest-net");

module.exports = NodeHelper.create({
    start: function() {
        console.log("Starting node_helper for: " + this.name);
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "GET_SYSTEM_STATS") {
            this.getSystemStats();
        }
    },

    getSystemStats: function() {
        var self = this;

        // Obtener datos de memoria RAM
        const freeRam = Math.round(os.freemem() / 1024 / 1024); // MB
        const totalRam = Math.round(os.totalmem() / 1024 / 1024); // MB

        // Obtener datos de almacenamiento
        si.fsSize().then((drives) => {
            const freeStorage = Math.round(drives[0].available / 1024 / 1024 / 1024); // GB
            const totalStorage = Math.round(drives[0].size / 1024 / 1024 / 1024); // GB

            // Obtener velocidad de conexión a Internet
            speedTest({ acceptLicense: true }).then(result => {
                const downloadSpeed = Math.round(result.download.bandwidth / 125000); // Mbps
                const uploadSpeed = Math.round(result.upload.bandwidth / 125000); // Mbps

                // Enviar los datos al cliente
                self.sendSocketNotification("SYSTEM_STATS", {
                    ram: {
                        free: freeRam,
                        total: totalRam
                    },
                    storage: {
                        free: freeStorage,
                        total: totalStorage
                    },
                    speed: {
                        download: downloadSpeed,
                        upload: uploadSpeed
                    }
                });
            }).catch(error => {
                console.error("Error en la prueba de velocidad: ", error);
            });
        });
    }
});
