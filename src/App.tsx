import React, { useReducer, createContext, useState } from 'react';
import { Button } from 'antd';
import './App.css';
import 'antd/dist/antd.css';
import orderReducer from './store/reducer';
import { TOrder, TActionType } from './types/Order';
import OrderList from './components/OrderList';
import OrderForm from './components/OrderForm';

export const OrderContext = createContext<{
  orders: TOrder[];
  dispatch: React.Dispatch<{
    type: TActionType;
    params: number | TOrder | { index: number; order: TOrder };
  }>;
} | null>(null);

const App: React.FC = () => {
  const [orders, dispatch] = useReducer(orderReducer, []);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [initialOrder, setInitialOrder] = useState<TOrder | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleAddSubmit = (order: TOrder) => {
    dispatch({ type: 'add', params: order });
    setIsAdding(false);
  };

  const handleEditSubmit = (order: TOrder) => {
    dispatch({
      type: 'edit',
      params: { index: editingIndex!, order: order },
    });
    setIsEditing(false);
    setInitialOrder(null);
    setEditingIndex(null);
  };

  const makeHandleEditClick = (order: TOrder, index: number) => () => {
    setIsEditing(true);
    setInitialOrder(order);
    setEditingIndex(index);
  };

  const editFormVisible =
    isEditing && initialOrder !== null && editingIndex !== null;

  return (
    <OrderContext.Provider value={{ orders, dispatch }}>
      <Button type="primary" icon="plus" onClick={() => setIsAdding(true)}>
        Add
      </Button>
      {isAdding && <OrderForm onSubmit={handleAddSubmit} />}
      {editFormVisible && (
        <OrderForm initialOrder={initialOrder!} onSubmit={handleEditSubmit} />
      )}

      <OrderList orders={orders}>
        {(order, index) => (
          <div>
            <p>name: {order.name}</p>
            <p>price: {order.price}</p>
            <pre>
              notes: <p>{order.notes}</p>
            </pre>
            <p>
              <Button icon="edit" onClick={makeHandleEditClick(order, index)}>
                Edit
              </Button>
              <Button
                icon="delete"
                type="danger"
                onClick={() => dispatch({ type: 'delete', params: index })}
              >
                Delete
              </Button>
            </p>
          </div>
        )}
      </OrderList>
    </OrderContext.Provider>
  );
};

export default App;
