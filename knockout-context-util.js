define(['knockout', 'jquery'], function (ko, $) {
  var getContext = function (elementAccessor) {
    var context;
    var element;

    if (!elementAccessor) {
      return;
    }

    element = $(elementAccessor)[0];
    if (!element) {
      return;
    }

    context = ko.contextFor(element);
    if (!context) {
      return;
    }

    return context;
  };

  var getViewModel = function (elementAccessor) {
    var viewModel;
    var context = getContext(elementAccessor);
    if (context) {
      viewModel = context.$data;
    } else {
      viewModel = {};
    }
    return viewModel;
  };

  var getRoot = function () {
    var context;
    var root;

    context = getContext('#globalBody');

    if (!context) {
      return;
    }

    root = context.$root;
    if (!root) {
      return;
    }

    return root;
  };

  return {
    getRoot: getRoot,
    getContext: getContext,
    getViewModel: getViewModel
  };
});
