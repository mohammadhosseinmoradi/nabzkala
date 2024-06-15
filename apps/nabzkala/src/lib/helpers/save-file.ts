import fs from "fs";

export function saveFile(filePath: string, file: File): Promise<boolean> {
  return new Promise(async (resolve, reject) => {
    const buffer = await file.arrayBuffer();

    const arrayBufferView = new Uint8Array(buffer);

    fs.writeFile(filePath, arrayBufferView, {}, async (err) => {
      if (err) {
        reject(false);
        return;
      }
      resolve(true);
    });
  });
}
