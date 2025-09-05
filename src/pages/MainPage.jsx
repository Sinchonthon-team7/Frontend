import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import PlusCircleIcon from '../assets/PlusCircleIcon.svg';
import SlideCard from '../components/PreviewCard';

// 임시 데이터: type과 텍스트 정보를 추가합니다.
const SCAM_DATA = [
  {
    id: 1,
    type: 'isScam',
    title: '제목제목제목제목',
    views: '00',
    likes: '00',
    imageUrl: 'https://picsum.photos/id/10/800/400',
  },
  {
    id: 2,
    type: 'scamIs',
    title: '제목제목제목제목',
    views: '00',
    likes: '00',
    imageUrl: 'https://picsum.photos/id/20/800/400',
  },
  {
    id: 3,
    type: 'isScam',
    title: '제목제목제목제목',
    views: '00',
    likes: '00',
    imageUrl: 'https://picsum.photos/id/30/800/400',
  },
  {
    id: 4,
    type: 'scamIs',
    title: '제목제목제목제목',
    views: '00',
    likes: '00',
    imageUrl: 'https://picsum.photos/id/40/800/400',
  },
  {
    id: 5,
    type: 'isScam',
    title: '제목제목제목제목',
    views: '00',
    likes: '00',
    imageUrl: 'https://picsum.photos/id/50/800/400',
  },
];

// --- Styled Components 정의 ---

const PageContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const ContentWrapper = styled.div`
  padding: 100px 120px;
  font-size: 32px;
  font-weight: 600;
`;

const TitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MoreLink = styled.div`
  font-size: 24px;
  color: #9ca3af;
  cursor: pointer;
`;

const SliderContainer = styled.div`
  width: 100%;
  height: 360px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  margin-top: 40px;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SliderTrack = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 40px; /* mx-10 대신 padding으로 변경하여 좌우 여백 확보 */
  gap: 80px;
`;

const SearchSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 960px;
  height: 60px;
  background-color: #f3f4f6;
  border-radius: 50px;
  margin-top: 20px;
  padding: 12px 20px;
  filter: drop-shadow(2px 4px 8px rgba(0, 0, 0, 0.25));
  opacity: 0.9;
`;

const Icon = styled.img`
  width: 40px;
  height: 40px;
  opacity: 0.5;
  cursor: pointer;
`;

const SearchInput = styled.input`
  width: 100%;
  background-color: transparent;
  font-size: 22px;
  margin-left: 20px;
  border: none;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #6b7280;
  }
`;

const SearchButton = styled.button`
  width: 100px;
  height: 50px;
  padding: 0.75rem;
  color: white;
  font-weight: 400;
  background-color: #aa5bff;
  border-radius: 40px;
  opacity: 0.7;
  border: none;
  cursor: pointer;
  p {
    font-size: 16px;
  }
`;

const CategoryGrid = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 24px;
`;

const GridContainer = styled.div`
  width: 600px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 28px;
  row-gap: 16px;
  padding: 16px;
`;

const CategoryItem = styled.div`
  grid-column: span 2;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3f4f6;
  width: 100%;
  height: 40px;
  border-radius: 40px;
  font-size: 20px;
  font-weight: 400;

  &:nth-child(4) {
    grid-column: 2 / span 2;
  }
  &:nth-child(5) {
    grid-column: 4 / span 2;
  }
`;

const PreviewContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 16px;
  position: relative;
`;

const PreviewImage = styled.img`
  width: 160px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid #e5e7eb;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  border: 1px solid #ccc;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
`;

const MainPage = () => {
  const [trendScam, setScam] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  const onClickSearch = () => {
    navigate('/results');
  };

  const goToIsScam = () => {
    navigate('/isscam');
  };

  useEffect(() => {
    setScam(SCAM_DATA);
  }, []);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
      setImagePreview(URL.createObjectURL(file));
      // if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removePreview = () => {
    URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <PageContainer>
      <ContentWrapper>
        <TitleSection>
          <div> 요즘 사칭 트렌드</div>
          <MoreLink onClick={goToIsScam}>더보기</MoreLink>
        </TitleSection>

        <SliderContainer>
          <SliderTrack>
            {trendScam.map((scam) => (
              <SlideCard
                key={scam.id}
                id={scam.id}
                imageUrl={scam.imageUrl}
                type={scam.type}
                title={scam.title}
                views={scam.views}
                likes={scam.likes}
                onClick={() => navigate('/results?via=preview')}
              />
            ))}
          </SliderTrack>
        </SliderContainer>

        <SearchSection>
          <div>이거 사칭인가요?</div>
          {imagePreview && (
            <PreviewContainer>
              <PreviewImage src={imagePreview} alt="Preview" />
              <RemoveButton onClick={removePreview}>X</RemoveButton>
            </PreviewContainer>
          )}
          <SearchWrapper>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
              accept="image/*"
            />
            <Icon
              src={PlusCircleIcon}
              alt="사진을 첨부하세요"
              onClick={handleIconClick}
            />
            <SearchInput type="text" placeholder="검색어를 입력하세요" />
            <SearchButton>
              <p onClick={onClickSearch}>검색하기</p>
            </SearchButton>
          </SearchWrapper>
        </SearchSection>

        <CategoryGrid>
          <GridContainer>
            <CategoryItem>카테고리</CategoryItem>
            <CategoryItem>카테고리</CategoryItem>
            <CategoryItem>카테고리</CategoryItem>
            <CategoryItem>카테고리</CategoryItem>
            <CategoryItem>카테고리</CategoryItem>
          </GridContainer>
        </CategoryGrid>
      </ContentWrapper>
    </PageContainer>
  );
};

export default MainPage;
