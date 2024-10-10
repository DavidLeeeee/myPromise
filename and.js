class myPromise {
  constructor(callback) {
    this.state = "pending";
    this.resolveCallback = null;
    this.rejectCallback = null;
    const resolve = (result) => {
      this.state = "fulfilled";
      this.resolveCallback(result);
    };
    const reject = (result) => {
      this.state = "rejected";
      this.rejectCallback(result);
    };

    callback(resolve, reject);
  }

  then(callback) {
    if (this.state == "pending") {
      this.resolveCallback = callback;
      return this;
    }
    if (this.state == "fulfilled") {
      return new myPromise(callback);
    }
  }

  catch(callback) {
    if (this.state == "pending") {
      this.rejectCallback = callback;
      return this;
    }
    if (this.state == "rejected") {
      return new myPromise(callback);
    }
  }
}

const promise1 = new myPromise(function (resolve, reject) {
  //resolve 또는 reject중 한개가 나오면 그대로 해당 Promise는 끝나게
  resolve("성공!");
  reject("실패!");
});
