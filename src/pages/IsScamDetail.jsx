import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { isScamData } from '../data/isscam';

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 48px;
  align-items: center;
  font-family: sans-serif;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: baseline;
`;

const TitleSection = styled.div`
  display: flex;
  gap: 16px;
  align-items: baseline;
`;

const Title = styled.div`
  font-family: sans-serif;
  font-weight: 900;
  color: black;
  font-size: 48px;
`;

const ButtonSection = styled.div`
  display: flex;
  gap: 16px;
`;

const Button = styled.button`
  font-family: sans-serif;
  width: auto;
  height: 30px;
  padding: 12px 30px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const MoreButton = styled(Button)`
  background-color: #8180F7;
  color: white;

  &:hover {
    background-color: #6B6AE6;
  }
`;

const EditButton = styled(Button)`
  background-color: #FFB4D7;
  color: white;

  &:hover {
    background-color: #FF9BC7;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  margin-top: 30px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 24px;
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TimeInfo = styled.div`
  font-size: 14px;
  color: #6B7280;
`;

const PostTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #1F2937;
`;

const CategoryAuthor = styled.div`
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: #4B5563;
`;

const StatsSection = styled.div`
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 16px;
`;

const ImageSection = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
`;

const ImagePlaceholder = styled.div`
  width: 128px;
  height: 128px;
  background-color: #E5E7EB;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #6B7280;
`;

const ContentText = styled.div`
  margin-bottom: 24px;
`;

const PostContent = styled.p`
  color: #374151;
  line-height: 1.6;
  margin: 0;
`;

const CommentSection = styled.div`
  border-top: 1px solid #E5E7EB;
  padding-top: 16px;
`;

const CommentInputArea = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  background-color: #D1D5DB;
  border-radius: 50%;
`;

const CommentInputContainer = styled.div`
  flex: 1;
`;

const CommentTextarea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #D1D5DB;
  border-radius: 8px;
  resize: none;
  font-family: sans-serif;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #8180F7;
    box-shadow: 0 0 0 3px rgba(129, 128, 247, 0.1);
  }
`;

const CharacterCount = styled.div`
  text-align: right;
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
`;

const SubmitButtonContainer = styled.div`
  text-align: right;
`;

const SubmitButton = styled.button`
  background-color: #8180F7;
  color: white;
  padding: 8px 24px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background-color: #6B6AE6;
    transform: translateY(-1px);
  }
`;

const NoComments = styled.div`
  margin-top: 24px;
  text-align: center;
  color: #6B7280;
`;

// 시간 계산 함수
const getTimeAgo = (timestamp) => {
  const now = Date.now();
  const diff = now - timestamp;
  
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (minutes < 60) {
    return `${minutes}분 전`;
  } else if (hours < 24) {
    return `${hours}시간 전`;
  } else {
    return `${days}일 전`;
  }
};

const IsScamDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // URL 파라미터로 받은 ID에 해당하는 게시글 데이터 찾기
  const post = isScamData.find(item => item.id === parseInt(id));
  
  // 게시글을 찾지 못한 경우
  if (!post) {
    return (
      <Container>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>게시글을 찾을 수 없습니다.</h2>
          <button onClick={() => navigate('/isscam')} style={{ 
            marginTop: '20px', 
            padding: '10px 20px', 
            backgroundColor: '#8180F7', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px',
            cursor: 'pointer'
          }}>
            목록으로 돌아가기
          </button>
        </div>
      </Container>
    );
  }

  const handleBackToIsScam = () => {
    navigate('/isscam');
  };

  return (
    <Container>
      {/* 헤더 */}
      <Header>
        <TitleSection>
          <Title>이거 사칭인가요?</Title>
        </TitleSection>
        <ButtonSection>
          <MoreButton onClick={handleBackToIsScam}>
            더보기
          </MoreButton>
          <EditButton>
            수정하기
          </EditButton>
        </ButtonSection>
      </Header>

      {/* 게시글 내용 */}
      <ContentContainer>
        {/* 게시글 헤더 정보 */}
        <PostHeader>
          <PostInfo>
            <TimeInfo>{getTimeAgo(post.createdAt)}</TimeInfo>
            <PostTitle>{post.title}</PostTitle>
            <CategoryAuthor>
              <span>{post.category}</span>
              <span>{post.author}</span>
            </CategoryAuthor>
          </PostInfo>
        </PostHeader>

        {/* 조회수, 공감수 */}
        <StatsSection>
          <span>조회 {post.views}</span>
          <span>공감 {post.likes}</span>
        </StatsSection>

        {/* 첨부 이미지들 */}
        <ImageSection>
          <ImagePlaceholder>이미지 1</ImagePlaceholder>
          <ImagePlaceholder>이미지 2</ImagePlaceholder>
        </ImageSection>

        {/* 게시글 본문 */}
        <ContentText>
          <PostContent>
            글글그르그르 글글그르그르 글글그르그르 글글그르그르 글글그르그르 글글그르그르
            글글그르그르 글글그르그르 글글그르그르 글글그르그르 글글그르그르 글글그르그르
            글글그르그르 글글그르그르 글글그르그르 글글그르그르 글글그르그르 글글그르그르
            글글그르그르 글글그르그르 글글그르그르 글글그르그르 글글그르그르 글글그르그르
            글글그르그르 글글그르그르 글글그르그르 글글그르그르 글글그르그르 글글그르그르
            글글그르그르 글글그르그르 글글그르그르 글글그르그르 글글그르그르 글글그르그르
            글글그르그르 글글그르그르 글글그르그르 글글그르그르 글글그르그르 글글그르그르
            글글그르그르 글글그르그르 글글그르그르 글글그르그르 글글그르그르 글글그르그르
            글글그르그르 글글그르그르 글글그르그르 글글그르그르 글글그르그르 글글그르그르
            글글그르그르 글글그르그르 글글그르그르 글글그르그르 글글그르그르 글글그르그르
          </PostContent>
        </ContentText>

        {/* 댓글 섹션 */}
        <CommentSection>
          <CommentInputArea>
            <Avatar />
            <CommentInputContainer>
              <CommentTextarea
                placeholder="댓글을 작성해주세요..."
                rows="3"
                maxLength="200"
              />
              <CharacterCount>0/200자</CharacterCount>
            </CommentInputContainer>
          </CommentInputArea>
          <SubmitButtonContainer>
            <SubmitButton>
              등록하기
            </SubmitButton>
          </SubmitButtonContainer>
          
          <NoComments>
            아직 댓글이 없어요
          </NoComments>
        </CommentSection>
      </ContentContainer>
    </Container>
  );
};

export default IsScamDetail;
