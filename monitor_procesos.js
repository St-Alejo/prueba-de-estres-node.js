const os = require("os");
const { exec } = require("child_process");

// Información del sistema
function mostrarInfoSistema() {
    console.log("====================================");
    console.log("        INFORMACIÓN DEL SISTEMA");
    console.log("====================================");

    console.log("Sistema Operativo:", os.type());
    console.log("Arquitectura:", os.arch());
    console.log("Memoria Total:", (os.totalmem() / 1024 / 1024 / 1024).toFixed(2), "GB");
    console.log("Memoria Libre:", (os.freemem() / 1024 / 1024 / 1024).toFixed(2), "GB");
    console.log("Número de núcleos CPU:", os.cpus().length);

    console.log("\nUso por núcleo:");

    os.cpus().forEach((cpu, index) => {
        console.log(`CPU ${index}:`, cpu.model);
    });

    console.log("\n");
}

// Mostrar procesos activos
function listarProcesos() {
    console.log("====================================");
    console.log("        PROCESOS ACTIVOS");
    console.log("====================================\n");

    const comando = "ps -eo pid,user,%cpu,%mem,time,command --sort=-%cpu";

    exec(comando, (error, stdout, stderr) => {
        if (error) {
            console.error("Error ejecutando comando:", error);
            return;
        }

        console.log(stdout);
    });
}

// Ejecutar funciones
mostrarInfoSistema();
listarProcesos();