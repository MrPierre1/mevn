let chai = require('chai')
let chaiHttp = require('chai-http')
let server = 'http://localhost:4200'
var expect = require('chai').expect
var t = ''
chai.use(chaiHttp)

describe('Project', () => {

  // it('Can Login a single user', (done) => {
  //   chai.request(server)
  //     .post('/users/login')
  //     .send({
  //       'username': 'morpheus',
  //       'password': 'passwordToday'
  //     })
  //     .end((err, res) => {
  //       expect(res.statusCode).to.equal(200)
  //       expect(res.body.message).to.equal('User is logged in')
  //       expect(res.body.token).to.not.be.empty
  //       t = res.body.token
  //       done()
  //     })
  // })

  it('Can create a new project', (done) => {
    chai.request(server)
      .post('/project/new')
      // .set('Authorization', t)
      .send({
        'title': Math.random(1, 2000)+ 'project1',
        'author': 'leader@as.com',
        'comments': 'comments', 
        'endDate': "12/4/2018"
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        expect(res.body).to.include.all.keys('_id', 'author', 'comments', 'date', 'title')
        done()
      })
  })
  it('Can GET a single project', (done) => {
    chai.request(server)
      .get('/project/5bad365d77bd12e9f4d9a6a7')
      // .set('Authorization', t)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        expect(res.body.title).to.equal('project1')
        done()
      })
  })
  it('Can PUT a single user', (done) => {
    chai.request(server)
      .put('/project/edit/5bad365d77bd12e9f4d9a6a7')
      // .set('Authorization', t)
      .send({
        'comments': Math.random(200) + ' This is the body morpheus'
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(201)
        done()
      })
  })
})
