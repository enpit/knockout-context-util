define(['module', 'knockout', 'jquery'], (module, ko, $) => {
  let defaultBodySelector;
  if (module && typeof module.config === 'function' && typeof module.config().bodySelector === 'string') {
    defaultBodySelector = module.config().bodySelector;
  } else {
    defaultBodySelector = 'body';
  }

  const createGetContext = function createGetContext() {
    return function getContext(elementAccessor) {
      let context;
      let element;

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
  };

  const createGetViewModel = function createGetViewModel(getContext) {
    return function getViewModel(elementAccessor) {
      const context = getContext(elementAccessor);
      return context ? context.$data : {};
    };
  };

  const createGetRoot = function createGetRoot(getContext, bodySelector) {
    if (typeof bodySelector !== 'string') {
      bodySelector = defaultBodySelector;
    }

    return function getRoot() {
      let context;
      let root;

      context = getContext(bodySelector);

      if (!context) {
        return;
      }

      root = context.$root;

      if (!root) {
        return;
      }

      return root;
    };
  };

  const getContext = createGetContext();
  return {
    getContext,
    getRoot: createGetRoot(getContext),
    getViewModel: createGetViewModel(getContext)
  };
});
