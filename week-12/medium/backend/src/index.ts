import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { jwt, sign } from 'hono/jwt'
import { env } from 'hono/adapter'


const app = new Hono()

app.post('/api/v1/signup',async (c) => {
  const prisma = new PrismaClient({
    //@ts-ignore
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();
  
  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
    },
  })

    //@ts-ignore
    const token = sign({id: user.id},c.env.JWT_SECRET)

    return c.json({
      jwt: token
    })
  
})
app.post('/api/v1/user/signin', (c) => {
  return c.text('Hello Hono!')
})
app.post('/api/v1/user/blog', (c) => {
  return c.text('Hello Hono!')
})
app.put('/api/v1/user/blog', (c) => {
  return c.text('Hello Hono!')
})
app.get('/api/v1/user/blog/:id', (c) => {
  return c.text('Hello Hono!')
})
app.get('/api/v1/user/blog/bulk', (c) => {
  return c.text('Hello Hono!')
})

export default app
