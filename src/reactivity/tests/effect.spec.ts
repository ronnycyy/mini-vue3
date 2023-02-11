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
  it('should return runner when call effect', () => {
    let foo = 10;
    // effect 函数接收一个 fn 函数
    const runner = effect(() => {
      foo++;
      return 'runner';
    })
    // 测试1: 首次执行 effect 时，执行一次 fn。
    expect(foo).toBe(11);
    const r = runner();
    // 测试2: 执行 runner 时，再次执行 fn。
    expect(foo).toBe(12);
    // 测试3: 执行 runner 后，返回 fn 的返回值。
    expect(r).toBe('runner');
  })
})
