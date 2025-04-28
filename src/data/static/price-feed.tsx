import BitcoinImage from '@/assets/images/coin/bitcoin.svg';
import TetherImage from '@/assets/images/coin/tether.svg';
import CardanoImage from '@/assets/images/coin/cardano.svg';
import BinanceImage from '@/assets/images/coin/binance.svg';
//Dao images
import Dao1 from '@/assets/images/dao/01.png';
import Dao2 from '@/assets/images/dao/02.png';
import Dao3 from '@/assets/images/dao/03.png';
import Dao4 from '@/assets/images/dao/04.png';
import Dao5 from '@/assets/images/dao/05.png';
import Dao6 from '@/assets/images/dao/06.png';
import Dao7 from '@/assets/images/dao/07.png';
import Dao8 from '@/assets/images/dao/08.png';
import { Bitcoin } from '@/components/icons/bitcoin';
import { Tether } from '@/components/icons/tether';
import { Bnb } from '@/components/icons/bnb';
import { Cardano } from '@/components/icons/cardano';

export const priceFeedData = [
  {
    id: '0',
    name: 'DOFI DAO',
    symbol: 'proposals',
    balance: '21345',
    usdBalance: '11,032.24',
    logo: BitcoinImage,
    change: '+12.5%',
    isChangePositive: true,
    color: '#FDEDD4',
    icon: <Bitcoin />,
    prices: [
      { name: 1, value: 15187.44 },
      { name: 2, value: 21356.99 },
      { name: 3, value: 34698.98 },
      { name: 4, value: 37587.55 },
      { name: 5, value: 17577.4 },
      { name: 6, value: 26577.4 },
      { name: 7, value: 23577.4 },
      { name: 8, value: 18577.4 },
      { name: 9, value: 28577.4 },
    ],
  },
  {
    id: '1',
    name: 'Domain1 DAO',
    symbol: 'proposals',
    balance: '2345',
    usdBalance: '1,0324',
    logo: TetherImage,
    change: '-1.5%',
    isChangePositive: false,
    color: '#E1F9F1',
    icon: <Tether />,
    prices: [
      { name: 1, value: 12187.44 },
      { name: 2, value: 21356.99 },
      { name: 3, value: 37698.98 },
      { name: 4, value: 39587.55 },
      { name: 5, value: 29577.4 },
      { name: 6, value: 31577.4 },
      { name: 7, value: 47577.4 },
      { name: 8, value: 36577.4 },
      { name: 9, value: 28577.4 },
    ],
  },
  {
    id: '2',
    name: 'Domain2 DAO',
    symbol: 'proposals',
    balance: '2370',
    usdBalance: '5324',
    logo: CardanoImage,
    change: '+12.5%',
    isChangePositive: true,
    color: '#DBE3FF',
    icon: <Cardano />,
    prices: [
      { name: 1, value: 25187.44 },
      { name: 2, value: 21356.99 },
      { name: 3, value: 34698.98 },
      { name: 4, value: 37587.55 },
      { name: 5, value: 17577.4 },
      { name: 6, value: 26577.4 },
      { name: 7, value: 23577.4 },
      { name: 8, value: 18577.4 },
      { name: 9, value: 28577.4 },
    ],
  },
  {
    id: '3',
    name: 'Domain3 DAO',
    symbol: 'proposals',
    balance: '240.55',
    usdBalance: '34024',
    logo: BinanceImage,
    change: '+1.5%',
    isChangePositive: true,
    color: '#FBF5D5',
    icon: <Bnb />,
    prices: [
      { name: 1, value: 15187.44 },
      { name: 2, value: 16356.99 },
      { name: 3, value: 17698.98 },
      { name: 4, value: 37587.55 },
      { name: 5, value: 17577.4 },
      { name: 6, value: 20577.4 },
      { name: 7, value: 29577.4 },
      { name: 8, value: 33577.4 },
      { name: 9, value: 39577.4 },
    ],
  },
  {
    id: '4',
    name: 'Domain4 DAO',
    symbol: 'proposals',
    balance: '24089',
    usdBalance: '34024',
    logo: BinanceImage,
    change: '+1.5%',
    isChangePositive: true,
    color: '#FBF5D5',
    icon: <Bnb />,
    prices: [
      { name: 1, value: 15187.44 },
      { name: 2, value: 16356.99 },
      { name: 3, value: 17698.98 },
      { name: 4, value: 37587.55 },
      { name: 5, value: 17577.4 },
      { name: 6, value: 20577.4 },
      { name: 7, value: 29577.4 },
      { name: 8, value: 33577.4 },
      { name: 9, value: 39577.4 },
    ],
  },
  {
    id: '5',
    name: 'Domain5 DAO',
    symbol: 'proposals',
    balance: '24055',
    usdBalance: '34024',
    logo: BinanceImage,
    change: '+1.5%',
    isChangePositive: true,
    color: '#FBF5D5',
    icon: <Bnb />,
    prices: [
      { name: 1, value: 15187.44 },
      { name: 2, value: 16356.99 },
      { name: 3, value: 17698.98 },
      { name: 4, value: 37587.55 },
      { name: 5, value: 17577.4 },
      { name: 6, value: 20577.4 },
      { name: 7, value: 29577.4 },
      { name: 8, value: 33577.4 },
      { name: 9, value: 39577.4 },
    ],
  },
];

export const doaImagesData = [
  {
    id: '0',
    logo: Dao1,
  },
  {
    id: '2',
    logo: Dao2,
  },
  {
    id: '3',
    logo: Dao3,
  },
  {
    id: '4',
    logo: Dao4,
  },
  {
    id: '5',
    logo: Dao5,
  },
  {
    id: '6',
    logo: Dao6,
  },
  {
    id: '7',
    logo: Dao7,
  },
  {
    id: '8',
    logo: Dao8,
  },
];
