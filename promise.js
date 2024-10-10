class seokheePromise {
  constructor(work) {
    this.state = "pending";
    this.returnValue = undefined;
    this.callback = null;

    try {
      work(this.resolve, this.reject); // Cannot read properties of undefined (reading 'state')
    } catch (error) {
      this.reject(error);
    }
  }

  resolve = function (value) {
    console.log("resolve중");
    //pending상태에서 한번만 변경되도록 조건문 추가
    if (this.state === "pending") {
      this.state = "fulfilled";
      this.returnValue = value;
    }
    console.log(this.state);
  }.bind(this); // bind 안해주면 this가 전역을 참조

  reject = function (error) {
    console.log("reject중");
    if (this.state === "pending") {
      this.state = "rejected";
      this.returnValue = error;
    }
    console.log(this.state);
  }.bind(this);

  then(callback) {
    callback(this.returnValue);
  }
}

const promise1 = new seokheePromise(function (resolve, reject) {
  //resolve 또는 reject중 한개가 나오면 그대로 해당 Promise는 끝나게
  resolve("성공!");
  reject("실패!");
});

promise1.then(function (result) {
  console.log("Promise 결과:", result); // "성공!"이 출력됨
});
// console.log(promise1.state, "/ return: ", promise1.returnValue); // Outputs: Success!
