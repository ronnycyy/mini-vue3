import { effect } from "../effect"
import { reactive } from "../reactive";

describe('effect', () => {

  // it('track and trigger', () => {
  //   const user = reactive({ age: 10 });

  //   let nextAge = 0;
  //   effect(() => {
  //     // 收集依赖
  //     nextAge = user.age + 1;
  //   })
  //   // 测试 fn 是否首次执行
  //   expect(nextAge).toBe(11);

  //   // 触发依赖
  //   user.age++;
  //   // 测试触发依赖
  //   expect(nextAge).toBe(12);
  // })

  /**
   * 测试:
   * 1. effect 函数接收一个 fn 函数，首次执行 effect 时，执行一次 fn。
   * 2. 执行 effect 会返回一个 runner 函数，执行 runner 时，再次执行 fn。
   * 3. 执行 runner 后，返回 fn 的返回值。
  */
  // it('should return runner when call effect', () => {
  //   let foo = 10;
  //   // effect 函数接收一个 fn 函数
  //   const runner = effect(() => {
  //     foo++;
  //     return 'runner';
  //   })
  //   // 测试1: 首次执行 effect 时，执行一次 fn。
  //   expect(foo).toBe(11);
  //   const r = runner();
  //   // 测试2: 执行 runner 时，再次执行 fn。
  //   expect(foo).toBe(12);
  //   // 测试3: 执行 runner 后，返回 fn 的返回值。
  //   expect(r).toBe('runner');
  // })

  /*
   「任务」
   
    任务点1: 
    `effect` 函数接收 `2` 个参数，第 `1` 个参数是依赖函数 `fn`，第 `2` 个参数是一个 `options` 对象，`options` 里有一个名为 
    `scheduler` 的函数，首次执行 `effect` 时调用 `fn`，但是不会调用 `scheduler`。

    任务点2: 
    当响应式对象 `UPDATE` 时不再执行 `fn` 了，而是执行 `scheduler`。

    任务点3: 
    `effect` 函数执行后会返回一个 `runner` 函数，执行 `runner` 会再次执行 `fn`。
  */
  it('scheduler', () => {

    // 定义一个响应式对象
    const obj = reactive({ foo: 1 })

    // 通过 jest.fn 创建一个模拟函数 scheduler。
    // 参考 https://jestjs.io/docs/jest-object#jestfnimplementation
    const scheduler = jest.fn(() => {})

    // 检测 fn 是否执行的变量
    let valueForFn = 0;
    const runner = effect(
      () => {
        valueForFn = obj.foo;
      },
      { scheduler }
    )

    // 任务点1. 测试1: 首次执行 effect 时，调用 fn，所以 valueForFn 是当前 obj.foo 的值，也就是 1。
    expect(valueForFn).toBe(1);
    // 任务点1. 测试2: 首次执行 effect 时，不调用 scheduler。
    // 参考 https://jestjs.io/docs/expect#tohavebeencalled
    expect(scheduler).not.toHaveBeenCalled();
    
    // 任务点2. 当响应式对象 `UPDATE` 时不再执行 `fn`，而是执行 `scheduler`。
    // 响应式对象 UPDATE
    obj.foo++;
    // 任务点2. 测试1: 响应式对象 UPDATE 时，不执行 fn，所以 valueForFn 依旧是 1。
    expect(valueForFn).toBe(1);
    // 任务点2. 测试2: 响应式对象 UPDATE 时，执行 scheduler，使用 toHaveBeenCalledTimes(1) 确定 scheduler 被执行了 1 次。
    // 参考 https://jestjs.io/docs/expect#tohavebeencalledtimesnumber
    expect(scheduler).toHaveBeenCalledTimes(1);

    // 任务点3. `effect` 函数执行后会返回一个 `runner` 函数，执行 `runner` 会再次执行 `fn`。
    // 执行 runner
    runner();
    // 任务点3. 测试1: 执行 runner 会再次执行 fn，所以 valueForFn === obj.foo === 2 (obj.foo 已经累加过了，值是 2)
    expect(valueForFn).toBe(2);
  })

})
