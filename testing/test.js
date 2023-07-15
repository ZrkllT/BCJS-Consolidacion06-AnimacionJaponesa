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
