const os = require('os');
const fs = require('fs');
const path = require('path');

function getSystemInfo() {
    const cpus = os.cpus();
    return {
        osType: os.type(),
        totalMemory: os.totalmem(),
        freeMemory: os.freemem(),
        cpuDetails: {
            model: cpus[0].model,
            speed: cpus[0].speed,
            cores: cpus.length
        }
    };
}
function saveSystemInfoToFile() {
    const systemInfo = getSystemInfo();
    const logFilePath = path.join('system-info.txt');
    fs.writeFileSync(logFilePath, JSON.stringify(systemInfo, null, 2));
    console.log(`System information saved to ${logFilePath}`);
}
function displaySystemInfo() {
    console.log("System Information:", getSystemInfo());
}
displaySystemInfo();
saveSystemInfoToFile();