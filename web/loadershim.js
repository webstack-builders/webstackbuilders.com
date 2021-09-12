/*
 * Mock a loader set by Gatsby to prevent its method calls from creating console errors.
 * Has to be called in a setup file for the `jest` global to be available.
 */

/* eslint-disable no-undef */
global.___loader = {
  enqueue: jest.fn(),
}
