import React from 'react';
import { Modal, Fade, CircularProgress, Drawer } from '@mui/material';
import PropTypes from 'prop-types';
import { MdClose } from 'react-icons/md';
import { IoIosArrowForward } from 'react-icons/io';

/**
 * Obtiene el tipo de un component o el element html (JSX). Si no tiene tipo, entonces regresará type 'react.fragment', La prioridad es devolver el tipo __TYPE.
 *
 * @param {ReactNode} component - El elemento o child
 * @returns {string} - Un texto que representa el tipo del component
 */
export const typeOfComponent = (component) =>
  // eslint-disable-next-line no-underscore-dangle
  component?.props?.__TYPE ||
  component?.type?.toString().replace('Symbol(react.fragment)', 'react.fragment') ||
  undefined;

/**
 * Obtiene todos los children de un especifico tipo, La funci[on revisa el prop __TYPE primero y despues el typo de element html para hacer match con un array de tipos permitidos, de este moto eliminamos los hijos que no queremos
 *
 * @param {ReactNode} children - JSX children
 * @param {string[]} types - Tipos permitidos que los children deverian ser permitidos
 * @returns {ReactNode[]} - Array de children que pasaron la validación
 * @example
 * Busca todas las coincidencias de Todo (elemento personalizado), div, y React Fragment
 * getChildrenByType(children, ['Todo', 'div', 'react.fragment']);
 */
export const getChildrenByType = (children, types) =>
  React.Children.toArray(children).filter((child) => {
    let type;
    const getActions = 'ActionsModal';
    const getHeader = 'HeaderModal';
    const result = Object.values(child.props)?.includes(getActions);
    const resultHeader = Object.values(child.props)?.includes(getHeader);
    if (result) {
      type = getActions;
      return !types.includes(type);
    }
    if (resultHeader) {
      type = getHeader;
      return !types.includes(type);
    }
    if (child?.type?.name) {
      type = child.type.name;
    } else {
      type = typeOfComponent(child);
    }
    return !types.includes(type);
  });

function Buttons(args) {
  const {
    onClose = () => {},
    onAccept = () => {},
    hasAccept = false,
    acceptText = '',
    cancelText = '',
    right = false,
    noCancel = false,
    alignFooter = 'center',
    disableAccept = false,
  } = args;
  return (
    <div
      className={`items-center rounded-bl-md ${right ? `items-${alignFooter}` : 'flex-end'} bg-light-four p-[20px]
      ${hasAccept && !right ? 'grid' : 'flex'} ${
        right ? 'grid-cols-none gap-[40px]' : 'border-br-[8px] grid-cols-[repeat(2_1fr)] gap-[10px]'
      }`}
    >
      {noCancel ? (
        <div />
      ) : (
        <button
          type="button"
          className={`width-auto block cursor-pointer whitespace-nowrap bg-transparent text-[1rem] text-white ${
            right ? 'border-none' : 'border-[1px] border-solid border-[#013245]'
          }`}
          onClick={onClose}
        >
          {cancelText}
        </button>
      )}
      {hasAccept ? (
        <button
          type="button"
          className={`width-auto block cursor-pointer whitespace-nowrap text-[1rem] text-white ${
            disableAccept ? 'bg-[#cccccc]' : 'bg-[#013245]'
          }`}
          onClick={disableAccept ? () => {} : onAccept}
        >
          {acceptText}
        </button>
      ) : null}
    </div>
  );
}

const varToString = (varObj) => Object.keys(varObj)[0];

function validTypeProps(value, allow) {
  const type = typeof value;
  const isValid = type === allow;
  const nameVariable = varToString({ value });
  if (!isValid) throw new TypeError(`${nameVariable} no es de tipo ${allow}, no se permite como un valor valido`);
}

export function ActionsModal({ vertical, children, style = {}, className = '', name, ...others }) {
  const countChildren = React.Children.toArray(children).length;

  validTypeProps(vertical, 'boolean');
  validTypeProps(style, 'object');
  validTypeProps(className, 'string');

  let stylesActions = {
    display: 'grid',
    gridTemplateColumns: `repeat(${countChildren || 1}, 1fr)`,
    gridColumnGap: '10px',
    width: '100%',
  };

  if (vertical) {
    stylesActions = {
      ...stylesActions,
      gridTemplateColumns: `1fr`,
      gridRowGap: '10px',
    };
  }

  stylesActions = { ...stylesActions, ...style };

  return (
    <div
      style={stylesActions}
      {...others}
      className={`${className} grid-cols-[repeat(2_1fr)] items-center justify-end gap-[40px] rounded-b-lg bg-light-four p-[20px]`}
    >
      {children}
    </div>
  );
}

ActionsModal.propTypes = {
  vertical: PropTypes.bool,
  children: PropTypes.element,
  style: PropTypes.instanceOf(Object),
  className: PropTypes.string,
  name: PropTypes.string,
};

