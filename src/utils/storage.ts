import fs from 'fs'
import { get } from 'lodash'
export default class Storage {
  private path: string;
  /**
   * Create storage manager for save data in file
   * 
   * @param {string} fileFullPath full file's path, including filename 
   */
  constructor(fileFullPath: string) {
    this.path = fileFullPath;
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, JSON.stringify({}));
    }
  }
  public getItem(name: string) {
    const data = JSON.parse(fs.readFileSync(this.path).toString() || "{}");
    return get(data, name, undefined);
  }
  public setItem(name: string, value: any) {
    const data = JSON.parse(fs.readFileSync(this.path).toString() || "{}");
    data[name] = value;
    fs.writeFileSync(this.path, JSON.stringify(data));
  }

  public deleteItem(name: string) {
    const data = JSON.parse(fs.readFileSync(this.path).toString() || "{}");
    delete data[name];
    fs.writeFileSync(this.path, JSON.stringify(data));
  }

  public clear() {
    fs.writeFileSync(this.path, "");
  }
}