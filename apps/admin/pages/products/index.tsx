import {
  Button,
  Card,
  Divider,
  Drawer,
  Form,
  Input,
  Slider,
  Table,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';
import axios from 'axios';
import { from } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';

import ProductForm from '../../components/ProductForm';
import ProductOptionForm from '../../components/ProductOptionForm';
import { TABLE_COLUMNS } from './table-column.constants';

const getProductList = (query = {}) => {
  return from(
    axios.get('http://localhost:3333/api/products/', {
      params: query,
    })
  );
};

const keyGenerator = (items: Record<string, never>[], key = 'key') => {
  return items.map((item) => ({ ...item, key: item[key] }));
};

const Products = ({ productList }) => {
  const [form] = Form.useForm();
  const [products, setProducts] = useState(productList);
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

  const openProductDrawer = (id?: number) => {
    form.resetFields();
    if (!id) {
      setProductDrawerStatus(true);
      return;
    }

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

  const saveProduct = () => {
    const product = form.getFieldValue('product');

    from(
      product?.id
        ? axios.patch(
            `http://localhost:3333/api/products/${product.id}`,
            product
          )
        : axios.post(`http://localhost:3333/api/products/`, product)
    ).subscribe({
      next: () => {
        getProductList().subscribe({
          next: ({ data }) => setProducts(keyGenerator(data, 'id')),
        });
        setProductDrawerStatus(false);
        setOptionDrawerStatus(false);
      },
      error: () => alert('상품 정보를 업데이트하는데 실패하였습니다.'),
    });
  };

  const saveProductOption = () => {
    const product = form.getFieldValue(['product']);

    from(
      axios.put(`http://localhost:3333/api/products/${product.id}/options`, {
        options: (product?.options || []).map((option) => ({
          ...option,
          productId: product.id,
        })),
      })
    ).subscribe({
      next: () => {
        getProductList().subscribe({
          next: ({ data }) => setProducts(keyGenerator(data, 'id')),
        });
        setOptionDrawerStatus(false);
      },
      error: () => alert('상품 옵션 정보를 업데이트하는데 실패하였습니다.'),
    });
  };

  const searchProducts = () => {
    const filter = form.getFieldValue('filter');
    getProductList(filter).subscribe({
      next: ({ data }) => setProducts(keyGenerator(data)),
      error: () => alert('상품 목록 조회에 실패하였습니다.'),
    });
  };

  return (
    <div className="p-5">
      <Form form={form} layout="vertical">
        <div className="py-3">
          <Card>
            <Card.Grid className="w-1/4" hoverable={true}>
              <Form.Item label="상품명" name={['filter', 'name']}>
                <Input />
              </Form.Item>
            </Card.Grid>
            <Card.Grid className="w-1/4" hoverable={true}>
              <Form.Item label="브랜드" name={['filter', 'brand']}>
                <Input disabled />
              </Form.Item>
            </Card.Grid>
            <Card.Grid className="w-1/4" hoverable={true}>
              <Form.Item
                label="가격 범위"
                name={['filter', 'priceRange']}
                initialValue={[0, 1000000]}
              >
                <Slider
                  min={0}
                  max={1000000}
                  range={{ draggableTrack: true }}
                />
              </Form.Item>
            </Card.Grid>
            <Card.Grid className="w-1/4" hoverable={true}>
              <div className="flex flex-col justify-between h-full">
                <Button type="primary" onClick={() => searchProducts()}>
                  <span>
                    <SearchOutlined />
                  </span>
                  조회
                </Button>
                <Button onClick={() => form.resetFields()}>초기화</Button>
              </div>
            </Card.Grid>
          </Card>
        </div>
        <Card
          title={`총 상품 수 : - (추가 예정)`}
          extra={<Button onClick={() => openProductDrawer()}>상품 등록</Button>}
        >
          <Table dataSource={products} columns={columns}></Table>
        </Card>
        <div>
          <Drawer
            title={'상품 정보'}
            extra={<Button onClick={saveProduct}>저장</Button>}
            width="40%"
            open={productDrawerStatus}
            onClose={() => setProductDrawerStatus(false)}
          >
            <ProductForm />
            <Drawer
              title={'옵션 정보'}
              extra={<Button onClick={saveProductOption}>저장</Button>}
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
          </Drawer>
        </div>
      </Form>
    </div>
  );
};

export async function getServerSideProps() {
  const products = await (
    await fetch(`http://localhost:3333/api/products`)
  ).json();

  return {
    props: {
      productList: products.map((product) => ({ ...product, key: product.id })),
    },
  };
}

export default Products;
