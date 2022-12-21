import React, { useState } from 'react';
import { useContext, useEffect } from 'react';
import { AppContext } from '../../../contexts';
import Title from '../../Title';
import { Item } from '../Item';
import CryptoList from './CryptoList';

export const List = () => {
  const { isLoading, instruments, updateEvents } = useContext(AppContext);
  const [cryptos, setCryptos] = useState([]);

  const handleUpdateEvents = () => {
    const data = cryptos.length ? cryptos : instruments;

    const cryptosArr = data.map((instrument) => {
      if (instrument.id === updateEvents.InstrumentId) {
        instrument = {
          ...instrument,
          lastTradedPx: updateEvents.LastTradedPx,
          rolling24HrPxChange: updateEvents.Rolling24HrPxChange,
          rolling24HrVolume: updateEvents.Rolling24HrVolume
        };
      }

      return instrument;
    });

    setCryptos(cryptosArr);
  };

  useEffect(() => {
    handleUpdateEvents();
  }, [updateEvents]);

  return (
    <>
      <Title>{isLoading ? 'loading...' : ''}</Title>
      <CryptoList>
        {cryptos?.map((crypto) => {
          return <Item key={crypto.id} data={crypto} />;
        })}
      </CryptoList>
    </>
  );
};
