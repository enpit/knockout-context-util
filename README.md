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
