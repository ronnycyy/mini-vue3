let activeEffect: ReactiveEffect;

class ReactiveEffect {

  public scheduler: Function;

  private _fn: Function;

  constructor(fn: Function, s: Function) {
    this._fn = fn;
    this.scheduler = s;
  }

  // runner 函数
  public run(): void {
    if (!this._fn) return;
    activeEffect = this;
    return this._fn();
  }
}

interface IOption {
  scheduler: Function;
}

export function effect(fn: Function, options: IOption) {
  const _effect = new ReactiveEffect(fn, options.scheduler);
  // 首次执行 effect 就执行 fn
  _effect.run();
  // 返回 runner 函数
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
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  }
}
