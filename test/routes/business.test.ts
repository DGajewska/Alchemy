import request from 'supertest'
import { afterAll, afterEach, describe, expect, it } from 'vitest'

import app from '../../src'
import {
  createTestBusiness,
  createTestPractitioner,
  createTestUser,
  deleteTestUserWithRelations,
  deleteTestUsers,
} from '../helpers/test-queries'
import { generateTestEmail, testBusinessData } from '../helpers/test-data'

// date portion of ISO string
const todaysDate = new Date().toISOString().split('T')[0]

describe('businessRoutes', () => {
  afterAll(async () => {
    await deleteTestUsers()
  })

  describe('POST /', async () => {
    let userId: string
    let businessId: string
    let contactId: string

    afterEach(async () => {
      await deleteTestUserWithRelations({ userId, businessId, contactId })
    })

    it('creates new business and returns data', async () => {
      const user = await createTestUser({ email: generateTestEmail('lando2') })
      userId = user.id

      return request(app)
        .post(`/api/v1/businesses/user/${user.id}`)
        .send(testBusinessData)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          businessId = response.body.id
          contactId = response.body.contactId

          expect(response.body.id).toBeTypeOf('string')
          expect(response.body.description).toBe(testBusinessData.description)
          expect(response.body.ownerUserId).toBe(user.id)
          expect(response.body.contactId).toBeTypeOf('string')
          expect(response.body.createdAt).toContain(todaysDate)
          expect(response.body.updatedAt).toContain(todaysDate)
        })
    })
  })

  describe('POST /:id/add-services', async () => {
    let userId: string
    let practitionerId: string
    let businessId: string
    let contactId: string

    afterEach(async () => {
      await deleteTestUserWithRelations({
        userId,
        practitionerId,
        businessId,
      })
    })

    it('adds services to business', async () => {
      const user = await createTestUser({
        email: generateTestEmail('lando3'),
      })
      userId = user.id
      const practitioner = await createTestPractitioner(userId)
      practitionerId = practitioner.id
      const business = await createTestBusiness(userId)
      businessId = business.id
      const serviceIdToConnect = practitioner.services[0].id

      return request(app)
        .post(`/api/v1/businesses/${businessId}/add-services`)
        .send({ services: [{ id: serviceIdToConnect, tuesday: true }] })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.count).toBe(1)
        })
    })
  })

  describe('GET /:id', async () => {
    it('fetches business record by ID, returns user data', async () => {
      const { id: userId } = await createTestUser()
      const { id } = await createTestBusiness(userId)

      return request(app)
        .get(`/api/v1/businesses/${id}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.id).toBe(id)
          expect(response.body.ownerUserId).toBe(userId)
        })
    })

    it('returns 404 if user not found', () => {
      return request(app)
        .get('/api/v1/businesses/770f537d-3ac5-485c-9ba4-d4e3152b91ee')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
    })
  })
})
