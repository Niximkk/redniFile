const path = require("path");
const fs = require("fs");
const { SingleBar } = require("cli-progress");

module.exports = {
    name: "TXT",
    description: "Cria um arquivo de texto com os caminhos.",

    run: async (files, baseFolder) => {
        const logsFile = path.join(baseFolder, "Logs.txt");
        const pathsFile = path.join(baseFolder, "Paths.txt");

        fs.writeFileSync(pathsFile, "");

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
                fs.appendFileSync(pathsFile, filePath + "\n");
            } catch (err) {
                fs.appendFileSync(logsFile, `Erro ao adicionar caminho ao arquivo Paths.txt @ ${filePath}: ${err}\n`);
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
        console.log(`Caminhos registrados com sucesso!`);
    }
};