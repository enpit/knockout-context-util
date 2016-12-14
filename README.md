# knockout-context-util
Module that provides utility functions for accessing a model's knockout context

## Usage

``` js
define(['knockout-context-util'], function (kocoUtil) {
  var rootContext = kocoUtil.getRoot();
  var productSelector = '#productId';
  var productContext = kocoUtil.getContext(productSelector);
  var productViewModel = kocoUtil.getViewModel(productSelector); // === productContext.$data

  // if your root viewModel is not attached to the HTML body but some other element:
  var bodySelector = '#myRoot';
  kocoUtil.create(bodySelector);
  rootContext = kocoUtil.getRoot();
  // same as:
  rootContext = kocoUtil.getContext(bodySelector);
});
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

#### elementAccessor

A query selector string (see the [jQuery docs](https://api.jquery.com/category/selectors/) for more information about these).
