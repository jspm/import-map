import { rebase } from '../../lib/url.js';
import assert from 'assert';

const url = 'file:///test/';
const mapUrl = new URL('file:///test/a/');
const rootUrl = new URL('file:///test/a/');
assert.equal(rebase(url, mapUrl, rootUrl), '/../');
