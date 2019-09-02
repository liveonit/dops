export default class Storage {
    private path;
    /**
     * Create storage manager for save data in file
     *
     * @param {string} fileFullPath full file's path, including filename
     */
    constructor(fileFullPath: string);
    getItem(name: string): any;
    setItem(name: string, value: any): void;
    deleteItem(name: string): void;
    clear(): void;
}
