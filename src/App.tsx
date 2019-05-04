import React, { useReducer, createContext } from 'react';
import './App.css';
import orderReducer from './store/reducer';
import { TOrder, TActionType } from './types/Order';
import OrderList from './components/OrderList';

export const OrderContext = createContext<{
  orders: TOrder[];
  dispatch: React.Dispatch<{
    type: TActionType;
    params: number | TOrder | { index: number; order: TOrder };
  }>;
} | null>(null);

const App: React.FC = () => {
  const [orders, dispatch] = useReducer(orderReducer, []);

  return (
    <OrderContext.Provider value={{ orders, dispatch }}>
      <OrderList orders={orders}>{order => <div>{order.name}</div>}</OrderList>
    </OrderContext.Provider>
  );
};

export default App;