ActionsModal.defaultProps = {
  vertical: false,
  children: <div />,
  style: {},
  className: '',
  name: 'ActionsModal',
};

export function HeaderModal({ children, style = {}, className = '', name, ...others }) {
  validTypeProps(style, 'object');
  validTypeProps(className, 'string');

  const stylesActions = {
    display: 'block',
  };

  return (
    <div style={stylesActions} {...others} className={className}>
      {children}
    </div>
  );
}

HeaderModal.propTypes = {
  children: PropTypes.element,
  style: PropTypes.instanceOf(Object),
  className: PropTypes.string,
  name: PropTypes.string,
};

HeaderModal.defaultProps = {
  children: <div />,
  style: {},
  className: '',
  name: 'HeaderModal',
};

let styleContainerModal = {
  display: 'grid',
  backgroundColor: '#FFF',
  borderRadius: '8px',
  gridGap: '10px',
  width: '30vw',
  height: '30vh',
};

const styleModal = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backdropFilter: 'blur(5px) brightness(96%)',
  outline: 'none',
};

const rightModalStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: '10px',
  backdropFilter: 'blur(5px) brightness(96%)',
};

const ModalBuilder = function ({
  open,
  onClose,
  onAccept,
  children,
  className,
  width,
  height,
  style,
  title,
  isTitleCenter,
  iconClosed,
  classNameModal,
  heigthFooter,
  heigthActionsButtons,
  withoutFooter,
  isLoader,
  autoHeigth,
  autoWidth,
  hiddenOverflow,
  right,
  noCancel,
  noHeader,
  acceptText,
  alignFooter,
  withoutPadding,
  disableAccept,
  color,
  noCloseWhenClickOutside,
  styledTitle,
  ...others
}) {
  const elementsNotAllowed = ['ActionsModal', 'HeaderModal'];
  const actions = React.Children.toArray(children).find((child) =>
    Object.values(child.props).includes(elementsNotAllowed[0])
  );
  const hasActions = !!actions;
  const header = React.Children.toArray(children).find((child) =>
    Object.values(child.props).includes(elementsNotAllowed[1])
  );
  const hasHeader = !!header;
  const countButtonsInActions = hasActions ? actions.props.children.length : 1;
  const isVerticalFooter = hasActions ? actions.props.vertical : false;

  const actionsButons = hasActions ? (
    actions
  ) : (
    <Buttons
      onClose={onClose}
      onAccept={onAccept}
      hasAccept={!!onAccept}
      right={right}
      acceptText={acceptText || 'Aceptar'}
      cancelText="Cancelar"
      noCancel={noCancel}
      alignFooter={alignFooter}
      disableAccept={disableAccept}
    />
  );
  const newChildren = getChildrenByType(children, elementsNotAllowed);

  if (isVerticalFooter) {
    let heigth = heigthActionsButtons * countButtonsInActions;
    if (heigthFooter) {
      heigth = heigthFooter;
    }
    heigth += 20;
    heigth += (countButtonsInActions - 1) * 10;
    styleContainerModal = {
      ...styleContainerModal,
      gridTemplateRows: `50px 1fr ${!withoutFooter ? heigth : 0}px`,
    };
  } else {
    let heigth = heigthFooter || 44;
    heigth += 20;
    styleContainerModal = {
      ...styleContainerModal,
      gridTemplateRows: `50px 1fr ${!withoutFooter ? heigth : 0}px`,
    };
  }

  if (noHeader) {
    let heigth = heigthFooter || 44;
    heigth += 20;
    styleContainerModal = {
      ...styleContainerModal,
      gridTemplateRows: `1fr ${!withoutFooter ? heigth : 0}px`,
    };
  }

  if (isLoader) {
    styleContainerModal = {
      ...styleContainerModal,
      zIndex: 10002,
    };
  }

  if (right) {
    styleContainerModal = {
      ...styleContainerModal,
      height: '60vh',
      width: '70vw',
    };
  }

  if (autoHeigth) {
    styleContainerModal = {
      ...styleContainerModal,
      maxHeight: '95vh',
      height: 'auto',
    };
  }

  if (autoWidth) {
    styleContainerModal = {
      ...styleContainerModal,
      maxWidth: '95vw',
      width: 'auto',
    };
  }
  if (withoutPadding) {
    styleContainerModal = {
      ...styleContainerModal,
      gridGap: 0,
    };
  }

  const newModalContainerStyle = {
    ...styleContainerModal,
    width: width || styleContainerModal.width,
    height: height || styleContainerModal.height,
    ...style,
  };

  const getHeader = () => {
    if (noHeader) return null;
    if (hasHeader) return header;
    return (
      <div className={`border-t-md grid h-[50px] grid-cols-[1fr_50px] bg-light-four ${right && 'relative pl-[20px]'}`}>
        <h1
          className="m-auto font-light text-[#1f1f1f]"
          {...(isTitleCenter ? { style: { margin: 'auto', color: '#1F1F1F', ...styledTitle } } : { ...styledTitle })}
        >
          {title}
        </h1>
        {right ? (
          <div
            className="transform-[translate(-50%_-50%)] absolute left-0 top-[50%] flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-lg bg-[#f58220] text-white"
            onClick={onClose}
          >
            <IoIosArrowForward size={16} />
          </div>
        ) : (
          <div style={{ margin: 'auto', cursor: 'pointer' }} onClick={onClose}>
            {iconClosed || <MdClose size={25} color="#1F1F1F" />}
          </div>
        )}
      </div>
    );
  };

  if (right) {
    return (
      <Drawer
        anchor="right"
        className={className}
        open={open}
        ModalProps={{
          sx: { rightModalStyles },
        }}
        transitionDuration={1000}
        PaperProps={{
          elevation: 0,
          sx: {
            bgcolor: 'transparent',
            pl: 3,
            justifyContent: 'center',
          },
        }}
        onClose={noCloseWhenClickOutside ? onClose : () => {}}
        {...others}
      >
        {isLoader ? (
          <CircularProgress color="inherit" />
        ) : (
          <div style={newModalContainerStyle}>
            {getHeader()}
            <div
              className={`h-full ${hiddenOverflow ? 'overflow-y-hidden' : 'overflow-y-auto'} ${
                // eslint-disable-next-line no-nested-ternary
                right && withoutPadding ? 'p-0' : right && !withoutPadding ? 'px-[35px] py-0' : 'px-[10px] py-0'
              }`}
            >
              {newChildren}
            </div>
            {!withoutFooter ? <div style={{ margin: '10px 0px' }}>{actionsButons}</div> : null}
          </div>
        )}
      </Drawer>
    );
  }

  return (
    <Modal
      className={className}
      open={open}
      style={right ? rightModalStyles : styleModal}
      onClose={noCloseWhenClickOutside ? onClose : () => {}}
      closeAfterTransition
      {...others}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open} style={{ outline: 'none' }}>
        {isLoader ? (
          <CircularProgress color={color} />
        ) : (
          <div style={newModalContainerStyle}>
            {getHeader()}
            <div
              className={`h-full ${hiddenOverflow ? 'overflow-y-hidden' : 'overflow-y-auto'} ${
                // eslint-disable-next-line no-nested-ternary
                right && withoutPadding ? 'p-0' : right && !withoutPadding ? 'px-[35px] py-0' : 'px-[10px] py-0'
              }`}
            >
              {newChildren}
            </div>
            {!withoutFooter ? <div style={{ margin: '10px 0px' }}>{actionsButons}</div> : null}
          </div>
        )}
      </Fade>
    </Modal>
  );
};

