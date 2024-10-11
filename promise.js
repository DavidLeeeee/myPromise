// then, catch, finally 핸들러

class seokheePromise {
  constructor(work) {
    this.state = "pending";
    this.result = undefined;
    this.callback = [];
    this.errcallback = []; //callback공유하면.. 덮어써버리게 됨

    work(this.resolve, this.reject);
  }

  resolve = function (value) {
    if (this.state === "pending") {
      this.state = "fulfilled";
      this.result = value;
      this.callback.forEach((f) => f(this.result));
    }
  }.bind(this);

  reject = function (error) {
    if (this.state === "pending") {
      this.state = "rejected";
      this.result = error;
      this.errcallback.forEach((f) => f(this.result));
    }
  }.bind(this);

  then(callback) {
    this.callback.push(callback);
    console.log("zz", this);
    return this;
  }

  catch(callback) {
    this.errcallback.push(callback);
    console.log("zz", this);
    return this;
  }
}

const promise1 = new seokheePromise(function (resolve, reject) {
  try {
    setTimeout(() => {
      resolve("성공!");
    }, 0);
  } catch {
    reject("실패");
  }
});

console.log(promise1); // 여기에서 pending이 나오도록

promise1
  .then((result) => {
    console.log(promise1, `\n`, "Promise 성공:", result);
  })
  .catch((result) => console.log(promise1, `\n`, "Promise 실패:", result))
  .then((result) => console.log(promise1, `\n`, "체인", result));

/*
 * arrow function 없이 this 바인딩 해주기
 * then, catch 등을 체이닝 => Promise를 반환해야 함
 *
 *
 * ㅁ
 */
