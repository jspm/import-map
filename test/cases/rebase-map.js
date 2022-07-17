import { deepStrictEqual } from 'assert';
import { ImportMap } from '@jspm/import-map';

const map = new ImportMap({
  mapUrl: 'https://site.com/',
  rootUrl: null,
  map: {
    imports: {
      './some': './another',
      'https://another.com/x': './y'
    },
    scopes: {
      'https://another.com/': {
        './url.js': './scoped-map.js',
      }
    }
  }
});

map.rebase('https://another.com/');

deepStrictEqual(map.toJSON(), {
  imports: {
    './x': 'https://site.com/y',
    'https://site.com/some': 'https://site.com/another'
  },
  scopes: {
    './': {
      'https://site.com/url.js': 'https://site.com/scoped-map.js',
    }
  }
});
