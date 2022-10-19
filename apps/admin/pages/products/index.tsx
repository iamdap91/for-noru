import { Button, Col, Divider, Drawer, Form, Row, Table } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import { useState } from 'react';
import axios from 'axios';
import { from } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';

import ProductForm from '../../components/ProductForm';
import ProductOptionForm from '../../components/ProductOptionForm';
import { TABLE_COLUMNS } from './table-column.constants';

const Products = ({ products }) => {
  const [form] = Form.useForm();
  const [productDrawerStatus, setProductDrawerStatus] = useState(false);
  const [optionDrawerStatus, setOptionDrawerStatus] = useState(false);
  const columns = [
    ...TABLE_COLUMNS,
    {
      title: 'Edit',
      key: 'edit',
      render: (product) => (
        <Button onClick={() => openProductDrawer(product.id)}>Edit</Button>
      ),
    },
  ];

  const openProductDrawer = (id: number) => {
    form.resetFields();

    fromFetch(`http://localhost:3333/api/products/${id}`, {
      selector: (res) => res.json(),
    }).subscribe({
      next: (product) => {
        form.setFieldValue('product', product);
        setProductDrawerStatus(true);
      },
      error: () => alert('상품 정보를 가져오는데 실패하였습니다.'),
    });
  };

  const openOptionDrawer = (id: number) => {
    form.setFieldValue(['product', 'options'], null);
    fromFetch(`http://localhost:3333/api/products/${id}/options`, {
      selector: (res) => res.json(),
    }).subscribe({
      next: (options) => {
        form.setFieldValue(['product', 'options'], options);
        setOptionDrawerStatus(true);
      },
      error: () => alert('상품 정보를 가져오는데 실패하였습니다.'),
    });
  };

  const onProductSave = () => {
    const product = form.getFieldValue('product');
    from(
      axios.patch(`http://localhost:3333/api/products/${product.id}`, product)
    ).subscribe({
      error: () => alert('상품 정보를 업데이트하는데 실패하였습니다.'),
    });
  };

  const onProductOptionSave = () => {
    const product = form.getFieldValue(['product']);

    from(
      axios.put(`http://localhost:3333/api/products/${product.id}/options`, {
        options: (product?.options || []).map((option) => ({
          ...option,
          productId: product.id,
        })),
      })
    ).subscribe({
      error: (e) => {
        console.error(e);
        alert('상품 옵션 정보를 업데이트하는데 실패하였습니다.');
      },
    });
  };

  return (
    <div className="p-5">
      <div className="p-5">
        <Row className="flex justify-between">
          <Col></Col>
          <Col>
            <Button className="border-none text-3xl rounded-full">
              <PlusCircleFilled />
            </Button>
          </Col>
        </Row>
      </div>
      <Table dataSource={products} columns={columns}></Table>
      <div>
        <Drawer
          title={'상품 정보'}
          extra={<Button onClick={onProductSave}>저장</Button>}
          width="40%"
          open={productDrawerStatus}
          onClose={() => setProductDrawerStatus(false)}
        >
          <Form form={form} layout="vertical">
            <ProductForm />
            <Drawer
              title={'옵션 정보'}
              extra={<Button onClick={onProductOptionSave}>저장</Button>}
              width="40%"
              open={optionDrawerStatus}
              onClose={() => setOptionDrawerStatus(false)}
            >
              <ProductOptionForm form={form} />
            </Drawer>

            <Divider className="mt-10 mb-10"></Divider>
            <Button
              className="w-full"
              onClick={() => openOptionDrawer(form.getFieldValue('product').id)}
            >
              상품 옵션 보기
            </Button>
          </Form>
        </Drawer>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const products = await (
    await fetch(`http://localhost:3333/api/products`)
  ).json();

  return {
    props: {
      products: products.map((product) => ({ ...product, key: product.id })),
    },
  };
}

export default Products;
