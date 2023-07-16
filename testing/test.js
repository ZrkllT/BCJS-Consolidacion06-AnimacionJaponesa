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

describe('Prueba listado Animes con parametros', () =>{
    describe('Json con ID', () =>{
        it('Debe responder con los datos de Sailor Moon', () =>{
            let objID = { "id":"3" }
            chai.request(servidor).post('/listaAnimes').send(objID)
                .end((err,res) =>{
                    chai.expect(res)
                    should.not.exist(err);
                    res.body.should.be.a('objet');
                    res.body.should.have.property('nombre')
                    res.body.should.have.property('genero')
                    res.body.should.have.property('año')
                    res.body.should.have.property('autor')

                    res.body.should.have.property('nombre').eql('Sailor Moon')
                    done()
                })
        })
    })
    describe('Json con Nombre', () =>{
        it('Debe responder con los datos de Akira', () =>{
            let objName = { "nombre":"Akira" }
            chai.request(servidor).post('/listaAnimes').send(objName)
                .end((err,res) =>{
                    chai.expect(res)
                    should.not.exist(err);
                    res.body.should.be.a('objet');
                    res.body.should.have.property('nombre')
                    res.body.should.have.property('genero')
                    res.body.should.have.property('año')
                    res.body.should.have.property('autor')

                    res.body.should.have.property('nombre').equal('Akira')
                    done()
                })
        })
    })
})

