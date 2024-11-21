const path = require("path");
const fs = require("fs");
const ws = require("windows-shortcuts");
const { SingleBar } = require("cli-progress");

module.exports = {
    name: "Shortcuts",
    description: "Cria atalhos para os arquivos encontrados, com progresso e logs.",

    run: async (files, baseFolder) => {
        const foundFolder = path.join(baseFolder, "Shortcuts");
        const logsFile = path.join(baseFolder, "Logs.txt");

        fs.rmSync(foundFolder, { recursive: true, force: true });
        fs.mkdirSync(foundFolder);

        const bar = new SingleBar({
            format: "{percentage}% [{bar}] | \x1b[38;5;211m{value}/{total} arquivos\x1b[0m | \x1b[38;5;123mETA: {etas}\x1b[0m",
            barCompleteChar: '=',
            barIncompleteChar: '-',
            hideCursor: true
        });
        bar.start(files.length, 0);

        let processedFiles = 0;
        const startTime = Date.now();

        for (const filePath of files) {
            try {
                const fileName = path.basename(filePath);
                const shortcutPath = path.join(foundFolder, `${fileName}.lnk`);

                await new Promise((resolve, reject) => {
                    ws.create(shortcutPath, { target: filePath }, (err) => {
                        if (err) {
                            fs.appendFileSync(logsFile, `Erro ao criar atalho @ ${filePath}: ${err}\n`);
                            return reject(err);
                        }
                        resolve();
                    });
                });
            } catch (err) {
                console.error(`Erro ao processar o arquivo ${filePath}: ${err.message}`);
            }

            processedFiles++;
            const elapsedTime = (Date.now() - startTime) / 1000;
            const avgTimePerFile = elapsedTime / processedFiles;

            const remainingFiles = files.length - processedFiles;
            const estimatedTimeLeft = avgTimePerFile * remainingFiles;

            const etaMinutes = Math.floor(estimatedTimeLeft / 60);
            const etaSeconds = Math.floor(estimatedTimeLeft % 60);
            bar.update(processedFiles, { etas: `${etaMinutes}m ${etaSeconds}s` });
        }

        bar.stop();
        console.log(`Atalhos criados com sucesso!`);
    }
};
