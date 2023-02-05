let activeEffect: ReactiveEffect;

class ReactiveEffect {
  private _fn: Function;
  
  constructor(fn: Function) {
    this._fn = fn;
  }

  public run(): void {
    if (!this._fn) return;
    activeEffect = this;
    this._fn();
  }
}

export function effect(fn: Function) {
  const _effect = new ReactiveEffect(fn);
  _effect.run();
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
