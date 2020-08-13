import createInflightBarrier from './inflight-barrier'

test('keyed', async () => {
  const barrier = createInflightBarrier()

  let count = 0
  const task = jest.fn(() => Promise.resolve(++count))

  const [one, two] = await Promise.all([
    barrier('one', task),
    barrier('one', task),
  ])

  expect(one).toBe(1)
  expect(two).toBe(1)
  expect(task).toHaveBeenCalledTimes(1)

  const [a, b] = await Promise.all([
    barrier('one', task),
    barrier('a', task),
  ])

  expect(a).toBe(2)
  expect(b).toBe(3)
  expect(task).toHaveBeenCalledTimes(3)
})

test('failed', async () => {
  const barrier = createInflightBarrier()

  const task = jest.fn(() => Promise.reject(new Error('thrown')))

  await expect(barrier('x', task)).rejects.toThrow('thrown')
})
