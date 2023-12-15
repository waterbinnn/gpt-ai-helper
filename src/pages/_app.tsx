import { Sidebar } from '../components';
import '../styles/globals.scss';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className='container'>
      <Sidebar />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
