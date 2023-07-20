import chai from 'chai'
import chaiHttp from 'chai-http'

import {servidor} from '../src/index.js'


chai.use(chaiHttp)

/* listar */
describe('Prueba listado Animes sin parametros (GET)', () =>{
    it('Comprueba respuesta cod 200', (done) =>{
        chai.request(servidor).get('/listaAnimes').end((error, respuesta) =>{
            chai.expect(respuesta).to.have.status(200)
            done()
        })
    })
})
/* listar un anime especifico */
describe('Prueba listado Animes con parametros (POST)', () =>{
    describe('Json con ID', () =>{
        it('Debe responder con un objeto, con xx llaves', () =>{
            let objID = { "id":"3" }
            chai.request(servidor).post('/listaAnimes').send(objID).end((err,res) =>{
                    chai.expect(res)
                    should.not.exist(error);
                    res.body.should.be.a('objet');
                    res.body.should.have.property('nombre')
                    res.body.should.have.property('genero')
                    res.body.should.have.property('año')
                    res.body.should.have.property('autor')
                    done()
                })
        })
    })
    describe('Json con Nombre', () =>{
        it('Debe responder con un objeto, con xx llaves', () =>{
            let objName = { "nombre":"Akira" }
            chai.request(servidor).post('/listaAnimes').send(objName).end((err,res) =>{
                    chai.expect(res)
                    should.not.exist(error);
                    res.body.should.be.a('objet');
                    res.body.should.have.property('nombre')
                    res.body.should.have.property('genero')
                    res.body.should.have.property('año')
                    res.body.should.have.property('autor')
                    done()
                })
        })
    })
})
/* actualizar un anime */
describe('Prueba para insertar 1 registro (POST)', () =>{
    it('Debe responder que se ingreso correctametne (status 200)', (done) =>{
        let objNew = {
            "nombre": "pruebaaa3",
            "genero": "ingreasdsaso",
            "año": 3010,
            "autor": "aada"
            }
        chai.request(servidor).post('/nuevoAnime').send(objNew).end( (err,res) =>{
            chai.expect(res).to.have.status(200)
            done()
        })
    })
})

describe('Prueba para actualizar 1 registro (PUT)', () =>{
    describe('Actualizar Nombre', () =>{
        it('Debe responder afirmativamente', (done)=>{
            let objUPD = {
                "id": "6",
                "nombre":"solo nombre"
            }/* el ID 6 se crea en el test anterior */
            chai.request(servidor).put('/actualizarAnime').send(objUPD).end((err,res) =>{
                chai.expect(res).to.have.status(200)
                done()
            })
        })
    })
    describe('Actualizar Genero', () =>{
        it('Debe responder afirmativamente', (done)=>{
            let objUPD = {
                "id": "6",
                "genero":"solo genero"
            }/* el ID 6 se crea en el test anterior */
            chai.request(servidor).put('/actualizarAnime').send(objUPD).end((err,res) =>{
                chai.expect(res).to.have.status(200)
                done()
            })
        })
    })
    describe('Actualizar Año', () =>{
        it('Debe responder afirmativamente', (done)=>{
            let objUPD = {
                "id": "6",
                "año": 2000
            }/* el ID 6 se crea en el test anterior */
            chai.request(servidor).put('/actualizarAnime').send(objUPD).end((err,res) =>{
                chai.expect(res).to.have.status(200)
                done()
            })
        })
    })
    describe('Actualizar Autor', () =>{
        it('Debe responder afirmativamente', (done)=>{
            let objUPD = {
                "id": "6",
                "autor":"solo autor"
            }/* el ID 6 se crea en el test anterior */
            chai.request(servidor).put('/actualizarAnime').send(objUPD).end((err,res) =>{
                chai.expect(res).to.have.status(200)
                done()
            })
        })
    })

})
/* eliminar un anime */
describe('Prueba para eliminar 1 registro (DELETE)', () =>{
    it('Debe responder afirmativamente, el Anime se crea durante el test', (done) =>{
        let objDELETE = { "id": "6" }
        chai.request(servidor).delete('/eliminarAnime').send(objDELETE).end((err,res) =>{
            chai.expect(res).to.have.status(200)
            done()
        })
    })
})
