// then, catch, finally 핸들러

class seokheePromise {
  constructor(work) {
    this.PromiseStatus = "pending";
    this.result = undefined;
    this.callback = [];
    this.errcallback = []; // callback공유하면.. 덮어써버리게 됨
    this.finallyCallback = []; // resolve, reject와 값을 공유하믄 안대

    this.resolve = function (value) {
      if (this.PromiseStatus == "pending") {
        this.PromiseStatus = "fulfilled";
        this.result = value;
        this.callback.forEach((func) => func(this.result));
      }
    }.bind(this);
    this.reject = function (error) {
      if (this.PromiseStatus == "pending") {
        this.PromiseStatus = "rejected";
        this.result = error;
        this.errcallback.forEach((func) => func(this.result));
      }
    }.bind(this);

    work(this.resolve, this.reject);
  }

  reject(error) {
    if (this.PromiseStatus == "pending") {
      this.PromiseStatus = "rejected";
      this.result = error;
      this.errcallback.forEach((func) => func(this.result));
    }
  }

  then(callback) {
    if (this.PromiseStatus == "fulfilled") {
      callback(this.result);
      return this;
    }
    this.callback.push(callback);

    return this;
  }

  catch(errcallback) {
    if (this.PromiseStatus == "rejected") {
      errcallback(this.result);
      return this;
    }
    this.errcallback.push(errcallback);

    return this;
  }

  finally(finallyCallback) {
    this.finallyCallback.push(finallyCallback);
    finallyCallback();
    return this;
  }

  /*
   * Promise.all.then을 한다는 것은.. promise를 return해야함.
   * 실패우선 > reject가 나면 바로 컷!
   *
   */

  static all(array) {
    return new seokheePromise((resolve, reject) => {
      let result_all = [];
      let DONE_counts = 0;

      array.forEach((promise) => {
        promise
          .then((result) => {
            result_all.push(result);
            DONE_counts++;
            if (DONE_counts == array.length) {
              resolve(result_all); // 모든 Promise가 성공했을 때만 resolve 호출
            }
          })
          .catch((error) => {
            reject(error); // 하나라도 실패하면 reject 호출
          });
      });
    });
  }

  // static any 메서드: 첫 번째 성공한 Promise만 반환
  static any(array) {
    return new seokheePromise((resolve) => {
      array.forEach((promise) => {
        promise.then((result) => {
          resolve(result); // 첫 번째 성공한 Promise의 결과만 반환
        });
      });
      //전부 거부시 reject되도록
    });
  }
}

const promise1 = new seokheePromise(function (resolve, reject) {
  try {
    setTimeout(() => {
      // throw new Error("으악!");
      resolve("promise1 성공");
    }, 1505);
  } catch {
    reject("실패");
  }

  // let a = 1;

  // if (a == 1) {
  //   resolve("promise1 성공");
  // } else {
  //   reject("failed");
  // }
});

const promise2 = new seokheePromise((resolve, reject) => {
  setTimeout(() => resolve("promise2 성공"), 1501);
});

const promise3 = new seokheePromise((resolve, reject) => {
  setTimeout(() => resolve("promise3 성공"), 1500); // 실패하는 Promise
});

console.log(promise1); // 여기에서 pending이 나오도록

// promise1
//   .then((result) => {
//     console.log(promise1, `\n`, "Promise 성공:", result);
//   })
//   .catch((result) => console.log(promise1, `\n`, "Promise 실패:", result))
//   .then((result) => console.log(promise1, `\n`, "Promise 체인", result))
//   .finally(() => console.log(promise1, `\n`, promise1.a));

seokheePromise
  .all([promise1, promise2, promise3])
  .then((results) => {
    console.log("모든 Promise 성공:", results);
  })
  .catch((error) => {
    console.log("Promise 중 실패:", error);
  });

seokheePromise
  .any([promise1, promise2, promise3])
  .then((result) => {
    console.log("가장 먼저 성공한 Promise:", result);
  })
  .catch((error) => {
    console.log("모든 Promise 실패:", error);
  });
/*
 * arrow function 없이 this 바인딩 해주기
 * then, catch 등을 체이닝 => Promise를 반환해야 함
 *
 * [개선사항]
 * 체이닝에 있어, status의 변경이 먼저인지 확인해보기 (현재는 pending으로 처리하기에 모든 것이 잡히는 중)
 * finally는 추후 따로 독자적인 힘
 */
