# Monitor de Procesos y Estrés de CPU con Node.js

## Descripción

Este proyecto consiste en una herramienta desarrollada en **Node.js** que permite:

* Listar todos los **procesos activos del sistema**
* Identificar el **PID (Process ID)** de cada proceso
* Mostrar el **uso de CPU y memoria**
* Visualizar información del **sistema y los núcleos del procesador**
* Generar **carga artificial en la CPU** para observar cómo el sistema distribuye el trabajo entre sus núcleos

El proyecto se ejecuta en **Linux (Ubuntu) dentro de una instancia AWS EC2**.

---

# Objetivo

Crear una herramienta que:

1. Liste los procesos activos del sistema
2. Identifique su **PID**
3. Muestre el uso de **CPU y memoria**
4. Permita **estresar el procesador** para observar el comportamiento del sistema
5. Analice cómo el sistema operativo distribuye la carga entre los **núcleos del CPU**

---

# Tecnologías utilizadas

* **Node.js**
* **Linux / Ubuntu**
* **AWS EC2**
* Módulos nativos de Node.js:

  * `os`
  * `child_process`

No se requieren librerías externas.

---

# Estructura del proyecto

```
cpu-monitor-node
│
├── stress.js
├── monitor_procesos.js
└── README.md
```

---

# Instalación

## 1. Conectarse a la instancia EC2

```bash
ssh -i "so.pem" ubuntu@IP_PUBLICA_EC2
```

---

## 2. Instalar Node.js

```bash
sudo apt update
sudo apt install nodejs npm -y
```

Verificar instalación:

```bash
node -v
npm -v
```

---

# Script 1: Generador de Estrés de CPU

Archivo:

```
stress.js
```

Este script crea **carga artificial en la CPU**, ejecutando cálculos infinitos en cada núcleo disponible.

Esto permite observar cómo el sistema operativo distribuye el trabajo entre los núcleos del procesador.

## Código

```javascript
const os = require("os");

console.log("Número de núcleos:", os.cpus().length);

function stressCPU() {
    while (true) {
        Math.sqrt(Math.random());
    }
}

for (let i = 0; i < os.cpus().length; i++) {
    stressCPU();
}
```

## Funcionamiento

1. Obtiene el número de núcleos disponibles mediante:

```
os.cpus()
```

2. Ejecuta un ciclo infinito con operaciones matemáticas:

```
Math.sqrt(Math.random())
```

3. Esto genera **uso continuo de CPU**.

---

# Script 2: Monitor de Procesos

Archivo:

```
monitor_procesos.js
```

Este script obtiene información del sistema y lista todos los procesos activos.

## Código

```javascript
const os = require("os");
const { exec } = require("child_process");

function mostrarInfoSistema() {

    console.log("====================================");
    console.log("        INFORMACIÓN DEL SISTEMA");
    console.log("====================================");

    console.log("Sistema Operativo:", os.type());
    console.log("Arquitectura:", os.arch());

    console.log("Memoria Total:",
        (os.totalmem() / 1024 / 1024 / 1024).toFixed(2), "GB");

    console.log("Memoria Libre:",
        (os.freemem() / 1024 / 1024 / 1024).toFixed(2), "GB");

    console.log("Número de núcleos CPU:", os.cpus().length);

    console.log("\nInformación de CPU:");

    os.cpus().forEach((cpu, index) => {
        console.log(`CPU ${index}: ${cpu.model}`);
    });

    console.log("\n");
}

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

mostrarInfoSistema();
listarProcesos();
```

---

# Funcionamiento del monitor

El programa realiza dos tareas principales.

## 1 Información del sistema

Obtiene datos usando el módulo **os**:

* Sistema operativo
* Arquitectura
* Memoria total
* Memoria libre
* Número de núcleos del CPU
* Modelo de cada CPU

Funciones utilizadas:

```
os.type()
os.arch()
os.totalmem()
os.freemem()
os.cpus()
```

---

## 2 Listado de procesos

Para obtener los procesos se utiliza el comando de Linux:

```
ps -eo pid,user,%cpu,%mem,time,command --sort=-%cpu
```

Este comando muestra:

| Campo   | Descripción                    |
| ------- | ------------------------------ |
| PID     | Identificador del proceso      |
| USER    | Usuario que ejecuta el proceso |
| %CPU    | Uso de CPU                     |
| %MEM    | Uso de memoria                 |
| TIME    | Tiempo total de CPU usado      |
| COMMAND | Comando ejecutado              |

Los procesos se ordenan por **mayor uso de CPU**.

---

# Ejecución del proyecto

## 1 Ejecutar el monitor de procesos

```
node monitor_procesos.js
```

---

## 2 Generar carga de CPU

En otra terminal ejecutar:

```
node stress.js
```

---

# Monitoreo del sistema

Para observar el comportamiento del sistema se pueden usar herramientas de Linux:

### Ver procesos activos

```
ps aux
```

### Monitorear CPU en tiempo real

```
top
```

o

```
htop
```

---

# Resultado esperado

Cuando se ejecuta **stress.js**:

* El uso de CPU aumenta significativamente
* El proceso aparece en el monitor con alto consumo

Cuando se ejecuta **monitor_procesos.js**:

* Se listan todos los procesos activos
* Se muestra su PID
* Se observa el uso de CPU y memoria

Esto permite analizar cómo el sistema operativo distribuye la carga entre los **núcleos del procesador**.

---

# Conclusión

Este proyecto demuestra cómo utilizar **Node.js y herramientas de Linux** para monitorear el sistema operativo y analizar el uso de recursos del CPU.

Además, permite observar cómo el sistema maneja procesos y distribuye carga entre múltiples núcleos cuando el procesador es sometido a estrés.

---

# Autor

Proyecto académico
Implementado en **Node.js sobre AWS EC2 (Ubuntu Linux)**
