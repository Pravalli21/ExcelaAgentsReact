import { expect } from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import app from '../index'; 
import Train from '../Modal/TrainModal'; 

chai.use(chaiHttp);

describe('GET /trains', () => {
  before(async () => {
    // Connect to a test database
    const MONGODB_URI = 'mongodb://localhost:27017/test';
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    // Clear the Train collection before each test
    await Train.deleteMany({});
  });

  it('should return 404 if id parameter is missing', async () => {
    const res = await chai.request(app).get('/trains');
    expect(res).to.have.status(400);
  });

  it('should return 404 if no trains found for the given id', async () => {
    const res = await chai.request(app).get('/trains?id=nonexistentid');
    expect(res).to.have.status(404);
  });

  it('should return 200 and an array of trains if id parameter is provided', async () => {
    const trainData = { id: 'testId', name: 'Test Train' };
    await Train.create(trainData);

    const res = await chai.request(app).get('/trains?id=testId');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
    expect(res.body[0].id).to.equal('testId');
  });

  after(async () => {
    // Disconnect from the test database after all tests are done
    await mongoose.disconnect();
  });
});
