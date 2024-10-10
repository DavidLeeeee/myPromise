// then, catch, finally 핸들러

class seokheePromise {
  constructor(work) {
    this.state = "pending";
    this.returnV = undefined;
    this.callback = null;

    work(this.resolve, this.reject);
  }

  resolve = function (value) {
    if (this.state === "pending") {
      this.state = "fulfilled";
      this.returnV = value;

      if (this.callback) {
        this.callback(this.returnV);
      }
    }
  }.bind(this);

  reject = function (error) {
    if (this.state === "pending") {
      this.state = "rejected";
      this.returnV = error;

      if (this.callback) {
        this.callback(this.returnV);
      }
    }
  }.bind(this);

  then(callback) {
    this.callback = callback;
    if (this.state === "fulfilled") {
      this.callback(this.returnV);
    }
    return this;
  }

  catch(callback) {
    this.callback = callback;
    if (this.state === "rejected") {
      this.callback(this.returnV);
    }
    return this;
  }
}

const promise1 = new seokheePromise(function (resolve, reject) {
  try {
    setTimeout(() => {
      reject("실패");
      resolve("성공!");
    }, 1000);
  } catch {}
});

console.log(promise1); // 여기에서 pending이 나오도록

promise1
  .then((result) => console.log("Promise 성공:", result))
  .catch((error) => console.log("Promise 실패:", error));
// console.log(promise1.state, "/ return: ", promise1.returnValue); // Outputs: Success!
