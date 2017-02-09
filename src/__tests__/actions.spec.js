/* eslint-disable no-console */
import {
  SHOW,
  DISMISS,
  sweetalert,
  dismiss,
} from '../actions';


beforeEach(() => {
  console.error = jest.fn();
});

describe('sweetalert', () => {
  it('should create SHOW action', () => {
    const payload = { title: 'show' };
    expect(sweetalert(payload)).toEqual({
      type: SHOW,
      payload: { title: 'show' },
    });
    expect(console.error).not.toBeCalled();
  });

  it('should allow custom option in payload', () => {
    const payload = {
      title: 'show',
      onCancel: () => {},
    };
    sweetalert(payload);
    expect(console.error).not.toBeCalled();
  });

  it('should warn for invalid props', () => {
    const payload = { titl: 'show' };
    sweetalert(payload);
    expect(console.error).toBeCalledWith(
      'Warning: Property titl is invalid. You can not pass it to SweetAlert',
    );
  });
});

describe('dismiss', () => {
  it('should create DISMISS action', () => {
    expect(dismiss()).toEqual({
      type: DISMISS,
    });
  });
});
