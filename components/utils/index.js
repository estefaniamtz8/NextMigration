import React from 'react'

function IsClassComponent(component) {
  return typeof Component === 'function' && !!component.prototype.isReactComponent;
}

function IsFunctionComponent(component) {
  return typeof Component === 'function' && String(component).includes('return React.createElement');
}

function IsReactComponent(component) {
  return IsClassComponent(component) || IsFunctionComponent(component);
}

function IsElement(element) {
  return React.isValidElement(element);
}

function IsDOMTypeElement(element) {
  return IsElement(element) && typeof element.type === 'string';
}

function IsCompositeTypeElement(element) {
  return IsElement(element) && typeof element.type === 'function';
}


export { IsReactComponent, IsDOMTypeElement, IsCompositeTypeElement, IsElement };
