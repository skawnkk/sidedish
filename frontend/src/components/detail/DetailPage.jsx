<<<<<<< HEAD
import styled from 'styled-components';
import { theme, Button } from '../Theme';
import ItemPrice from '../atomic/ItemPrice';
import Badge from '../atomic/Badge';
import Loading from '../state/Loading';
import Modal from '../Modal';
import { useState } from 'react';
=======
import styled from 'styled-components'
import { theme, Button } from '../Theme'
import ItemPrice from '../atomic/ItemPrice'
import Badge from '../atomic/Badge'
import Loading from '../state/Loading'
import Modal from '../Modal'
>>>>>>> e6522264e7949ba2d8936edf686c0ac8bceaadd6

const RepresentativeBlock = styled.div`
  display: flex;
  margin: 48px;
`

const ImageBlock = styled.div`
  margin-right: 32px;
`
const MainIMG = styled.div`
  width: ${props => {
    return props.size === 'L' ? '392px' : '72px'
  }};
  height: ${props => {
    return props.size === 'L' ? '392px' : '72px'
  }};
  background-image: url(${props => props.image});
  background-size: cover;
  margin-bottom: 8px;
`
const DetailBlock = styled.div`
  width: 392px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 8px;
`
const DetailIMG = styled.div`
  width: 72px;
  height: 72px;
  background-image: url(${props => props.image});
  background-size: cover;
`
const ItemDetailInfo = styled.div``
const FlexBox = styled.div`
  display: flex;
  align-items: flex-end;
`
const PointDeliveryInfoBlock = styled.div`
  display: grid;
  grid-template-columns: 60px 364px;
  grid-gap: 16px;
`
const ItemTitleDetails = styled.span`
  font-size: ${theme.fontSize.large};
  font-weight: Bold;
  margin-bottom: 16px;
  &:hover {
    text-decoration: underline;
  }
`
const DetailText = styled.div`
  color: ${theme.colors.deep_grey_text};
`
const ItemDescDetails = styled.div`
  font-size: ${theme.fontSize.medium};
  color: ${theme.colors.grey_text};
  margin-bottom: 16px;
`
const OrderBtn = styled(Button)`
  color: ${theme.colors.white};
  font-size: ${theme.fontSize.large};
  background-color: ${props =>
    props.disabled ? theme.colors.grey_text : theme.colors.green};
  width: 440px;
  height: 58px;
  box-shadow: 0px 0px 4px rgba(204, 204, 204, 0.5),
    0px 2px 4px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(4px);
  border-radius: 5px;
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
`

const ItemDetailCards = styled.div``
const DetailCard = styled.div`
  width: 900px;
  height: 100%;
  background-image: url(${props => props.card});
`

function DetailPage ({
  loadingState,
  detailData,
  modalMode,
  setModalState,
  item,
  badges
}) {
	const [orderCount, setOrderCount] = useState(1);
	const handleClick = () => {
		setModalState(!modalMode);
	};
	let prev = 1;
	const handleChange = (e) => {
		console.log(e);
		setOrderCount(+e.target.value);
		console.log(orderCount);
	};
	return (
		<Modal {...{ modalMode, setModalState }}>
			{loadingState ? (
				<Loading width="960px" height="568px" />
			) : (
				<>
					<RepresentativeBlock className="MODAL">
						<ImageBlock>
							<MainIMG image={detailData.topImage} size="L" />
							<DetailBlock>
								{detailData.thumbImages.map((el, idx) => (
									<DetailIMG key={idx} image={el}></DetailIMG>
								))}
							</DetailBlock>
						</ImageBlock>
						<ItemDetailInfo>
							<ItemTitleDetails>{item}</ItemTitleDetails>
							<ItemDescDetails>{detailData.productDescription}</ItemDescDetails>
							<FlexBox>
								<Badge data={badges}></Badge>
								<ItemPrice
									sPrice={detailData.sPrice}
									nPrice={detailData.nPrice}
								></ItemPrice>
							</FlexBox>
							<img src="./longUnderLine.png" alt="underline"></img>
							<PointDeliveryInfoBlock>
								<ItemDescDetails>적립</ItemDescDetails>
								<DetailText>{detailData.point}</DetailText>
								<ItemDescDetails>배송정보</ItemDescDetails>
								<DetailText>{detailData.deliveryInfo}</DetailText>
								<ItemDescDetails>배송비</ItemDescDetails>
								<DetailText>{detailData.deliveryFee}</DetailText>
							</PointDeliveryInfoBlock>
							<img src="./longUnderLine.png" alt="underline"></img>

							<ItemDescDetails>수량</ItemDescDetails>
							<input
								type="number"
								name="order"
								placeholder="1"
								min="1"
								max={detailData.stock}
								onChange={handleChange}
							></input>
							<img src="./longUnderLine.png" alt="underline"></img>
							<DetailText>총 주문금액</DetailText>
							<ItemPrice>{detailData.nPrice}</ItemPrice>
							<OrderBtn
                onClick={handleClick}
                disabled={!Boolean(detailData.stock)}
              >
                {detailData.stock? "주문하기" : "상품 준비중"}
              </OrderBtn>
						</ItemDetailInfo>
					</RepresentativeBlock>
					<ItemDetailCards>
						{detailData.detailSection.map((card, idx) => (
							<DetailCard card={card} key={idx}></DetailCard>
						))}
					</ItemDetailCards>
				</>
			)}
		</Modal>
	);
}

export default DetailPage
