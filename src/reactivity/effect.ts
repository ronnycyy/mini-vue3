let activeEffect: ReactiveEffect;

class ReactiveEffect {
  private _fn: Function;

  constructor(fn: Function) {
    this._fn = fn;
  }

  // runner 函数
  public run(): void {
    if (!this._fn) return;
    activeEffect = this;
    // 执行 runner 后，返回 fn 的返回值。
    return this._fn();
  }
}

export function effect(fn: Function) {
  const _effect = new ReactiveEffect(fn);
  _effect.run();
  // 执行 effect 会返回一个 runner 函数，执行 runner 时，再次执行 fn。
  return _effect.run.bind(_effect);
}

const targetMap = new Map<Object, Map<string, Set<ReactiveEffect>>>();

export function track(target: Object, key: string) {
  let keyMap = targetMap.get(target);
  if (!keyMap) {
    keyMap = new Map();
    targetMap.set(target, keyMap);
  }

  let effectSet = keyMap.get(key);
  if (!effectSet) {
    effectSet = new Set();
    keyMap.set(key, effectSet);
  }

  effectSet.add(activeEffect);
}

export function trigger(target: Object, key: string) {
  let keyMap = targetMap.get(target);
  if (!keyMap) return;

  let effectSet = keyMap.get(key);
  if (!effectSet) return;

  for (const effect of effectSet) {
    effect.run();
  }
}
