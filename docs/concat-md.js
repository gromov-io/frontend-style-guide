import concatMd, { concatMdSync } from "concat-md";
import path from "path";
import fs from "fs";

const resultMd = concatMdSync("./docs/parts", {
  toc: false, 
  sorter: (a, b) => {
    // Извлекаем номер из начала имени файла (например, "1" из "1-assistent.md")
    const getNumber = (filename) => {
      const match = filename.match(/^(\d+)/);
      return match ? parseInt(match[1], 10) : 0;
    };
    
    // Сортировка по возрастанию (1, 2, 3...)
    return getNumber(a) - getNumber(b);
  }
});

// Записываем результат в файл docs/.cursorrules
const outputPath = path.join("./docs", ".cursorrules");
fs.writeFileSync(outputPath, resultMd, "utf8");

console.log(`Файл .cursorrules успешно создан: ${outputPath}`);
