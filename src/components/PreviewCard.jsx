// src/components/SlideCard.jsx
import React from 'react';
import styled from 'styled-components';

const SlideItemContainer = styled.div`
  flex-shrink: 0;
  width: 380px;
  height: 280px;
  scroll-snap-align: center;
  position: relative;
  border-radius: 16px; /* 이미지와 동일한 radius */
  overflow: hidden; /* 내부 요소가 삐져나가지 않도록 */
  box-shadow: 0 8px 25px rgba(78, 115, 248, 0.4); /* 이미지와 유사한 그림자 */
  color: white;
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.7),
    transparent
  ); /* 아래에서 위로 어두워지는 그라디언트 */
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* 내용을 아래로 정렬 */
  padding: 20px;
`;

const ScamTypeBadge = styled.div`
  color: #333;
  font-weight: 600;
  width: fit-content; /* 내용물 크기에 맞춤 */
  margin-bottom: 8px;
`;

const IsScamBadge = styled.div`
  background-color: #fff6ce;
  color: #ff6a00;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
  width: fit-content; /* 내용물 크기에 맞춤 */
  margin-bottom: 8px;
`;

const ScamIsBadge = styled.div`
  background-color: #ffd8d8;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
  width: fit-content; /* 내용물 크기에 맞춤 */
  margin-bottom: 8px;
  color: #ff0000;
`;

const SlideTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  margin: 0;
`;

const SlideInfo = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-top: 8px;
`;

export default function SlideCard({
  id,
  imageUrl,
  type,
  title,
  views,
  likes,
  onClick,
}) {
  // const { imageUrl, type, title, views, likes } = item;
  return (
    <SlideItemContainer key={id} onClick={() => onClick?.(id)}>
      <SlideImage src={imageUrl} alt={`Scam trend ${id}`} />
      <Overlay>
        <ScamTypeBadge>
          {type === 'isScam' ? (
            <IsScamBadge>사칭일까요?</IsScamBadge>
          ) : (
            <ScamIsBadge>사칭이에요</ScamIsBadge>
          )}
        </ScamTypeBadge>
        <SlideTitle>{title}</SlideTitle>
        <SlideInfo>
          조회 {views} 공감 {likes}
        </SlideInfo>
      </Overlay>
    </SlideItemContainer>
  );
}
