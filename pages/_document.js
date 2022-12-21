import { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel='preload' href='/global.css' as='style' />
        <link rel='stylesheet' href='/global.css' />
      </Head>
      <body style={{ backgroundColor: 'rgb(237, 239, 245)' }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
