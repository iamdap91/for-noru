import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to admin!</title>
      </Head>
      <main className="dark:bg-gray-600">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
