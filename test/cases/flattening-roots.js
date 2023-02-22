import assert from 'assert';
import { ImportMap } from '@jspm/import-map';


const map = new ImportMap({
  mapUrl: new URL("file:///test/map/"),
  rootUrl: new URL("file:///test/"),
  map: {
    scopes: {
      '/': {
        'react': 'https://ga.jspm.io/npm:react@18.2.0/index.js',
      }
    }
  }
});

map.flatten();
assert(map.scopes && map.scopes["/"]);
