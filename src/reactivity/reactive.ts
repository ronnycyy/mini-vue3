import { track, trigger } from "./effect";

export function reactive(target: any) {
  return new Proxy(target, {

    get(target: Object, key: string) {
      const res = Reflect.get(target, key);
      track(target, key);
      return res;
    },

    set(target: Object, key: string, value: unknown) {
      const res = Reflect.set(target, key, value);
      trigger(target, key);
      return res;
    }
  })
}
