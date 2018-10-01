let chai = require('chai')
let chaiHttp = require('chai-http')
let server = 'http://localhost:4200'
var expect = require('chai').expect
var t = ''
chai.use(chaiHttp)

describe('Secret', () => {

  it('Can Login a single user', (done) => {
    chai.request(server)
      .post('/users/login')
      .send({
        'username': 'morpheus',
        'password': 'passwordToday'
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200)
        expect(res.body.message).to.equal('User is logged in')
        expect(res.body.token).to.not.be.empty
        t = res.body.token
        done()
      })
  })

  it('Can create a new secret', (done) => {
    chai.request(server)
      .post('/secret/new')
      .set('Authorization', t)
      .send({
        'title': Math.random(2000) + 'test23',
        'author': 'leader@as.com',
        'body': 'passwordToday',
        'comments': 'comments'
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        expect(res.body).to.include.all.keys('_id', 'author', 'comments', 'date', 'title')
        done()
      })
  })
  it('Can GET a single secret', (done) => {
    chai.request(server)
      .get('/secret/5bad2842ccfb84ce2a30ca6b')
      .set('Authorization', t)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        expect(res.body.title).to.equal('MyTitle')
        done()
      })
  })
  it('Can PUT a single user', (done) => {
    chai.request(server)
      .put('/secret/edit/5bad2842ccfb84ce2a30ca6b')
      .set('Authorization', t)
      .send({
        'body': Math.random(200) + ' This is the bodymorpheus'
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(201)
        done()
      })
  })
})
