import { Button, Col, Divider, Form, Input, Row } from 'antd';
import { from } from 'rxjs';
import axios from 'axios';

const ProductOptionForm = ({ form }) => {
  const removeOption = (index: number) => {
    const options = form.getFieldValue(['product', 'options']);
    const optionToRemove = options[index];

    from(
      axios.delete(
        `http://localhost:3333/api/product-options/${optionToRemove.id}`
      )
    ).subscribe({
      error: () => alert('상품 옵션 정보를 삭제하는데에 실패하였습니다.'),
    });
  };

  return (
    <div>
      <Form.List name={['product', 'options']}>
        {(fields, { add, remove }, { errors }) => {
          return (
            <>
              {fields.map(({ key, name, ...rest }) => {
                return (
                  <div className="px-10" key={key}>
                    <Row className="flex justify-between pb-3">
                      <Col></Col>
                      <Col>
                        <Button
                          className="border-none rounded-full"
                          onClick={() => {
                            removeOption(name);
                            remove(name);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </Button>
                      </Col>
                    </Row>

                    <div>
                      <Form.Item
                        labelCol={{ span: 4 }}
                        {...rest}
                        name={[name, 'id']}
                        rules={[{ required: true }]}
                        label="ID"
                      >
                        <Input type="number" disabled />
                      </Form.Item>

                      <Form.Item
                        labelCol={{ span: 4 }}
                        {...rest}
                        name={[name, 'name']}
                        rules={[{ required: true }]}
                        label="상품명"
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        labelCol={{ span: 4 }}
                        {...rest}
                        name={[name, 'price']}
                        rules={[{ required: true }]}
                        label="가격"
                      >
                        <Input type="number" />
                      </Form.Item>

                      <Form.Item
                        labelCol={{ span: 4 }}
                        {...rest}
                        name={[name, 'stock']}
                        rules={[{ required: true }]}
                        label="재고"
                      >
                        <Input type="number" />
                      </Form.Item>

                      <Form.Item
                        labelCol={{ span: 4 }}
                        {...rest}
                        name={[name, 'color']}
                        label="색상"
                      >
                        <Input />
                      </Form.Item>
                    </div>
                    <Divider className="my-10" />
                  </div>
                );
              })}

              <div className="px-10 m-10">
                <Form.ErrorList errors={errors} />
                <Form.Item>
                  <Button
                    type="dashed"
                    className="w-full"
                    onClick={() => add({})}
                  >
                    옵션 추가
                  </Button>
                </Form.Item>
              </div>
            </>
          );
        }}
      </Form.List>
    </div>
  );
};

export default ProductOptionForm;
