// then, catch, finally 핸들러

class seokheePromise {
  constructor(work) {
    this.state = "pending";
    this.returnV = undefined;
    this.done = false;

    work(this.resolve, this.reject);
  }

  resolve = function (value) {
    if (this.done) return;
    this.done = true;
    this.state = "fulfilled";
    this.returnV = value;
  }.bind(this);

  reject = function (error) {
    if (this.done) return;
    this.done = true;
    this.state = "rejected";
    this.returnV = error;
  }.bind(this);

  then(callback) {
    callback(this.returnV);
  }
}

const promise1 = new seokheePromise(function (resolve, reject) {
  //resolve 또는 reject중 한개가 나오면 그대로 해당 Promise는 끝나게
  setTimeout(() => {
    resolve(console.log("결과드가자"));
  }, 1000);

  reject("실패!");
});

console.log(promise1); // 여기에서 pending이 나오도록 설계하면 좋을 듯.

promise1.then(function (result) {
  console.log("Promise 결과:", result); // "성공!"이 출력됨
});
// console.log(promise1.state, "/ return: ", promise1.returnValue); // Outputs: Success!
