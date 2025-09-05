import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  padding: 48px;
  font-family: 'Pretendard', system-ui, -apple-system, Segoe UI, Roboto,
    Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji';
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 22px;
`;

const BackButton = styled.img`
  width: 30px;
  aspect-ratio: 1;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 32px;
  color: #000;
`;

const FormContainer = styled.div`
  background-color: #F8F8F8;
  width: 100%;
  margin-top: 30px;
  padding: 48px 120px;
  display: flex;
  gap: 42px;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const AvatarContainer = styled.div`
  flex: none;
  width: 90px;
  height: 90px;
  overflow: hidden;
  border-radius: 50%;
  border: 1px solid #d1d5db;
`;

const Avatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const FormContent = styled.div`
  width: 100%;
  height: 100%;
  gap: 16px;
  display: flex;
  flex-direction: column;
`;

const CategoryRow = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

const CategoryChip = styled.div`
  background-color: #EFEFEF;
  border-radius: 50px;
  padding: 6px 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  user-select: none;

  &:hover {
    background-color: #E0E0E0;
  }

  &.selected {
    background-color: #8180F7;
    color: white;
  }
`;

const TitleInput = styled.input`
  background-color: #EFEFEF;
  padding: 12px;
  border-radius: 10px;
  font-size: 32px;
  font-weight: bold;
  color: black;
  border: none;
  outline: none;
  width: 100%;

  &::placeholder {
    color: #9CA3AF;
  }

  &:focus {
    background-color: #E5E7EB;
  }
`;

const ImageSection = styled.div`
  margin-bottom: 16px;
`;

const ImageLabel = styled.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 8px;
`;

const ImageUpload = styled.div`
  background-color: #EFEFEF;
  width: 70px;
  height: 80px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #E0E0E0;
  }
`;

const PlusIcon = styled.img`
  width: 20px;
  aspect-ratio: 1;
`;

const ContentSection = styled.div`
  margin-bottom: 16px;
`;

const ContentLabel = styled.div`
  margin-bottom: 10px;
  font-weight: 900;
  color: #000;
`;

const ContentTextarea = styled.textarea`
  background-color: #EFEFEF;
  display: flex;
  align-items: flex-start;
  padding: 20px;
  width: 100%;
  height: 480px;
  border: none;
  outline: none;
  border-radius: 10px;
  resize: none;
  font-family: inherit;
  font-size: 16px;
  line-height: 1.5;

  &::placeholder {
    color: #9CA3AF;
  }

  &:focus {
    background-color: #E5E7EB;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const SubmitButton = styled.button`
  background-color: #8180F7;
  opacity: ${props => props.disabled ? 0.5 : 1};
  width: 98px;
  height: 32px;
  border-radius: 20px;
  color: white;
  padding: 0 2px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  border: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: #6B6AE6;
    transform: translateY(-1px);
  }
`;

const ErrorMessage = styled.div`
  background-color: #FEF2F2;
  border: 1px solid #FCA5A5;
  color: #B91C1C;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 14px;
`;

const IsScamWrite = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    '보이스피싱',
    '피싱사이트', 
    '스미싱',
    '사칭',
    '기타'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleCategorySelect = (category) => {
    setFormData(prev => ({
      ...prev,
      category
    }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError('제목을 입력해주세요.');
      return false;
    }
    if (!formData.category) {
      setError('카테고리를 선택해주세요.');
      return false;
    }
    if (!formData.content.trim()) {
      setError('내용을 입력해주세요.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/isscam/posts/`;
      const requestData = {
        title: formData.title,
        author: 1, // 임시로 1로 설정 (실제로는 로그인한 사용자 ID 사용)
        category: formData.category,
        content: formData.content
      };
      
      console.log('게시글 작성 요청:', {
        url: apiUrl,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: requestData
      });
      
      const token = localStorage.getItem('access_token');
      const headers = {
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(requestData)
      });
      
      console.log('응답 상태:', response.status, response.statusText);
      
      if (!response.ok) {
        let errorMessage = '게시글 작성에 실패했습니다.';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (parseError) {
          if (response.status === 404) {
            errorMessage = 'API 엔드포인트를 찾을 수 없습니다.';
          } else if (response.status === 500) {
            errorMessage = '서버 오류가 발생했습니다.';
          } else {
            errorMessage = `서버 오류 (${response.status})`;
          }
        }
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      console.log('게시글 작성 성공:', data);
      
      // 성공 시 목록 페이지로 이동
      navigate('/isscam');
      
    } catch (error) {
      console.error('게시글 작성 에러:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Header>
        <BackButton
          src="/back.svg"
          onClick={() => navigate(-1)}
          alt="뒤로가기"
        />
        <Title>이거 사칭일까요?</Title>
      </Header>

      <FormContainer>
        <AvatarContainer>
          <Avatar
            alt="캐릭터"
            src="/agu.jpg"
          />
        </AvatarContainer>
        
        <FormContent>
          {/* 에러 메시지 */}
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          {/* 카테고리 선택 */}
          <CategoryRow>
            {categories.map((category) => (
              <CategoryChip
                key={category}
                className={formData.category === category ? 'selected' : ''}
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </CategoryChip>
            ))}
          </CategoryRow>

          {/* 제목 입력 */}
          <TitleInput
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="제목을 작성해주세요."
          />

          {/* 이미지 첨부 */}
          <ImageSection>
            <ImageLabel>사진/영상 첨부</ImageLabel>
            <ImageUpload>
              <PlusIcon src="/plus.svg" alt="이미지 추가" />
            </ImageUpload>
          </ImageSection>

          {/* 내용 작성 */}
          <ContentSection>
            <ContentLabel>사칭이 의심됩니다.</ContentLabel>
            <ContentTextarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="내용을 작성해주세요."
            />
          </ContentSection>

          {/* 등록 버튼 */}
          <ButtonContainer>
            <SubmitButton
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? '등록 중...' : '등록하기'}
            </SubmitButton>
          </ButtonContainer>
        </FormContent>
      </FormContainer>
    </Container>
  );
};

export default IsScamWrite;