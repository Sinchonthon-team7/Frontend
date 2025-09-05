import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import checked from '../assets/checked.svg';

// --- 임시 데이터 ---
// 실제로는 API를 통해 받아올 검색 결과 데이터입니다.
const MOCK_RESULTS = [
  { id: 1, type: 'isScam', title: '유사 사례 제목 1', views: '12', likes: '05', imageUrl: 'https://picsum.photos/id/101/800/400' },
  { id: 2, type: 'scamIs', title: '유사 사례 제목 2', views: '34', likes: '11', imageUrl: 'https://picsum.photos/id/102/800/400' },
  { id: 3, type: 'scamIs', title: '유사 사례 제목 3', views: '56', likes: '23', imageUrl: 'https://picsum.photos/id/103/800/400' },
  { id: 4, type: 'isScam', title: '유사 사례 제목 4', views: '78', likes: '45', imageUrl: 'https://picsum.photos/id/104/800/400' },
];


// --- Styled Components 정의 ---

const PageContainer = styled.div`
  width: 100%;
  padding: 40px 120px; /* mt-20, px-30 */
`;

const ConfirmationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px; /* gap-2 */
  margin: 20px 0 80px; /* mt-15, mb-20 */
`;

const ConfirmationText = styled.div`
  font-size: 48px;
  font-weight: 600;
  color: #397FD4;
`;

const CheckIcon = styled.img`
  width: 48px; /* 텍스트 크기에 맞게 조정 */
  height: 48px;
`;

const ResultsHeader = styled.h2`
  font-size: 28px;
  font-weight: 600;
  padding-left: 300px;
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 420px); 
  justify-content: center; 
  gap: 20px; /* 아이템 간 간격을 줄입니다. */
  margin-top: 10px;
`;

// --- 결과 카드 관련 스타일 (MainPage의 슬라이더 아이템과 유사) ---
const ResultCardContainer = styled.div`
  width: 420px; /* 고정 너비 설정 */
  height: 280px;
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  color: white;
  box-shadow: 0 8px 25px rgba(78, 115, 248, 0.3); /* drop-shadow */
`;

const CardImage = styled.img`
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
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;
`;

const IsScamBadge = styled.div`
  background-color: #fff6ce;
  color: #FF6A00;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
  width: fit-content;
  margin-bottom: 8px;
`;

const ScamIsBadge = styled.div`
  background-color: #ffd8d8;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
  width: fit-content;
  margin-bottom: 8px;
  color: #ff0000;
`;

const CardTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  margin: 0;
`;

const CardInfo = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-top: 8px;
`;


export const ResultsPage = () => {
  // 실제로는 API 호출을 통해 results 상태를 업데이트해야 합니다.
  const [results, setResults] = useState([]);

  useEffect(() => {
    // API 호출 시뮬레이션
    setResults(MOCK_RESULTS);
  }, []);

  return (
    <PageContainer>
      <ConfirmationWrapper>
        <CheckIcon src={checked} alt="Checked Icon" />
        <ConfirmationText>등록 완료!</ConfirmationText>
      </ConfirmationWrapper>

      <ResultsHeader>
        관련 서칭 사례가 {results.length}건 발견됐어요!
      </ResultsHeader>

      <ResultsGrid>
        {results.map((item) => (
          <ResultCardContainer key={item.id}>
            <CardImage src={item.imageUrl} alt={item.title} />
            <Overlay>
              {item.type === 'isScam' ? (
                <IsScamBadge>사칭일까요?</IsScamBadge>
              ) : (
                <ScamIsBadge>사칭이에요</ScamIsBadge>
              )}
              <CardTitle>{item.title}</CardTitle>
              <CardInfo>
                조회 {item.views} 공감 {item.likes}
              </CardInfo>
            </Overlay>
          </ResultCardContainer>
        ))}
      </ResultsGrid>
    </PageContainer>
  );
};
