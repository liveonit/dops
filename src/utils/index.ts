import fs from 'fs'
import handlebars from 'handlebars'
import { exec } from 'child_process'

export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Función que compila el template, y devuelve una funcion para llamarlo.
 * Además, convierte la salida del template en un código de una sola línea.
 * @param {string} templatePath Camino hacia el template
 */
export const templateToString = (templatePath: string, data: object) => {
  if (templatePath === undefined) {
    throw new Error("templatePath is undefined");
  }
  const templateString = fs.readFileSync(templatePath, "utf-8");
  const template = handlebars.compile(templateString);
  const result = template(data);
  return result;
};

export const createFileIfNotExist = (fileFullPath: string) => {
  if (!fs.existsSync(fileFullPath)) {
    fs.writeFileSync(fileFullPath, "");
  }
};
import Store from './storage'
export const Storage = Store;




export const execute: (command: string) => Promise<{ stdout: string, stderr: string }>
  = async (command: string) => {
    return new Promise((resolve, reject) => {
      exec(command, (err, stdout, stderr) => {
        err
          ? reject(err)
          : resolve({ stdout, stderr });
      })
    })
  }
