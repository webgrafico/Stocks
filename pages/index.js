import Head from 'next/head';
import React from 'react';
import { List } from '../components/CryptoList/List';
import Title from '../components/Title';
import { AppContextProvider } from '../contexts';

const Home = () => {
  return (
    <div>
      <Head>
        <title>Foxbit - Frontend Challenge</title>
        <meta name='description' content='Foxbit frontend challenge' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <Title>Foxbit - Frontend Challenge</Title>
        <AppContextProvider>
          <List />
        </AppContextProvider>
      </main>
    </div>
  );
};

export default Home;
