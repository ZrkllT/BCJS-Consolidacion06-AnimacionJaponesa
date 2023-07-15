import http from 'http';
import path from 'path';
import fs from 'fs'
import { leerArchivo, escribirArchivo } from './utils/funciones.js'


export const servidor = http.createServer((req,res) =>{
    const { pathname, searchParams } = new URL(req.url,`http://${req.headers.host}`)
    const params = new URLSearchParams(searchParams)

    /* ruta para leer y listar los animes, se puede buscar uno especifico por id o nombre */
    if(pathname === '/listaAnimes' && req.method === 'GET'){
        let json
        req.on('data', (datos) =>{
            json = JSON.parse(datos)
        })

        return req.on('end', () =>{
            const data = leerArchivo()
            /* cuando no se especifican parametros */
            if(!json){
                res.write(data)
                return res.end()
            }
            /* json vacio */
            if(!json.id && !json.nombre){
                res.write('Se Listaran Todos los Animes')
                res.write(data)
                return res.end()
            }

            const arreglo = JSON.parse(data)
            let salida
            Object.keys(arreglo).forEach((idAnime) =>{
                if(idAnime == json.id || arreglo[idAnime].nombre == json.nombre){
                    salida = JSON.stringify(arreglo[idAnime])
                    res.write(salida)
                    return res.end()
                }
            })

            res.write('El Anime indicado no existe en los registros')
            return res.end()
        })
    }

    /* ruta para crear nuevo anime */
    if(pathname === '/nuevoAnime' && req.method === 'POST'){
        let json
        req.on('data', (datos) =>{
            json = JSON.parse(datos)
        })

        return req.on('end', () =>{
            if(!json.nombre){
                res.write('Debe Indicar el Nombre del Anime')
                return res.end()
            }
            if(!json.genero){
                res.write('Debe Indicar el Genero del Anime')
                return res.end()
            }
            if(!json.año){
                res.write('Debe Indicar el Año de Estreno')
                return res.end()
            }
            if(!json.autor){
                res.write('Debe Indicar el Autor del Anime')
                return res.end()
            }

            const data = leerArchivo()
            const arreglo = JSON.parse(data)
            const newId = (Math.max(...Object.keys(arreglo)) +1).toString()

            arreglo[newId] = {"nombre": json.nombre,
                "genero": json.genero,
                "año": json.año,
                "autor": json.autor
            }
            const registro = JSON.stringify(arreglo)
            escribirArchivo(registro)
            res.write('Registrado')
            return res.end()

        })
    }

    /* ruta para actualizar un anime */
    if(pathname === '/actualizarAnime' && req.method === 'PUT'){
        let json
        req.on('data', (datos) =>{
            json = JSON.parse(datos)
        })

        return req.on('end', () =>{
            if(!json.id){
                res.write('Para actualizar debe Indicar el ID del Anime')
                return res.end()
            }

            const data = leerArchivo()
            const arreglo = JSON.parse(data)

            const actualizar = arreglo[json.id]
            if(actualizar === undefined){
                res.write('El ID a actualizar no existe')
                return res.end()
            }

            arreglo[json.id] = {
                ...arreglo[json.id],
                "nombre": json.nombre || arreglo[json.id].nombre,
                "genero": json.genero || arreglo[json.id].genero,
                "año": json.año || arreglo[json.id].año,
                "autor": json.autor || arreglo[json.id].autor,
            }

            const text = JSON.stringify(arreglo)
            escribirArchivo(text)
            res.write('Actualizado')
            return res.end()
        })
    }

    /* ruta para eliminar un anime */
    if(pathname === '/eliminarAnime' && req.method === 'DELETE'){
        let json
        req.on('data', (datos) =>{
            json = JSON.parse(datos)
        })

        return req.on('end', () =>{
            if(!json.id){
                res.write('Por favor indicar el ID del Anime')
                return res.end()
            }

            const data = leerArchivo()
            const arreglo = JSON.parse(data)

            const eliminado = arreglo[json.id]
            if(eliminado === undefined){
                res.write('El ID a eliminar no existe')
                return res.end()
            }
            delete arreglo[json.id]

            const text = JSON.stringify(arreglo)
            escribirArchivo(text)
            res.write('Eliminado')
            return res.end()
        })
    }

}).listen(8000, () => console.log('corriendo...'))

export default servidor