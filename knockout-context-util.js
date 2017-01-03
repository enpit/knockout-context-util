define(['module', 'knockout', 'jquery'], function (module, ko, $) {
  var defaultBodySelector;
  if (module && typeof module.config === 'function' && typeof module.config().bodySelector === 'string') {
    defaultBodySelector = module.config().bodySelector;
  } else {
    defaultBodySelector = 'body';
  }

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
  return {
    getContext: getContext,
    getRoot: createGetRoot(getContext),
    getViewModel: createGetViewModel(getContext)
  };
});
