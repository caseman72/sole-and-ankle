import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          { variant === "on-sale" && <Sale>Sale</Sale>}
          { variant === "new-release" && <JustReleased>Just Released!</JustReleased>}
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          { variant === "on-sale"
            ? <OldPrice>{formatPrice(price)}</OldPrice>
            : <Price>{formatPrice(price)}</Price>}
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          { variant === "on-sale" &&
          <SalePrice>{formatPrice(salePrice)}</SalePrice> }
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  margin: 0 36px 30px 0;
  flex: 1 1 340px;
`;

const Wrapper = styled.article`
`;

const JustReleased = styled.div`
  color: ${COLORS.white};
  background-color: ${COLORS.secondary};
  position: absolute;
  top: 12px;
  right: -4px;
  padding: 9px;
  border-radius: 4px;
  font-weight: ${WEIGHTS.bold};
`;
const Sale = styled.div`
  color: ${COLORS.white};
  background-color: ${COLORS.primary};
  position: absolute;
  top: 12px;
  right: -4px;
  padding: 9px;
  border-radius: 4px;
  font-weight: ${WEIGHTS.bold};
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 16px 16px 4px 4px;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
  margin-right: auto;
`;

const OldPrice = styled.span`
  color: ${COLORS.gray[300]};
  text-decoration: line-through;
`;
const Price = styled.span`
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
  margin-left: auto;
`;

export default ShoeCard;
