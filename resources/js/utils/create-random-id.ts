export function createRandomId() {
  const cryptoObj =
    typeof globalThis !== 'undefined'
      ? (globalThis.crypto as { randomUUID?: () => string })
      : undefined;
  return cryptoObj?.randomUUID
    ? cryptoObj.randomUUID()
    : Math.random().toString(36).slice(2);
}
