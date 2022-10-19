import { ColumnsType } from 'antd/es/table';

export const TABLE_COLUMNS: ColumnsType<any> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: (_, { price }) => `₩ ${price.toLocaleString()}`,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    render: (_, { description = '' }) => {
      if (!description || description?.length < 30) {
        return description;
      }

      return description?.slice(0, 30) + '...';
    },
  },
  {
    title: 'Manufacturer',
    dataIndex: 'manufacturer',
    key: 'manufacturer',
  },
  // {
  //   title: 'Edit',
  //   key: 'edit',
  //   render: () => <Button>Edit</Button>,
  // },
];
