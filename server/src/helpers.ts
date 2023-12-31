import hash from 'hash.js';

function myHash(string: string) {
  return String(hash.sha256().update(string).digest('hex'));
}

export {
  myHash,
};
