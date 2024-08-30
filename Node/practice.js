import fs from "fs/promises";

const readPjson = async () => {
  const filePath = new URL("./package.json", import.meta.url).pathname;
  console.log(filePath, JSON.parse(await fs.readFile(filePath, "utf-8")));
};

const writeFile = async () => {
  const newFile = new URL("./demo.js", import.meta.url).pathname;
  await fs.writeFile(newFile, `console.log("yooo!")`);
};

readPjson();
writeFile();
