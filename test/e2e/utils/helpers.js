async function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function retry(fn, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries - 1) throw error;
      await wait(delay * Math.pow(2, i));
    }
  }
}

module.exports = {
  wait,
  retry,
};
