import { Layout, Menu } from 'antd';
import {
  ShoppingOutlined,
  ThunderboltFilled,
  UserOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const { Sider, Content, Header } = Layout;

const items = [
  { label: 'Users', key: 'users', icon: <ShoppingOutlined /> },
  { label: 'Products', key: 'products', icon: <ShoppingOutlined /> },
  { label: 'Orders', key: 'orders', icon: <ShoppingOutlined /> },
];

const CustomLayout = ({ children }) => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="h-screen w-screen">
      <Layout>
        <Header className="flex justify-between">
          <div>
            <Link href="/" passHref>
              <ThunderboltFilled
                type="message"
                style={{ fontSize: '200%', color: '#08c' }}
              />
            </Link>
          </div>
          <div>
            <UserOutlined
              type="message"
              style={{ fontSize: '200%', color: '#08c' }}
            />
          </div>
        </Header>
      </Layout>
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          className="h-screen"
        >
          <div className="logo" />
          <Menu
            theme="dark"
            defaultSelectedKeys={['user']}
            mode="inline"
            items={items}
            onClick={({ key }) =>
              router.push(`/${key}`, `/${key}`, { scroll: true })
            }
          />
        </Sider>
        <Content className="w-full h-screen  p-10">{children}</Content>
      </Layout>
    </Layout>
  );
};

export default CustomLayout;
