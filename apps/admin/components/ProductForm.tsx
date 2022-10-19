import { Form, Input } from 'antd';

const ProductForm = () => {
  return (
    <div>
      <Form.Item name={['product', 'id']} label="ID" shouldUpdate={true}>
        <Input disabled />
      </Form.Item>

      <Form.Item
        name={['product', 'name']}
        label="상품명"
        shouldUpdate={true}
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name={['product', 'price']}
        label="가격"
        shouldUpdate={true}
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name={['product', 'images']}
        label="이미지 경로"
        shouldUpdate={true}
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name={['product', 'description']}
        label="설명"
        shouldUpdate={true}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name={['product', 'manufacturer']}
        label="제조사"
        shouldUpdate={true}
      >
        <Input />
      </Form.Item>
    </div>
  );
};

export default ProductForm;
