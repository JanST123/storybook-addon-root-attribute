import document from 'global/document';
import {EVENTS, PARAM_KEY} from './register/constants';
import {addons, makeDecorator} from '@storybook/addons';

const updateRootAttribute = ({root = 'html', attribute, currentState, root2}) => {
  const element = (() => {
    if (root === 'body') {
      return document.body;
    }
    if (root === 'html') {
      return document.documentElement;
    }
    return document.querySelector(root) || document.documentElement;
  })();

  element.removeAttribute(attribute);

  if (currentState.value !== null) {
    element.setAttribute(attribute, currentState.value);
  }

  if (root2) {
    const element2 = (() => {
      if (root2 === 'body') {
        return document.body;
      }
      if (root2 === 'html') {
        return document.documentElement;
      }
      return document.querySelector(root2) || document.documentElement;
    })();

    element2.removeAttribute(attribute);

    if (currentState.value !== null) {
      element2.setAttribute(attribute, currentState.value2);
    }
  }
};

export const withRootAttribute = makeDecorator({
  name: 'withRootAttribute',
  parameterName: PARAM_KEY,
  skipIfNoParametersOrOptions: true,
  allowDeprecatedUsage: false,
  wrapper: (getStory, context) => {
    addons.getChannel().on(EVENTS.UPDATE, updateRootAttribute);

    return getStory(context);
  }
});
