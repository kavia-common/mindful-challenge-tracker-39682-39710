import '@testing-library/jest-dom';

// Silence React 19 act warnings in tests output to keep logs readable
const originalError = console.error;
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation((...args: unknown[]) => {
    const firstArg = args[0];
    if (typeof firstArg === 'string' && firstArg.includes('Warning:')) return;
    // @ts-ignore
    originalError(...args);
  });
});

afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

// Provide a default noop fetch if required (most tests mock API layer)
if (typeof global.fetch === 'undefined') {
  // @ts-ignore
  global.fetch = jest.fn();
}
