import { ImportMap } from '@jspm/import-map';
import { deepStrictEqual } from 'assert';

export default function () {
  const map = new ImportMap(new URL('.', import.meta.url), exampleMap);
  map.flatten(new URL('../../', import.meta.url), 'https://site.com/public/');
  deepStrictEqual(map.toJSON(), {
    scopes: {
      './packages/bio/bio-home-page/': {
        '@roundforest/react-localization-commons': './packages/commons/react-localization-commons/lib/src/localization-commons.js',
        '@roundforest/emotion-styled': './packages/commons/emotion-styled/src/emotion-styled.js'
      },
      './packages/bio/bio-product-category-search/': {
        '@roundforest/react-localization-commons': './packages/commons/react-localization-commons/lib/src/localization-commons.js',
        '@roundforest/react-environment-context': './packages/commons/react-environment-context/lib/src/react-environment-context.js',
        '@roundforest/emotion-styled': './packages/commons/emotion-styled/src/emotion-styled.js',
        '@roundforest/bio-design-system': './packages/bio/bio-design-system/lib/exports.js',
        '@roundforest/react-full-screen-state': './packages/commons/react-full-screen-state/lib/src/react-full-screen-state.js'
      },
      './packages/commons/react-ripple-effect/': {
        '@roundforest/emotion-styled': './packages/commons/emotion-styled/src/emotion-styled.js'
      },
      './packages/commons/react-tooltip/': {
        '@roundforest/emotion-styled': './packages/commons/emotion-styled/src/emotion-styled.js'
      },
      'https://ga.jspm.io/npm:react-dom@16.14.0/': { react: 'https://ga.jspm.io/npm:react@16.14.0/dev.index.js' },
      'https://ga.jspm.io/npm:react-dom@17.0.2/': {
        'scheduler/tracing': 'https://ga.jspm.io/npm:scheduler@0.20.2/dev.tracing.js',
        scheduler: 'https://ga.jspm.io/npm:scheduler@0.20.2/dev.index.js'
      },
      'https://ga.jspm.io/npm:react-query@3.31.0/': {
        'react-dom': 'https://ga.jspm.io/npm:react-dom@16.14.0/dev.index.js'
      },
      'https://ga.jspm.io/': {
        '@babel/runtime/helpers/extends': 'https://ga.jspm.io/npm:@babel/runtime@7.16.0/helpers/extends.js',  
        '@babel/runtime/helpers/inheritsLoose': 'https://ga.jspm.io/npm:@babel/runtime@7.16.0/helpers/inheritsLoose.js',
        '@babel/runtime/helpers/interopRequireDefault': 'https://ga.jspm.io/npm:@babel/runtime@7.16.0/helpers/interopRequireDefault.js',
        '@emotion/cache': 'https://ga.jspm.io/npm:@emotion/cache@11.5.0/dist/dev.emotion-cache.browser.cjs.js',
        '@emotion/hash': 'https://ga.jspm.io/npm:@emotion/hash@0.8.0/dist/hash.browser.cjs.js',
        '@emotion/is-prop-valid': 'https://ga.jspm.io/npm:@emotion/is-prop-valid@1.1.0/dist/emotion-is-prop-valid.browser.cjs.js',
        '@emotion/memoize': 'https://ga.jspm.io/npm:@emotion/memoize@0.7.5/dist/emotion-memoize.browser.cjs.js',
        '@emotion/react': 'https://ga.jspm.io/npm:@emotion/react@11.5.0/dist/dev.emotion-react.browser.cjs.js',
        '@emotion/serialize': 'https://ga.jspm.io/npm:@emotion/serialize@1.0.2/dist/dev.emotion-serialize.browser.cjs.js',
        '@emotion/sheet': 'https://ga.jspm.io/npm:@emotion/sheet@1.0.3/dist/dev.emotion-sheet.browser.cjs.js',        '@emotion/unitless': 'https://ga.jspm.io/npm:@emotion/unitless@0.7.5/dist/unitless.browser.cjs.js',   
        '@emotion/utils': 'https://ga.jspm.io/npm:@emotion/utils@1.0.0/dist/emotion-utils.browser.cjs.js',    
        '@emotion/weak-memoize': 'https://ga.jspm.io/npm:@emotion/weak-memoize@0.2.5/dist/weak-memoize.browser.cjs.js',
        '@popperjs/core': 'https://ga.jspm.io/npm:@popperjs/core@2.10.2/dist/cjs/dev.popper.js',
        clsx: 'https://ga.jspm.io/npm:clsx@1.1.1/dist/clsx.js',
        'copy-to-clipboard': 'https://ga.jspm.io/npm:copy-to-clipboard@3.3.1/index.js',
        'hoist-non-react-statics': 'https://ga.jspm.io/npm:hoist-non-react-statics@3.3.2/dist/hoist-non-react-statics.cjs.js',
        'object-assign': 'https://ga.jspm.io/npm:object-assign@4.1.1/index.js',
        'prop-types': 'https://ga.jspm.io/npm:prop-types@15.7.2/dev.index.js',
        'prop-types/checkPropTypes': 'https://ga.jspm.io/npm:prop-types@15.7.2/dev.checkPropTypes.js',        
        react: 'https://ga.jspm.io/npm:react@17.0.2/dev.index.js',
        'react-dom': 'https://ga.jspm.io/npm:react-dom@17.0.2/dev.index.js',
        'react-fast-compare': 'https://ga.jspm.io/npm:react-fast-compare@3.2.0/index.js',
        'react-is': 'https://ga.jspm.io/npm:react-is@16.13.1/dev.index.js',
        'react-side-effect': 'https://ga.jspm.io/npm:react-side-effect@2.1.1/lib/index.js',
        scheduler: 'https://ga.jspm.io/npm:scheduler@0.19.1/dev.index.js',
        'scheduler/tracing': 'https://ga.jspm.io/npm:scheduler@0.19.1/dev.tracing.js',
        stylis: 'https://ga.jspm.io/npm:stylis@4.0.10/dist/umd/stylis.js',
        'tippy.js/headless': 'https://ga.jspm.io/npm:tippy.js@6.3.3/headless/dist/dev.tippy-headless.cjs.js', 
        'toggle-selection': 'https://ga.jspm.io/npm:toggle-selection@1.0.6/index.js'
      },
      'https://site.com/public/test/cases/': {
        '@emotion/react': 'https://ga.jspm.io/npm:@emotion/react@11.5.0/dist/dev.emotion-react.browser.cjs.js',
        '@emotion/styled': 'https://ga.jspm.io/npm:@emotion/styled@11.3.0/dist/dev.emotion-styled.browser.cjs.js',
        '@roundforest/bio-design-system': 'https://site.com/public/packages/bio/bio-design-system/lib/exports.js',
        '@roundforest/bio-home-page': 'https://site.com/public/packages/bio/bio-home-page/lib/src/bio-home-page.js',
        '@roundforest/bio-product-category-search': 'https://site.com/public/packages/bio/bio-product-category-search/lib/src/exports.js',
        '@roundforest/emotion-styled': 'https://site.com/public/packages/commons/emotion-styled/src/emotion-styled.js',
        '@roundforest/frontend-commons': 'https://site.com/public/packages/commons/frontend-commons/lib/src/frontend-commons.js',
        '@roundforest/react-environment-context': 'https://site.com/public/packages/commons/react-environment-context/lib/src/react-environment-context.js',
        '@roundforest/react-feature-flags-context': 'https://site.com/public/packages/commons/react-feature-flags-context/lib/src/react-feature-flags-context.js',
        '@roundforest/react-full-screen-state': 'https://site.com/public/packages/commons/react-full-screen-state/lib/src/react-full-screen-state.js',
        '@roundforest/react-localization-commons': 'https://site.com/public/packages/commons/react-localization-commons/lib/src/localization-commons.js',
        '@roundforest/react-map-slots': 'https://site.com/public/packages/commons/react-map-slots/src/map-slots.js',
        '@roundforest/react-portal': 'https://site.com/public/packages/commons/react-portal/lib/src/portal.js',
        '@roundforest/react-ripple-effect': 'https://site.com/public/packages/commons/react-ripple-effect/lib/src/ripple-effect.js',
        '@roundforest/react-tooltip': 'https://site.com/public/packages/commons/react-tooltip/lib/src/tooltip.js',
        '@tippyjs/react/headless': 'https://ga.jspm.io/npm:@tippyjs/react@4.2.6/headless/dist/dev.tippy-react-headless.umd.js',
        react: 'https://ga.jspm.io/npm:react@17.0.2/dev.index.js',
        'react-copy-to-clipboard': 'https://ga.jspm.io/npm:react-copy-to-clipboard@5.0.4/lib/index.js',       
        'react-dom': 'https://ga.jspm.io/npm:react-dom@17.0.2/dev.index.js',
        'react-helmet': 'https://ga.jspm.io/npm:react-helmet@6.1.0/lib/dev.Helmet.js',
        'react-is': 'https://ga.jspm.io/npm:react-is@17.0.2/dev.index.js',
        'react-query': 'https://ga.jspm.io/npm:react-query@3.31.0/lib/dev.index.js',
        'react-toastify': 'https://ga.jspm.io/npm:react-toastify@8.0.3/dist/index.js',
        'tippy.js/headless': 'https://ga.jspm.io/npm:tippy.js@6.3.3/headless/dist/dev.tippy-headless.cjs.js'  
      }
    }
  });
}

