export const modalTypes = {
  CHANGE: 'modals/CHANGE',
};

export const loader = (value) => ({
  type: modalTypes.CHANGE,
  payload: value,
});
