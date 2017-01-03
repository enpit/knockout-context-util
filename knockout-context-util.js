define(['knockout', 'jquery'], function (ko, $) {
  var defaultBodySelector = 'body';

  var createGetContext = function createGetContext () {
    return function getContext (elementAccessor) {
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
    }
  };

  var createGetViewModel = function createGetViewModel (getContext) {
    return function getViewModel (elementAccessor) {
      var viewModel;
      var context = getContext(elementAccessor);
      if (context) {
        viewModel = context.$data;
      } else {
        viewModel = {};
      }
      return viewModel;
    };
  };

  var createGetRoot = function createGetRoot (getContext, bodySelector) {
    if (typeof bodySelector !== 'string') {
      bodySelector = defaultBodySelector;
    }

    return function getRoot () {
      var context;
      var root;

      context = getContext(bodySelector);

      if (!context) {
        return;
      }

      root = context.$root;

      if (!root) {
        return;
      }

      return root;
    }
  };

  var getContext = createGetContext();
  var module = {
    getContext: getContext,
    getRoot: createGetRoot(getContext),
    getViewModel: createGetViewModel(getContext)
  }

  module.create = function create (bodySelector) {
    return $.extend({}, module, {
      getRoot: createGetRoot(module.getContext, bodySelector)
    });
  };

  return module;
});
