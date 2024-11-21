# 📄 **redniFile** - File Scanner & Modular CLI

**redniFile** é uma ferramenta de linha de comando simples e poderosa para localizar arquivos no seu PC e aplicar ações customizáveis usando módulos. 🚀

## 🔨 **Instalação**
```
git clone https://github.com/Niximkk/redniFile
npm install
node .
```

## ⚙️ **Como funciona**
1. **Buscar arquivos:**
   - Execute `node .` no terminal.
   - Insira as extensões de arquivos desejadas (ex.: `pdf, docx, exe`).
   - O programa buscará os arquivos em todas as unidades do seu computador.

2. **Executar módulos:**
   - Após encontrar os arquivos, o programa listará os módulos disponíveis na pasta `./modules`.
   - Escolha os módulos que deseja executar (ex.: `Shortcuts`, que cria atalhos no Windows para os arquivos encontrados).

3. **Resultados e logs:**
   - Os resultados e eventuais erros são registrados no arquivo `Logs.txt`.

## 🛠️ **Criação de módulos**
- Cada módulo é um arquivo `.js` na pasta `./modules`.
- Os módulos devem exportar:
  ```javascript
  module.exports = {
      name: "NomeDoModulo",
      description: "Descrição do que o módulo faz.",
      run: async (files, baseFolder) => {
          // Lógica do módulo
      }
  };
  ```

Exemplo de módulo: **Shortcuts** cria atalhos no Windows para cada arquivo encontrado.

## 🌟 **Principais Recursos**
- Pesquisa eficiente de arquivos por extensão.
- Suporte modular para ações personalizadas.
- Logs detalhados para monitorar resultados.
- Interface simples e intuitiva.

## 🖥️ **Requisitos**
- Node.js instalado.
- Sistema operacional Windows (para módulos específicos, como atalhos).

--- 
Copyright (C) 2024 Nix

This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.

<p align="center">
  <a href="https://emoji.gg/emoji/5349-hellokittybyebye">
    <img src="https://cdn3.emoji.gg/emojis/5349-hellokittybyebye.png" width="128px" height="128px" alt="HelloKittyByeBye">
  </a>
</p>