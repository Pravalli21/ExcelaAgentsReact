const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
chai.use(chaiHttp);
const expect = chai.expect;
 
describe('Trains API', () => {
  it('should return train details for id=12632', async () => {
   
    const res = await chai.request(app).get('/trains?id=12632');
 
    expect(res).to.have.status(200);
 
    expect(res.body).to.be.an('array');
 
    expect(res.body).to.not.be.empty;
  });
});