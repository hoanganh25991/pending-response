const pending = res => {
  let done = false;

  const id = setInterval(() => {
    if (done) return clearInterval(id);
    res.write('');
  }, 300);

  return {
    stop() {
      done = true;
    }
  };
};

module.exports = pending;
