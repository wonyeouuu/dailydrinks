import React from 'react';
import { Form, Input, InputNumber, Button } from 'antd';
import { TOrder } from '../types/Order';

type Props = {
  form: any;
  onSubmit: (order: TOrder) => void;
  initialOrder?: TOrder;
};

class OrderForm extends React.Component<Props> {
  private handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        this.props.onSubmit(values);
      }
    });
  };

  render() {
    const { initialOrder } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label="name" required>
          {getFieldDecorator('name', {
            rules: [{ required: true }],
            ...(initialOrder
              ? {
                  initialValue: initialOrder.name,
                }
              : {}),
          })(<Input />)}
        </Form.Item>

        <Form.Item label="price" required>
          {getFieldDecorator('price', {
            rules: [{ required: true }],
            ...(initialOrder
              ? {
                  initialValue: initialOrder.price,
                }
              : {}),
          })(<InputNumber min={0} />)}
        </Form.Item>

        <Form.Item label="notes">
          {getFieldDecorator('notes', {
            ...(initialOrder
              ? {
                  initialValue: initialOrder.notes,
                }
              : {}),
          })(<Input.TextArea />)}
        </Form.Item>

        <Button htmlType="submit">Submit</Button>
      </Form>
    );
  }
}

export default Form.create<Props>({ name: 'order' })(OrderForm);
