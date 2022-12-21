import React from 'react';
import { BASE_URL_IMG } from '../../../constants';
import CryptoItem from './CryptoItem';
import Header from './Header';
import AssetIcon from './AssetIcon';
import PriceVariation from './PriceVariation';
import AssetName from './AssetName';
import AssetPrice from './AssetPrice';
import AssetPriceSign from './AssetPriceSign';
import LabelVolume from './LabelVolume';
import Volume from './Volume';

export const Item = ({ data: crypto }) => {
  const imgUrl = (name) => `${BASE_URL_IMG + name.toLowerCase()}.svg`;

  const convertToBrValue = (value, options) => value.toLocaleString('pt-br', options);

  const getVolumePrice = (value) => convertToBrValue(value, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <CryptoItem>
      <Header>
        <AssetIcon src={imgUrl(crypto.icon_svg)} />
        <PriceVariation isPositiveVariation={crypto.rolling24HrPxChange > 0 ? true : false}>
          {crypto.rolling24HrPxChange.toFixed(2)}%
        </PriceVariation>
      </Header>
      <div>
        <AssetName>{crypto.name}</AssetName>
        <AssetPrice>
          <AssetPriceSign>R$</AssetPriceSign>
          {convertToBrValue(crypto.lastTradedPx, { minimumFractionDigits: 4 })}
        </AssetPrice>
      </div>
      <div>
        <LabelVolume>Volume (24h)</LabelVolume>
        <Volume>{`${getVolumePrice(crypto.rolling24HrVolume)} ${crypto.symbol}`}</Volume>
      </div>
    </CryptoItem>
  );
};
