export declare const sleep: (ms: number) => Promise<unknown>;
/**
 * Función que compila el template, y devuelve una funcion para llamarlo.
 * Además, convierte la salida del template en un código de una sola línea.
 * @param {string} templatePath Camino hacia el template
 */
export declare const templateToString: (templatePath: string, data: object) => string;
export declare const createFileIfNotExist: (fileFullPath: string) => void;
import Store from './storage';
export declare const Storage: typeof Store;
export declare const execute: (command: string) => Promise<{
    code: number;
    stdout: string;
    stderr: string;
}>;
