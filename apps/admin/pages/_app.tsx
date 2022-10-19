import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import CustomLayout from '../components/CustomLayout';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to admin!</title>
      </Head>

      <CustomLayout>
        <main className="w-screen h-screen dark:bg-gray-800">
          <Component {...pageProps} />
        </main>
      </CustomLayout>
    </>
  );
}

export default CustomApp;
