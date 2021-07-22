# Import Map Utility

Generic ImportMap class utility for the manipulation and resolution of import maps, used by JSPM.

## Getting Started

### Installation

Node.js:
```
npm install @jspm/import-map
```

Browser:

```js
const { ImportMap } = await import('https://jspm.dev/@jspm/import-map');
```

`@jspm/import-map` only ships as an ES module, so to use it in Node.js add `"type": "module"` to your package.json file or write an `.mjs` to load it.

### Usage

example.mjs
```js
import { ImportMap } from '@jspm/import-map';

// Must pass a full URL as a base URL for the map
const mapBase = new URL('.', import.meta.url);

const map = new ImportMap(mapBase, {
  imports: {
    react: 'https://cdn.com/react.js'
  },
  scopes: {
    'https://site.com/': {
      react: 'https://cdn.com/react2.js'
    }
  }
});

// Use the map resolver
map.resolve('react', mapBase) === 'https://cdn.com/react.js';
map.resolve('react', 'https://site.com/') === 'https://cdn.com/react2.js';

// Supports normal URL resolution behaving a browser-compatible ES module resolver
map.resolve('./hello.js', 'https://site.com/') === 'https://site.com/hello.js';

// Mutate the map
map.set('react', './custom-react.js');
map.resolve('react') === new URL('./custom-react.js', mapBase).href;

// Mutate the map inside a custom scope
map.set('react', './custom-react2.js', 'https://another.com/');
map.resolve('react', 'https://another.com/') === new URL('./custom-react2.js', mapBase).href;

// Get the map JSON
console.log(JSON.stringify(map.toJSON(), null, 2));
// {
//   "imports": {
//     "react": "./custom-react.js"
//   },
//   "scopes": {
//     "https://site.com/": {
//       "react": "https://cdn.com/react2.js"
//     },
//     "https://another.com/": {
//       "react": "./custom-react2.js"
//     }
//   }
// }

// Rebase the map
map.rebase('./map/');
console.log(JSON.stringify(map.toJSON(), null, 2));
// {
//   "imports": {
//     "react": "../custom-react.js"
//   },
//   "scopes": {
//     "https://site.com/": {
//       "react": "https://cdn.com/react2.js"
//     },
//     "https://another.com/": {
//       "react": "../custom-react2.js"
//     }
//   }
// }

// Flatten the import map (removes unnecessary scope redundancy)
map.set('react', '../custom-react.js', 'https://site.com/');
map.flatten();
console.log(JSON.stringify(map.toJSON(), null, 2));
// {
//   "imports": {
//     "react": "../custom-react.js"
//   },
//   "scopes": {
//     "https://another.com/": {
//       "react": "../custom-react2.js"
//     }
//   }
// }

// Replace URLs in the map
map.replace('https://cdn.com/', 'https://cdn-mirror.com/');
map.replace('https://another.com/', 'https://another-site.com/');
console.log(JSON.stringify(map.toJSON(), null, 2));
// {
//   "imports": {
//     "react": "../custom-react.js"
//   },
//   "scopes": {
//     "https://another-site.com/": {
//       "react": "../custom-react2.js"
//     }
//   }
// }
```

## API

See [map.d.ts](blob/main/map.d.ts).

Support is also provided for conditional maps supporting a way to manage generic maps for multiple environment targets, before serializing or resolving for exact environment targets.

## Contributing

**All pull requests welcome!**

### License

MIT
