import React, { createContext, useState, useEffect } from 'react';
import parseEvent from '../utils';

const initialValue = {
  isLoading: false,
  instruments: [],
  updateEvents: []
};

export const AppContext = createContext(initialValue);

export const AppContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(initialValue.isLoading);
  const [instruments, setInstruments] = useState(initialValue.instruments);
  const [updateEvents, setUpdateEvents] = useState(initialValue.updateEvents);

  useEffect(() => {
    const ws = new WebSocket('wss://api.foxbit.com.br/');

    ws.addEventListener('open', function open() {
      console.log('connected');
      setIsLoading(true);

      // GET INSTRUMENTS
      const payloadInstruments = {
        m: 0,
        i: 2,
        n: 'GetInstruments',
        o: JSON.stringify({ OMSID: 3 })
      };

      ws.send(JSON.stringify(payloadInstruments));
    });

    ws.addEventListener('close', function close() {
      console.log('disconnected');
    });

    ws.onmessage = function (event) {
      const { data, eventName } = parseEvent(event);

      if (eventName === 'GetInstruments') {
        const newInstrumentsDataStructure = data.reduce((acc, item) => {
          if (ws.readyState === 1) {
            const payload = {
              m: 0,
              i: 2,
              n: 'SubscribeLevel1',
              o: JSON.stringify({ InstrumentId: item.InstrumentId })
            };

            ws.send(JSON.stringify(payload));
          }

          acc.push({
            id: item.InstrumentId,
            icon_svg: item.Product1Symbol || 'default-currency',
            rolling24HrVolume: item?.Rolling24HrVolume ?? 0,
            name: item.Symbol,
            lastTradedPx: item?.LastTradedPx ?? 0,
            rolling24HrPxChange: item?.Rolling24HrPxChange ?? 0,
            symbol: item.Product1Symbol
          });

          return acc;
        }, []);

        setInstruments(newInstrumentsDataStructure);
        setIsLoading(false);
      }

      if (eventName === 'SubscribeLevel1') {
        setUpdateEvents(data);
      }

      if (eventName === 'Level1UpdateEvent') {
        setUpdateEvents(data);
      }
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        instruments,
        updateEvents
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
