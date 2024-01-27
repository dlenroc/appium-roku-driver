const activeElementFields = {
  '*': [
    // ecp
    'visible',
    'focused',
    'focusItem',
    'index',
    // odc
    'itemFocused',
    'rowItemFocused',
  ],
};

const elementDisplayedFields = {
  '*': ['visible', 'opacity'],
};

const elementRectFields = {
  '*': ['bounds', ...elementDisplayedFields['*']],
};

const elementTextFields = {
  '*': ['text', 'extends', ...elementDisplayedFields['*']],
};

export const odcFields = {
  activeElementFields,
  elementDisplayedFields,
  elementRectFields,
  elementTextFields,
};
