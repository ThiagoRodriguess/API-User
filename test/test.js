// test/test.js
const { describe, it } = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Importe o app.js

// Configure o chai para usar o chaiHttp
chai.use(chaiHttp);
const expect = chai.expect;

// Exemplo de teste para a rota de cadastro (sign up)
describe('Rota de Cadastro (sign up)', () => {
  it('Deve cadastrar um novo usuário', (done) => {
    chai.request(app)
      .post('/signup')
      .send({
        nome: 'Teste',
        email: 'teste@example.com',
        senha: 'senha123',
        telefones: [{ numero: '123456789', ddd: '11' }]
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('token');
        done();
      });
  });
});

// Exemplo de teste para a rota de autenticação (sign in)
describe('Rota de Autenticação (sign in)', () => {
    let authToken; // Variável para armazenar o token
  
    it('Deve autenticar um usuário existente e obter o token', (done) => {
      chai.request(app)
        .post('/signin')
        .send({
          email: 'teste@example.com',
          senha: 'senha123'
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('id');
          expect(res.body).to.have.property('token');
  
          // Armazena o token para uso posterior
          authToken = res.body.token;
          done();
        });
    });
  
    // Adicione outros testes que requerem o token, usando a variável authToken
    it('Deve buscar informações do usuário autenticado', (done) => {
      chai.request(app)
        .get('/user')
        .set('Authorization', `Bearer ${authToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('id');
          expect(res.body).to.have.property('data_criacao');
          expect(res.body).to.have.property('data_atualizacao');
          expect(res.body).to.have.property('ultimo_login');
          done();
        });
    });
  });
  