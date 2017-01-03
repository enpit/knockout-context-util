# knockout-context-util
Module that provides utility functions for accessing a model's knockout context

## Installation

``` cli
bower install --save knockout-context-util
```

In scripts/grunt/config/bowercopy.js add this to the third-party files near the bottom of the file:

``` js
"knockout-context-util": "knockout-context-util/knockout-context-util.js"
```

If you run grunt bowercopy now, you should see the knockout-context-helper folder in your js libs folder. Add a reference to the js file in that folder to your requirejs config in both the main.js and main-release-paths.json files:

``` js
'knockoutContextUtil': 'libs/knockout-context-util/knockout-context-util'
```

If your root viewModel is not attached to the HTML body but some other element, you can pass the root selector to the module by passing a config object to the requirejs.config call:

``` js
requirejs.config({
  paths: {
    'knockout': 'libs/knockout/knockout-3.4.0',
    'jquery': 'libs/jquery/jquery-3.1.0.min',
    /* ... */
    'knockoutContextUtil': 'libs/knockout-context-util/knockout-context-util'
  }
  config: {
    knockoutContextUtil: {
      bodySelector: '#myRoot' // your custom body selector
    }
  }
});
```

## Usage

``` js
define(['knockout-context-util'], function (kocoUtil) {
  var rootContext = kocoUtil.getRoot();
  var productSelector = '#productId';
  var productContext = kocoUtil.getContext(productSelector);
  var productViewModel = kocoUtil.getViewModel(productSelector); // === productContext.$data
});
```

### Passing your root selector to the module

If your root viewModel is not attached to the HTML body but some other element, you can pass the root selector to the module by passing a config object to the `requirejs.config` call:

``` js
requirejs.config({
  paths: {
    'knockout': 'libs/knockout/knockout-3.4.0',
    'jquery': 'libs/jquery/jquery-3.1.0.min',
    /* ... */
    'knockoutContextUtil': 'libs/knockout-context-util/knockout-context-util'
  }
  config: {
    knockoutContextUtil: {
      bodySelector: '#myRoot' // your custom body selector
    }
  }
});
```

You can then use the `getRoot` function to access that particular context:

``` js
  rootContext = kocoUtil.getRoot();
  // same as:
  rootContext = kocoUtil.getContext('#myRoot');
```

## API

### getRoot()

Returns the knockout context of the root viewModel, or `undefined` if no root context was found.

### getContext(elementAccessor)

Returns the knockout context of the DOM element identified by `elementAccessor`.
Returns the first context found, if `elementAccessor` matches multiple DOM elements.
Returns `undefined` if no knockout context is found.

#### elementAccessor

A query selector string (see the [jQuery docs](https://api.jquery.com/category/selectors/) for more information about these).

### getViewModel(elementAccessor)

Returns the viewModel of the knockout context identified by `elementAccessor`.
Same as calling `getContext(elementAccessor).$data`, but does not crash if no knockout context is found.
Instead, `undefined` is returned in this case.

#### elementAccessor

A query selector string (see the [jQuery docs](https://api.jquery.com/category/selectors/) for more information about these).

### create([bodySelector])

Creates a knockout-context-util module with the given `bodySelector`, i.e. this module's `getRoot` function then returns the knockout context identified by `bodySelector`.

#### bodySelector

A query selector string (see the [jQuery docs](https://api.jquery.com/category/selectors/) for more information about these).

## License

MIT © [enpit GmbH & Co. KG](http://www.enpit.de/)
