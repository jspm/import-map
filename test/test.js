import { strictEqual, deepStrictEqual } from 'assert';
import { resolveConditional, ImportMap } from '@jspm/import-map';

function conditionEquals (actual, expected) {
  deepStrictEqual(actual, expected);
  deepStrictEqual(Object.keys(actual), Object.keys(expected));
}

const tests = {
  examples () {
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

    strictEqual(map.resolve('react', mapBase), 'https://cdn.com/react.js');
    strictEqual(map.resolve('react', 'https://site.com/'), 'https://cdn.com/react2.js');

    strictEqual(map.resolve('./hello.js', 'https://site.com/'), 'https://site.com/hello.js');

    map.set('react', './custom-react.js');
    strictEqual(map.resolve('react'), new URL('./custom-react.js', mapBase).href);

    map.set('react', './custom-react2.js', 'https://another.com/');
    strictEqual(map.resolve('react', 'https://another.com/'), new URL('./custom-react2.js', mapBase).href);

    deepStrictEqual(map.toJSON(), {
      "imports": {
        "react": "./custom-react.js"
      },
      "scopes": {
        "https://site.com/": {
          "react": "https://cdn.com/react2.js"
        },
        "https://another.com/": {
          "react": "./custom-react2.js"
        }
      }
    });

    // Rebase the map
    map.rebase('./map');
    deepStrictEqual(map.toJSON(), {
      "imports": {
        "react": "../custom-react.js"
      },
      "scopes": {
        "https://site.com/": {
          "react": "https://cdn.com/react2.js"
        },
        "https://another.com/": {
          "react": "../custom-react2.js"
        }
      }
    });

    // Flatten the import map (removes unnecessary scope redundancy)
    map.set('react', '../custom-react.js', 'https://site.com/');
    map.flatten();
    deepStrictEqual(map.toJSON(), {
      "imports": {
        "react": "../custom-react.js"
      },
      "scopes": {
        "https://another.com/": {
          "react": "../custom-react2.js"
        }
      }
    });

    // Replace URLs in the map
    map.replace('https://cdn.com/', 'https://cdn-mirror.com/');
    map.replace('https://another.com/', 'https://another-site.com/');
    deepStrictEqual(map.toJSON(), {
      "imports": {
        "react": "../custom-react.js"
      },
      "scopes": {
        "https://another-site.com/": {
          "react": "../custom-react2.js"
        }
      }
    });
  },

  async resolveConditional () {
    // basic example
    conditionEquals(resolveConditional({
      default: './default',
      other: './other'
    }), './default');

    // include and exclude
    conditionEquals(resolveConditional({ a: './a', b: { b: './b' } }, { include: ['b'] }), { a: './a', b: './b' });
    conditionEquals(resolveConditional({ a: './a', b: { b: './b' } }, { exclude: ['b'] }), { a: './a' });
    conditionEquals(resolveConditional({ a: './a', b: { b: './b' } }, { exclude: ['b'], include: ['a'] }), './a');
    conditionEquals(resolveConditional({ a: { b: './b', a: './a' }, b: { b: './b' } }, { include: ['a'] }), { b: './b', a: './a' });
    conditionEquals(resolveConditional({ b: { b: './b' }, a: { b: './b', a: './a' } }, { include: ['a'] }), { b: './b', a: './a' });

    // covers
    conditionEquals(resolveConditional({ b: { b: './b' }, a: { b: './b', a: './a' }, c: './c', d: './d' }, { covers: [['a', 'b']] }), { b: './b', a: './a' });
    conditionEquals(resolveConditional({ b: { b: './b' }, a: { b: './b', a: './a' }, c: './c', d: './d' }, { exclude: ['b'], covers: [['a', 'b']] }), { a: './a' });
    conditionEquals(resolveConditional({ b: { b: './b' }, a: { b: './b', a: './a' }, c: './c', d: './d' }, { exclude: ['b'], covers: [['a', 'b', 'c']] }), { a: './a', c: './c' });
  },

  async resolveMap () {

    const baseUrl = 'https://site.com/';
    const map = new ImportMap(baseUrl, {
      imports: {
        test: '/test-map.js',
        'https://another.com/url.js': '/url-map.js'
      },
      scopes: {
        'https://another.com/': {
          '/url.js': '/scoped-map.js',
        }
      }
    });

    strictEqual(map.resolve('test', baseUrl), 'https://site.com/test-map.js');
    strictEqual(map.resolve('/url.js', 'https://another.com/'), 'https://site.com/url-map.js');
    strictEqual(map.resolve('https://site.com/url.js', 'https://another.com/x'), 'https://site.com/scoped-map.js');
    strictEqual(map.resolve('https://another.com/url.js', baseUrl), 'https://site.com/url-map.js');
  }
};

let cnt = 0;
for (const [name, test] of Object.entries(tests)) {
  cnt++;
  try {
    await test();
    process.stdout.write('.');
  }
  catch (err) {
    console.error('\n\nError running test ' + name);
    throw err;
  }
}

console.log(`\n\n${cnt} tests passed successfully.`);
