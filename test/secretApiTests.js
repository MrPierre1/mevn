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
        'username': 'test123456',
        'password': '12345'
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200)
        expect(res.body.message).to.equal('User is logged in')
        expect(res.body.token).to.not.be.empty
        t = res.body.token
        done()
      })
  })


  it('Can GET all the users', (done) => {
    console.log('toekn is T', t)
    chai.request(server)
      .post('/secret/new')
      .set('Authorization', t)
      .send({
        'title': 'test23',
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
//   it('Can GET a single user', (done) => {
//     chai.request(server)
//         .get('/users/2')
//         .end((err, res) => {
//           expect(res.body.data.id).to.equal(2)
//           done()
//         })
//   })
//   it('Can POST a single user', (done) => {
//     chai.request(server)
//         .post('/users')
//         .send({
//             "name": "morpheus",
//             "job": "leader"
//           })
//         .end((err, res) => {
//           expect(res.statusCode).to.equal(201)
//           expect(res.body.job).to.equal('leader')
//           done()
//         })
//   })
//   it('Can PUT a single user', (done) => {
//     chai.request(server)
//         .put('/users/2')
//         .send({
//             "name": "morpheus",
//             "job": "zion resident"
//           })
//         .end((err, res) => {
//           expect(res.statusCode).to.equal(200)
//           expect(res.body.job).to.equal('zion resident')
//           done()
//         })
//   })
//   it('Can PATH a single user', (done) => {
//     chai.request(server)
//         .patch('/users/2')
//         .send({
//             "name": "morpheus",
//             "job": "Neo's Father"
//           })
//         .end((err, res) => {
//           expect(res.statusCode).to.equal(200)
//           expect(res.body.job).to.equal("Neo's Father")
//           done()
//         })
//   })
//   it('Can DELETE a single user', (done) => {
//     chai.request(server)
//         .delete('/users/2')
//         .end((err, res) => {
//           expect(res.statusCode).to.equal(204)
//           done()
//         })
//   })
})
