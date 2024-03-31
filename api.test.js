const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./server');
const exp = require('constants');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Books API', () => {
    let bookId;
    it('Should post a book', (done) => {
        const book = {id: '1', title: 'Test Book', author: 'Test Author'};
        chai.request(server)
            .post('/books')
            .send(book)
            .end((err, res) => {
                expect(res.statusCode).to.equal(201);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('id');
                expect(res.body).to.have.property('title');
                expect(res.body).to.have.property('author');
                bookId = res.body.id;
                done();
            })
    })
    it('Should get a single book', (done) => {
        chai.request(server)
            .get('/books/1')
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                done();
            })
    })
})