# inflight-barrier

One promise for multiple requests in flight to avoid async duplication

## Usage

```js
import createInflightBarrier from 'inflight-barrier'

const barrier = createInflightBarrier()

// some request that does some stuff
function req(key) {
  // key can be any value which can be used as a key in a Map
  return barrier(key, () => {
    // this is where you'd fetch the url or whatever
    return Promise.delay(100)
  })
}

// only assigns a single setTimeout
// when it dings, all thens get called with the same result.  (There's only
// one underlying promise.)
req('foo').then(…)
req('foo').then(…)
req('foo').then(…)
req('foo').then(…)
```

## See Also

- [promise-inflight](https://www.npmjs.com/package/promise-inflight)
- [inflight](https://www.npmjs.com/package/inflight)
