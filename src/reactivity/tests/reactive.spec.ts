import { reactive } from '../reactive'

/*
  describe 定义 reactive 组，可以包含多条测试
*/
describe('reactive', () => {

  /*
     it 定义单个测试
     happy path 指的是 `模块要处理的最基本逻辑点`，比如下面要测试的 reactive 的 happy path:

      1. 原对象 和 响应式对象 是不相等的。 (target !== proxy)
      2. 调用 响应式对象 的属性时，能得到 原对象 的同名属性值。 (proxy.age === target.age)
  */
  it('happy path', () => {
    const target = { age: 10 };
    const proxy = reactive(target);
    expect(proxy).not.toBe(target);
    expect(proxy.age).toBe(target.age);
  })
})