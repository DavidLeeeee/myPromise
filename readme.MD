[기록]

2024-10-11
To do
Error Throw시에 catch에서 받을 수 있도록
resolve호출시 그 하위의 에러같은 것은 전부 무시되도록 (Error, catch 등등 무시해야함)

1. resolve = function (value){ --- } 안의 state == pending 조건문

const promise1 = new seokheePromise(function (resolve, reject) {
resolve("성공!");
reject("실패!");
});
에서, resolve 후에 reject가 실행되면서 fulfilled상태인 것이 rejected로 바뀐 상황 발생
=> 사실, resolve가 실행이 되면 그 다음 resolve/reject는 무시되도록 만들어야한다.
=>> 조건문 걸어놓을 필요는 없고 잘 return하도록 하면 됨

---

2. resolve = function (value){ --- }.bind(this)

화살표 함수를 쓰면 this 바인딩이 외부 스코프의 this를 가리킨다.
resolve/reject를 arrow function을 쓰면 this 바인딩이 편하긴 했을 듯..
근데 Promise가 없는 즉 ES6의 혜택인 arrow func도 배제하고 바인딩을 해보자..!

> > .bind(this)를 사용하여 this를 class에서 사용한 this로 고정시켜버림

---

3. try {
   work(this.resolve, this.reject);
   } catch (error) {
   work(this.reject);
   }

   이 부분에서 처음 의도는 work를 실행하고, 성공시 this.resolve / 실패시 this.reject였다..
   그 과정 중 무언가 꼬였다..!
