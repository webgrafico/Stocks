import styled from 'styled-components';
import { FONT_SIZE } from '../../../constants';

const PriceVariation = styled.div`
  font-size: ${FONT_SIZE.XXS};
  display: flex;
  justify-content: flex-end;
  min-width: 30px;
  background: ${(props) => (props.isPositiveVariation ? '#EBFAF4' : '#FCEDED')};
  color: ${(props) => (props.isPositiveVariation ? '#214739' : '#5C3030')};
  border-radius: 12px;
  line-height: 0;
  padding: 10px;
  height: 0;
  font-weight: bold;
`;

export default PriceVariation;
