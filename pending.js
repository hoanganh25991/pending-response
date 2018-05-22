const pending = res => {
  let done = false;

  const id = setInterval(() => {
    if (done) return clearInterval(id);
    console.log('pending...');
    res.write(Buffer.from(' '));
  }, 300);

  return {
    stop() {
      done = true;
    }
  };
};

module.exports = pending;
