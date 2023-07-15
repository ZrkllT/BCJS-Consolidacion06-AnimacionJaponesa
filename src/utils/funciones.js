import fs from 'fs';

let url = './src/files/anime.json'

export function leerArchivo(){
    return fs.readFileSync(url,'utf8')
}

export function escribirArchivo(data){
    fs.writeFileSync(url, data, 'utf8')
}
