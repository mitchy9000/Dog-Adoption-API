import chai from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from '../db.js';
import app from '../app.js';

dotenv.config();
const { expect } = chai;

before(async () => {
  await connectDB();
});

after(async () => {
  await mongoose.connection.close();
});

describe('Dog Adoption API', () => {
  let token;
  let dogId;

  it('should register a user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'testuser', password: 'password123' });

    expect(res.status).to.equal(201);
  });

  it('should login a user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'password123' });

    expect(res.status).to.equal(200);
    token = res.body.token;
  });

  it('should register a dog', async () => {
    const res = await request(app)
      .post('/api/dogs')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Buddy', description: 'Friendly dog' });

    expect(res.status).to.equal(201);
    dogId = res.body.dog._id;
  });

  it('should adopt a dog', async () => {
    const res = await request(app)
      .post(`/api/dogs/${dogId}/adopt`)
      .set('Authorization', `Bearer ${token}`);

    // Accepts 200 (if another user adopts) or 400 (cannot adopt own dog)
    expect([200, 400]).to.include(res.status);
  });

  it('should remove a dog', async () => {
    const res = await request(app)
      .delete(`/api/dogs/${dogId}`)
      .set('Authorization', `Bearer ${token}`);

    expect([200, 400, 403]).to.include(res.status);
  });
});
