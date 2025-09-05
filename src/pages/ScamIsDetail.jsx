import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

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

const ScamIsDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // API에서 게시글 상세 정보 가져오기
  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        setLoading(true);
        setError('');
        
        const token = localStorage.getItem('access_token');
        const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/wasscam/posts/${id}/`;
        
        console.log('게시글 상세 조회 요청:', {
          url: apiUrl,
          method: 'GET',
          headers: { 'Authorization': token ? `Bearer ${token}` : 'No token' }
        });
        
        const headers = {
          'Content-Type': 'application/json',
        };
        
        // 토큰이 있는 경우에만 Authorization 헤더 추가
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
        
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers,
        });
        
        console.log('응답 상태:', response.status, response.statusText);
        
        if (!response.ok) {
          let errorMessage = '게시글을 불러오는데 실패했습니다.';
          try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
          } catch (parseError) {
            if (response.status === 404) {
              errorMessage = '게시글을 찾을 수 없습니다.';
            } else if (response.status === 401) {
              errorMessage = '인증이 필요합니다.';
            } else if (response.status === 500) {
              errorMessage = '서버 오류가 발생했습니다.';
            } else {
              errorMessage = `서버 오류 (${response.status})`;
            }
          }
          throw new Error(errorMessage);
        }
        
        const data = await response.json();
        console.log('게시글 상세 조회 성공:', data);
        setPost(data);
        
      } catch (error) {
        console.error('게시글 상세 조회 에러:', error);
        setError(error.message);
        
        // API 실패 시 더미 데이터로 폴백
        const fallbackPost = {
          id: parseInt(id),
          title: '사칭이었어요ㅜㅜ',
          category: '보이스피싱',
          content: '이런 사기였습니다. 조심하세요.',
          created_at: new Date().toISOString(),
          views: 100,
          likes_count: 20
        };
        setPost(fallbackPost);
        setError('');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPostDetail();
    }
  }, [id]);
  
  // 로딩 중
  if (loading) {
    return (
      <Container>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>게시글을 불러오는 중...</h2>
        </div>
      </Container>
    );
  }
  
  // 에러가 있고 게시글도 없는 경우
  if (error && !post) {
    return (
      <Container>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>{error}</h2>
          <button onClick={() => navigate('/scamis')} style={{ 
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
  
  // 게시글이 없는 경우
  if (!post) {
    return (
      <Container>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>게시글을 찾을 수 없습니다.</h2>
          <button onClick={() => navigate('/scamis')} style={{ 
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

  const handleBackToScamIs = () => {
    navigate('/scamis');
  };

  return (
    <Container>
      {/* 헤더 */}
      <Header>
        <TitleSection>
          <Title>사칭이었어요ㅜㅜ</Title>
        </TitleSection>
        <ButtonSection>
          <MoreButton onClick={handleBackToScamIs}>
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
            <TimeInfo>{post.created_at ? new Date(post.created_at).toLocaleString('ko-KR') : '시간 정보 없음'}</TimeInfo>
            <PostTitle>{post.title}</PostTitle>
            <CategoryAuthor>
              <span>{post.category}</span>
            </CategoryAuthor>
          </PostInfo>
        </PostHeader>

        {/* 조회수, 공감수 */}
        <StatsSection>
          <span>조회 {post.views || 0}</span>
          <span>공감 {post.likes_count || 0}</span>
        </StatsSection>

        {/* 첨부 이미지들 */}
        <ImageSection>
          <ImagePlaceholder>이미지 1</ImagePlaceholder>
          <ImagePlaceholder>이미지 2</ImagePlaceholder>
        </ImageSection>

        {/* 게시글 본문 */}
        <ContentText>
          <PostContent>
            {post.content || '내용이 없습니다.'}
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

export default ScamIsDetail;
