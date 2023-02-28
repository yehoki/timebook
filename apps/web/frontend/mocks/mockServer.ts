import { setupServer } from 'msw/node'

import { handlers } from './handlers'
import { projectHandlers } from './projectHandlers'
import { taskHandlers } from './taskHandlers'
import { teamHandlers } from './teamHandlers'
import { workhourHandlers } from './workhourHandlers'

const allHandlers = [...handlers, ...workhourHandlers, ...projectHandlers, ...taskHandlers, ...teamHandlers]
export const mockServer = setupServer(...allHandlers)

// eslint-disable-next-line no-console
beforeAll(() => mockServer.listen({ onUnhandledRequest: (request) => console.error('unhandled', request) }))
afterEach(() => mockServer.resetHandlers())
afterAll(() => mockServer.close())
