const delay = time => new Promise(resolve => setTimeout(resolve, time))

const pending = async res => {
  let done = false

  while(!done){
    res.write("");
    await delay(300)
  }

  return {
    stop(){
      done = true
    }
  }
}

module.exports = pending