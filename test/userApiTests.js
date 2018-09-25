

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = 'http://localhost:4200';
var expect = require('chai').expect
chai.use(chaiHttp);

  describe('Users', () => {
      it('Can GET all the users', (done) => {
        chai.request(server)
            .get('/users')
            .end((err, res) => {
              
              expect(res.body).to.be.an('array')
              expect(res.body[0]).to.include.keys('_id', 'username', 'email')
              expect(res.body).to.not.be.empty;
              done();
            });
      });
      it('Can Signup a single user', (done) => {
        chai.request(server)
            .post('/users/signup')
            .send({
                "username": "morpheus",
                "email": "leader@as.com",
                "password": "passwordToday"
              })
            .end((err, res) => {
              expect(res.statusCode).to.equal(201)
              expect(res.body.username).to.equal('morpheus')
              done();
            });
      });
      it('Can Login a single user', (done) => {
        chai.request(server)
            .post('/users/login')
            .send({
                "username": "testuser",
                "password": "12345"
              })
            .end((err, res) => {
              expect(res.statusCode).to.equal(200)
              expect(res.body.message).to.equal('User is logged in')
              expect(res.body.token).to.not.be.empty;
              done();
            });
      });
  
  });