/*
 * Gatsby defines a global called ___loader to prevent its method calls from creating console errors.
 *
 * Called from `jest.config.ts`
 */
global.___loader = {
  enqueue: jest.fn(),
}