const exampleMap = {
  scopes: {
    './packages/bio/bio-design-system/': {
      '@roundforest/react-feature-flags-context': './packages/commons/react-feature-flags-context/lib/src/react-feature-flags-context.js',
      '@emotion/react': 'https://ga.jspm.io/npm:@emotion/react@11.5.0/dist/dev.emotion-react.browser.cjs.js',
      react: 'https://ga.jspm.io/npm:react@17.0.2/dev.index.js',
      '@roundforest/emotion-styled': './packages/commons/emotion-styled/src/emotion-styled.js',
      '@roundforest/react-localization-commons': './packages/commons/react-localization-commons/lib/src/localization-commons.js',
      '@roundforest/react-ripple-effect': './packages/commons/react-ripple-effect/lib/src/ripple-effect.js',
      '@roundforest/react-full-screen-state': './packages/commons/react-full-screen-state/lib/src/react-full-screen-state.js',
      'react-toastify': 'https://ga.jspm.io/npm:react-toastify@8.0.3/dist/index.js',
      '@tippyjs/react/headless': 'https://ga.jspm.io/npm:@tippyjs/react@4.2.6/headless/dist/dev.tippy-react-headless.umd.js',
      'tippy.js/headless': 'https://ga.jspm.io/npm:tippy.js@6.3.3/headless/dist/dev.tippy-headless.cjs.js',
      '@roundforest/react-map-slots': './packages/commons/react-map-slots/src/map-slots.js',  
      '@roundforest/react-tooltip': './packages/commons/react-tooltip/lib/src/tooltip.js',    
      'react-dom': 'https://ga.jspm.io/npm:react-dom@17.0.2/dev.index.js',
      'react-copy-to-clipboard': 'https://ga.jspm.io/npm:react-copy-to-clipboard@5.0.4/lib/index.js'
    },
    './packages/bio/bio-home-page/': {
      '@roundforest/react-localization-commons': './packages/commons/react-localization-commons/lib/src/localization-commons.js',
      react: 'https://ga.jspm.io/npm:react@17.0.2/dev.index.js',
      '@roundforest/bio-design-system': './packages/bio/bio-design-system/lib/exports.js',    
      '@roundforest/emotion-styled': './packages/commons/emotion-styled/src/emotion-styled.js',
      '@roundforest/bio-product-category-search': './packages/bio/bio-product-category-search/lib/src/exports.js',
      '@roundforest/react-environment-context': './packages/commons/react-environment-context/lib/src/react-environment-context.js',
      '@emotion/react': 'https://ga.jspm.io/npm:@emotion/react@11.5.0/dist/dev.emotion-react.browser.cjs.js',
      'react-helmet': 'https://ga.jspm.io/npm:react-helmet@6.1.0/lib/dev.Helmet.js',
      'react-dom': 'https://ga.jspm.io/npm:react-dom@17.0.2/dev.index.js',
      '@roundforest/bio-home-page': './packages/bio/bio-home-page/lib/src/bio-home-page.js'   
    },
    './packages/bio/bio-product-category-search/': {
      '@roundforest/react-localization-commons': './packages/commons/react-localization-commons/lib/src/localization-commons.js',
      '@roundforest/react-environment-context': './packages/commons/react-environment-context/lib/src/react-environment-context.js',
      'react-query': 'https://ga.jspm.io/npm:react-query@3.31.0/lib/dev.index.js',
      react: 'https://ga.jspm.io/npm:react@17.0.2/dev.index.js',
      '@emotion/react': 'https://ga.jspm.io/npm:@emotion/react@11.5.0/dist/dev.emotion-react.browser.cjs.js',
      '@roundforest/emotion-styled': './packages/commons/emotion-styled/src/emotion-styled.js',
      '@roundforest/bio-design-system': './packages/bio/bio-design-system/lib/exports.js',    
      '@roundforest/react-full-screen-state': './packages/commons/react-full-screen-state/lib/src/react-full-screen-state.js'
    },
    './packages/commons/emotion-styled/': {
      '@roundforest/frontend-commons': './packages/commons/frontend-commons/lib/src/frontend-commons.js',
      '@emotion/styled': 'https://ga.jspm.io/npm:@emotion/styled@11.3.0/dist/dev.emotion-styled.browser.cjs.js'
    },
    './packages/commons/react-environment-context/': { react: 'https://ga.jspm.io/npm:react@17.0.2/dev.index.js' },
    './packages/commons/react-feature-flags-context/': { react: 'https://ga.jspm.io/npm:react@17.0.2/dev.index.js' },
    './packages/commons/react-full-screen-state/': { react: 'https://ga.jspm.io/npm:react@17.0.2/dev.index.js' },
    './packages/commons/react-localization-commons/': { react: 'https://ga.jspm.io/npm:react@17.0.2/dev.index.js' },
    './packages/commons/react-map-slots/': {
      react: 'https://ga.jspm.io/npm:react@17.0.2/dev.index.js',
      'react-is': 'https://ga.jspm.io/npm:react-is@17.0.2/dev.index.js'
    },
    './packages/commons/react-portal/': {
      react: 'https://ga.jspm.io/npm:react@17.0.2/dev.index.js',
      'react-dom': 'https://ga.jspm.io/npm:react-dom@17.0.2/dev.index.js'
    },
    './packages/commons/react-ripple-effect/': {
      '@emotion/react': 'https://ga.jspm.io/npm:@emotion/react@11.5.0/dist/dev.emotion-react.browser.cjs.js',
      react: 'https://ga.jspm.io/npm:react@17.0.2/dev.index.js',
      '@roundforest/emotion-styled': './packages/commons/emotion-styled/src/emotion-styled.js'    },
    './packages/commons/react-tooltip/': {
      react: 'https://ga.jspm.io/npm:react@17.0.2/dev.index.js',
      '@roundforest/emotion-styled': './packages/commons/emotion-styled/src/emotion-styled.js',
      '@roundforest/react-portal': './packages/commons/react-portal/lib/src/portal.js'        
    },
    'https://ga.jspm.io/npm:react-dom@16.14.0/': { react: 'https://ga.jspm.io/npm:react@16.14.0/dev.index.js' },
    'https://ga.jspm.io/npm:react-dom@17.0.2/': {
      'scheduler/tracing': 'https://ga.jspm.io/npm:scheduler@0.20.2/dev.tracing.js',
      scheduler: 'https://ga.jspm.io/npm:scheduler@0.20.2/dev.index.js'
    },
    'https://ga.jspm.io/npm:react-query@3.31.0/': {
      'react-dom': 'https://ga.jspm.io/npm:react-dom@16.14.0/dev.index.js'
    },
    'https://ga.jspm.io/': {
      '@babel/runtime/helpers/extends': 'https://ga.jspm.io/npm:@babel/runtime@7.16.0/helpers/extends.js',
      '@babel/runtime/helpers/inheritsLoose': 'https://ga.jspm.io/npm:@babel/runtime@7.16.0/helpers/inheritsLoose.js',
      '@babel/runtime/helpers/interopRequireDefault': 'https://ga.jspm.io/npm:@babel/runtime@7.16.0/helpers/interopRequireDefault.js',
      '@emotion/cache': 'https://ga.jspm.io/npm:@emotion/cache@11.5.0/dist/dev.emotion-cache.browser.cjs.js',
      '@emotion/hash': 'https://ga.jspm.io/npm:@emotion/hash@0.8.0/dist/hash.browser.cjs.js', 
      '@emotion/is-prop-valid': 'https://ga.jspm.io/npm:@emotion/is-prop-valid@1.1.0/dist/emotion-is-prop-valid.browser.cjs.js',
      '@emotion/memoize': 'https://ga.jspm.io/npm:@emotion/memoize@0.7.5/dist/emotion-memoize.browser.cjs.js',
      '@emotion/react': 'https://ga.jspm.io/npm:@emotion/react@11.5.0/dist/dev.emotion-react.browser.cjs.js',
      '@emotion/serialize': 'https://ga.jspm.io/npm:@emotion/serialize@1.0.2/dist/dev.emotion-serialize.browser.cjs.js',
      '@emotion/sheet': 'https://ga.jspm.io/npm:@emotion/sheet@1.0.3/dist/dev.emotion-sheet.browser.cjs.js',
      '@emotion/unitless': 'https://ga.jspm.io/npm:@emotion/unitless@0.7.5/dist/unitless.browser.cjs.js',
      '@emotion/utils': 'https://ga.jspm.io/npm:@emotion/utils@1.0.0/dist/emotion-utils.browser.cjs.js',
      '@emotion/weak-memoize': 'https://ga.jspm.io/npm:@emotion/weak-memoize@0.2.5/dist/weak-memoize.browser.cjs.js',
      '@popperjs/core': 'https://ga.jspm.io/npm:@popperjs/core@2.10.2/dist/cjs/dev.popper.js',      clsx: 'https://ga.jspm.io/npm:clsx@1.1.1/dist/clsx.js',
      'copy-to-clipboard': 'https://ga.jspm.io/npm:copy-to-clipboard@3.3.1/index.js',
      'hoist-non-react-statics': 'https://ga.jspm.io/npm:hoist-non-react-statics@3.3.2/dist/hoist-non-react-statics.cjs.js',
      'object-assign': 'https://ga.jspm.io/npm:object-assign@4.1.1/index.js',
      'prop-types': 'https://ga.jspm.io/npm:prop-types@15.7.2/dev.index.js',
      'prop-types/checkPropTypes': 'https://ga.jspm.io/npm:prop-types@15.7.2/dev.checkPropTypes.js',
      react: 'https://ga.jspm.io/npm:react@17.0.2/dev.index.js',
      'react-dom': 'https://ga.jspm.io/npm:react-dom@17.0.2/dev.index.js',
      'react-fast-compare': 'https://ga.jspm.io/npm:react-fast-compare@3.2.0/index.js',       
      'react-is': 'https://ga.jspm.io/npm:react-is@16.13.1/dev.index.js',
      'react-side-effect': 'https://ga.jspm.io/npm:react-side-effect@2.1.1/lib/index.js',     
      scheduler: 'https://ga.jspm.io/npm:scheduler@0.19.1/dev.index.js',
      'scheduler/tracing': 'https://ga.jspm.io/npm:scheduler@0.19.1/dev.tracing.js',
      stylis: 'https://ga.jspm.io/npm:stylis@4.0.10/dist/umd/stylis.js',
      'tippy.js/headless': 'https://ga.jspm.io/npm:tippy.js@6.3.3/headless/dist/dev.tippy-headless.cjs.js',
      'toggle-selection': 'https://ga.jspm.io/npm:toggle-selection@1.0.6/index.js'
    }
  }
};