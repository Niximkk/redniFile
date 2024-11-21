const fs = require("fs");
const path = require("path");

const modulesPath = path.join(__dirname, "modules");
const logsFile = path.join(__dirname, "Logs.txt");

async function scanComputer() {
    const baseFolder = __dirname;

    const extensionsInput = await askUser("Digite as extensões de arquivo separadas por vírgulas (ex: docx,pdf): ");
    const targetExtensions = extensionsInput.split(",").map(ext => ext.trim().toLowerCase());

    fs.writeFileSync(logsFile, "");

    console.log("Calculando arquivos...");

    const drives = getDrives();
    const allFiles = [];

    for (const drive of drives) {
        await countFiles(drive, targetExtensions, allFiles);
    }

    if (allFiles.length === 0) {
        console.log("Nenhum arquivo encontrado com as extensões especificadas.");
        return;
    }

    console.log(`Total de arquivos encontrados: \x1b[38;5;62m${allFiles.length}\x1b[0m.`);
    console.log(`Extensões: \x1b[38;5;62m${targetExtensions.join("\x1b[0m.,\x1b[38;5;62m ")}\x1b[0m.`);

    const modules = loadModules();
    for (const module of modules) {
        const runModule = await askUser(`Deseja rodar ${module.name}? [s/N] `);
        if (runModule.toLowerCase() === "s") {
            await module.run(allFiles, baseFolder);
        }
    }

    console.log("Processamento concluído!");
}

async function countFiles(dir, targetExtensions, allFiles) {
    try {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);

            if (entry.isDirectory()) {
                await countFiles(fullPath, targetExtensions, allFiles);
            } else if (entry.isFile()) {
                const ext = path.extname(entry.name).toLowerCase().substring(1);
                if (targetExtensions.includes(ext)) {
                    allFiles.push(fullPath);
                }
            }
        }
    } catch (err) {}
}

function loadModules() {
    const modules = [];
    const files = fs.readdirSync(modulesPath);

    for (const file of files) {
        const modulePath = path.join(modulesPath, file);
        if (file.endsWith(".js")) {
            const mod = require(modulePath);
            modules.push(mod);
        }
    }

    return modules;
}

async function askUser(question) {
    const rl = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => rl.question(question, (answer) => {
        rl.close();
        resolve(answer);
    }));
}

function getDrives() {
    const drives = [];
    for (let i = 65; i <= 90; i++) {
        const drive = `${String.fromCharCode(i)}:\\`;
        if (fs.existsSync(drive)) drives.push(drive);
    }
    return drives;
}

console.clear();
console.log(`\x1b[31m
 __   ___  __          ___         ___ 
|__) |__  |  \\ |\\ | | |__  | |    |__  
|  \\ |___ |__/ | \\| | |    | |___ |___  v0.3 Modular\x1b[0m
`);

scanComputer().catch((err) => console.error(err));
