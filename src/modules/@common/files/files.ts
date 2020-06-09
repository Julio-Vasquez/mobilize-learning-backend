import { existsSync, unlink } from 'fs';

export class Files {
  public deleteFiles(array: string[]): boolean {
    if (array.length > 0) {
      for (let file in array) {
        if (existsSync(array[file])) {
          unlink(array[file], err => {
            console.log(`The error in : --> ${file} with error : ${err}`);
            return false;
          });
        }
      }
      return true;
    }
    return false;
  }

  /**
   * array, es un parametro tipo arreglo, el cual se va a remover la url del servidor
   */
  public prepareFiles(array: string[]): string[] {
    let res: string[] = [];
    if (array.length > 0) {
      for (let file in array) {
        console.log(`the file is : ${file}`);
        res.push(array[file].replace('localhost:8550/ml', ''));
      }
    }
    return res;
  }

  public renameFiles(location: string, newName: string): boolean {
    return true;
  }

  public moveFiles(
    location: string,
    newLocation: string,
    name: string,
  ): boolean {
    return true;
  }
}
