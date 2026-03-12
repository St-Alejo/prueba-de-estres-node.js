const { exec } = require("child_process");

exec("ps -eo pid,comm,%cpu --sort=-%cpu", (error, stdout) => {
    if (error) {
        console.error(error);
        return;
    }

    console.log("PID | PROCESO | CPU%");
    console.log(stdout);
});