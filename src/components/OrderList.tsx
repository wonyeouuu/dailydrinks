import React from 'react';
import { TOrder } from '../types/Order';

type Props = {
  orders: TOrder[];
  children: (order: TOrder) => React.ReactNode;
};

const OrderList = ({ orders, children }: Props) => (
  <div className="order-list__container">
    <h1 className="order-list__title">Orders List</h1>
    <ul className="order-list__list">
      {orders.map(order => (
        <li>{children(order)}</li>
      ))}
    </ul>
  </div>
);

export default OrderList;
