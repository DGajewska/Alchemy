import { defineConfig } from 'vitest/config'

import * as dotenv from 'dotenv'
dotenv.config({ path: '.env' })

export default defineConfig({
  test: {
    include: ['./test', './**/*.test.ts'],
    silent: false,
  },
})
