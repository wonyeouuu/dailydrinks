export type TOrder = {
  name: string;
  price: number;
  notes?: string;
};

export interface IActionParamsMap {
  add: TOrder;
  delete: number;
  edit: {
    index: number;
    order: TOrder;
  };
}

export type TActionType = keyof IActionParamsMap;