ModalBuilder.propTypes = {
  className: PropTypes.string,
  acceptText: PropTypes.string,
  alignFooter: PropTypes.string,
  classNameModal: PropTypes.string,
  onClose: PropTypes.func,
  onAccept: PropTypes.func,
  open: PropTypes.bool,
  children: PropTypes.node,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.instanceOf(Object),
  styledTitle: PropTypes.instanceOf(Object),
  title: PropTypes.string,
  isTitleCenter: PropTypes.bool,
  heigthFooter: PropTypes.number,
  heigthActionsButtons: PropTypes.number,
  withoutFooter: PropTypes.bool,
  iconClosed: PropTypes.node,
  isLoader: PropTypes.bool,
  autoHeigth: PropTypes.bool,
  autoWidth: PropTypes.bool,
  hiddenOverflow: PropTypes.bool,
  right: PropTypes.bool,
  noCancel: PropTypes.bool,
  noHeader: PropTypes.bool,
  disableAccept: PropTypes.bool,
  withoutPadding: PropTypes.bool,
  color: PropTypes.string,
  noCloseWhenClickOutside: PropTypes.bool,
};

ModalBuilder.defaultProps = {
  className: '',
  color: '',
  acceptText: '',
  classNameModal: '',
  onClose: () => {},
  onAccept: undefined,
  open: false,
  children: <div />,
  width: '',
  height: '',
  style: {},
  styledTitle: {},
  title: '',
  isTitleCenter: false,
  heigthFooter: 0,
  heigthActionsButtons: 44,
  withoutFooter: false,
  iconClosed: undefined,
  isLoader: false,
  autoHeigth: false,
  autoWidth: false,
  hiddenOverflow: false,
  right: false,
  withoutPadding: false,
  noCancel: false,
  noHeader: false,
  disableAccept: false,
  noCloseWhenClickOutside: false,
  alignFooter: 'center' /** center|flex-end|flex-start */,
};

export default ModalBuilder;
