import warning from 'warning';
import compose from 'compose-function';

export const SHOW = '@sweetalert/SHOW';
export const DISMISS = '@sweetalert/DISMISS';


const ALLOWS_KEYS = [
  // sweetalert option
  'title',
  'text',
  'type',
  'customClass',
  'showCancelButton',
  'showConfirmButton',
  'confirmButtonText',
  'confirmButtonColor',
  'cancelButtonText',
  'imageUrl',
  'imageSize',
  'html',
  'animation',
  'inputType',
  'inputValue',
  'inputPlaceholder',
  'showLoaderOnConfirm',

  'closeOnConfirm',
  'closeOnCancel',

  // custom option
  'onConfirm',
  'onCancel',
  'onClose',
  'onEscapeKey',
  'onOutsideClick',
];

export const dismiss = () => ({
  type: DISMISS,
});


function getInvalidProps(payload) {
  return Object.keys(payload).filter(key => ALLOWS_KEYS.indexOf(key) === -1);
}

function warningInvalidProps(payload) {
  const invalidProps = getInvalidProps(payload);
  invalidProps.forEach(prop => {
    warning(false, `Property ${prop} is invalid. You can not pass it to SweetAlert`);
  });
}


function createCloseOnConfirmTransform(dispatch) {
  return ({ closeOnConfirm, ...payload }) => ({
    ...payload,
    onConfirm: (...args) => {
      if (typeof payload.onConfirm === 'function') payload.onConfirm(...args);
      if (closeOnConfirm !== false) {
        dispatch(dismiss());
      }
    },
  });
}

function createCloseOnCancelTransform(dispatch) {
  return ({ closeOnCancel, ...payload }) => ({
    ...payload,
    onCancel: (...args) => {
      if (typeof payload.onCancel === 'function') payload.onCancel(...args);
      if (closeOnCancel !== false) {
        dispatch(dismiss());
      }
    },
  });
}

function createAllowEscapeKeyTransform(dispatch) {
  return ({ allowEscapeKey, ...payload }) => ({
    ...payload,
    onEscapeKey: (...args) => {
      if (typeof payload.onEscapeKey === 'function') payload.onEscapeKey(...args);
      if (allowEscapeKey !== false) {
        dispatch(dismiss());
      }
    },
  });
}

function createAllowOutsideClickTransform(dispatch) {
  return ({ allowOutsideClick, ...payload }) => ({
    ...payload,
    onOutsideClick: (...args) => {
      if (typeof payload.onOutsideClick === 'function') payload.onOutsideClick(...args);
      if (allowOutsideClick === true) {
        dispatch(dismiss());
      }
    },
  });
}


export const sweetalert = payload => {
  warningInvalidProps(payload);
  return dispatch => {
    const closeOnConfirm = createCloseOnConfirmTransform(dispatch);
    const closeOnCancel = createCloseOnCancelTransform(dispatch);
    const allowEscapeKey = createAllowEscapeKeyTransform(dispatch);
    const allowOutsideClick = createAllowOutsideClickTransform(dispatch);

    const transform = compose(
      closeOnConfirm,
      closeOnCancel,
      allowEscapeKey,
      allowOutsideClick,
    );

    dispatch({
      type: SHOW,
      payload: transform(payload),
    });
  };
};

