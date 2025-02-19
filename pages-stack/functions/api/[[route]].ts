import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { handle } from 'hono/cloudflare-pages'
import { z } from 'zod'

const app = new Hono()

const route = app.get(
  '/hello',
  zValidator(
    'query',
    z.object({
      name: z.string(),
    })
  ),
  (c) => {
    const { name } = c.req.valid('query')
    return c.jsonT({
      message: `Hello ${name}!`,
    })
  }
)

export type AppType = typeof route

export const onRequest = handle(app, '/api')
