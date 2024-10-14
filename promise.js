// then, catch, finally 핸들러

class seokheePromise {
  constructor(work) {
    this.PromiseStatus = "pending";
    this.result = undefined;
    this.callback = [];
    this.errcallback = []; //callback공유하면.. 덮어써버리게 됨

    work(this.resolve, this.reject);
  }

  resolve = function (value) {
    if (this.PromiseStatus === "pending") {
      this.PromiseStatus = "fulfilled";
      this.result = value;
      this.callback.forEach((f) => f(this.result));
    }
  }.bind(this);

  reject = function (error) {
    if (this.PromiseStatus === "pending") {
      this.PromiseStatus = "rejected";
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
  finally(callback) {
    this.callback.push(callback);
    this.errcallback.push(callback);
  }
}

const promise1 = new seokheePromise(function (resolve, reject) {
  // resolve("성공!");
  try {
    setTimeout(() => {
      // throw new Error("으악!");
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
  .then((result) => console.log(promise1, `\n`, "체인", result))
  .finally((result) => console.log(promise1, `\n`, "정리합니다", result));

/*
 * arrow function 없이 this 바인딩 해주기
 * then, catch 등을 체이닝 => Promise를 반환해야 함
 *
 * [개선사항]
 * 체이닝에 있어, status의 변경이 먼저인지 확인해보기 (현재는 pending으로 처리하기에 모든 것이 잡히는 중)
 * finally는 추후 따로 독자적인 힘
 *
 * [추가희망]
 * Primise.all
 */
