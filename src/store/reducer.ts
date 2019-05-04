import { TOrder, TActionType, IActionParamsMap } from '../types/Order';

const orderReducer = <TAction extends TActionType>(
  state: TOrder[],
  action: {
    type: TAction;
    params: IActionParamsMap[TAction];
  }
) => {
  switch (action.type) {
    case 'add':
      const order = action.params as IActionParamsMap['add'];
      return [...state, order];
    case 'delete':
      const index = action.params as IActionParamsMap['delete'];
      return [...state.slice(0, index), ...state.slice(index + 1)];
    case 'edit':
      const params = action.params as IActionParamsMap['edit'];
      return [
        ...state.slice(0, params.index),
        params.order,
        ...state.slice(params.index + 1),
      ];
    default:
      return state;
  }
};

export default orderReducer;
