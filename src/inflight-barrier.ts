export type InflightBarrier = <T extends PromiseLike<unknown>>(key: unknown, task: () => T) => T

export default function createInflightBarrrier(): InflightBarrier {
  const inflight = new Map<unknown, PromiseLike<unknown>>()

  return function inflightBarrier<T extends PromiseLike<unknown>>(key: unknown, task: () => T): T {
    let pending = inflight.get(key)

    if (!pending) {
      pending = task()

      inflight.set(key, pending)

      const cleanup = (): boolean => inflight.delete(key)

      pending.then(cleanup, cleanup)
    }

    return pending as T
  }
}
