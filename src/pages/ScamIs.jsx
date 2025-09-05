import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Styled Components
const Container = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
`;

const Title = styled.h1`
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
    margin: 0;
`;

const WriteButton = styled.button`
    background-color: #8180f7;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
    
    &:hover {
        background-color: #6b6ae6;
    }
`;

const BoardContainer = styled.div`
    background: white;
    border-radius: 0.75rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    overflow: hidden;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const TableHeader = styled.thead`
    background-color: #f8f9fa;
`;

const TableHeaderRow = styled.tr`
    border-bottom: 1px solid #e9ecef;
`;

const TableHeaderCell = styled.th`
    padding: 1rem;
    text-align: left;
    font-weight: 600;
    color: #495057;
    font-size: 0.875rem;
    
    &:first-child {
        width: 60px;
        text-align: center;
    }
    
    &:nth-child(2) {
        width: auto;
    }
    
    &:nth-child(3) {
        width: 100px;
    }
    
    &:nth-child(4) {
        width: 120px;
    }
    
    &:nth-child(5) {
        width: 100px;
    }
    
    &:nth-child(6) {
        width: 80px;
        text-align: center;
    }
    
    &:last-child {
        width: 80px;
        text-align: center;
    }
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
    border-bottom: 1px solid #f1f3f4;
    cursor: pointer;
    transition: background-color 0.2s;
    
    &:hover {
        background-color: #f8f9fa;
    }
    
    &:last-child {
        border-bottom: none;
    }
`;

const TableCell = styled.td`
    padding: 1rem;
    font-size: 0.875rem;
    color: #495057;
    
    &:first-child {
        text-align: center;
        color: #6c757d;
    }
    
    &:nth-child(2) {
        font-weight: 500;
    }
    
    &:nth-child(6) {
        text-align: center;
    }
    
    &:last-child {
        text-align: center;
    }
`;

const CategoryTag = styled.span`
    background-color: #e3f2fd;
    color: #1976d2;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    font-weight: 500;
`;

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3rem;
    color: #6c757d;
`;

const ErrorContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3rem;
    color: #dc3545;
`;

// 게시글 작성 모달 컴포넌트
const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background: white;
    border-radius: 0.75rem;
    padding: 2rem;
    width: 90%;
    max-width: 600px;
    max-height: 80vh;
    overflow-y: auto;
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h2`
    font-size: 1.25rem;
    font-weight: bold;
    margin: 0;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #6c757d;
    
    &:hover {
        color: #495057;
    }
`;

const FormGroup = styled.div`
    margin-bottom: 1rem;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #495057;
`;

const Input = styled.input`
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ced4da;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    
    &:focus {
        outline: none;
        border-color: #8180f7;
        box-shadow: 0 0 0 2px rgba(129, 128, 247, 0.25);
    }
`;

const Select = styled.select`
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ced4da;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    background-color: white;
    
    &:focus {
        outline: none;
        border-color: #8180f7;
        box-shadow: 0 0 0 2px rgba(129, 128, 247, 0.25);
    }
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ced4da;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    min-height: 200px;
    resize: vertical;
    
    &:focus {
        outline: none;
        border-color: #8180f7;
        box-shadow: 0 0 0 2px rgba(129, 128, 247, 0.25);
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 0.75rem;
    justify-content: flex-end;
    margin-top: 1.5rem;
`;

const Button = styled.button`
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    
    ${props => props.primary ? `
        background-color: #8180f7;
        color: white;
        border: none;
        
        &:hover {
            background-color: #6b6ae6;
        }
        
        &:disabled {
            background-color: #9ca3af;
            cursor: not-allowed;
        }
    ` : `
        background-color: white;
        color: #6c757d;
        border: 1px solid #ced4da;
        
        &:hover {
            background-color: #f8f9fa;
        }
    `}
`;

const ScamIs = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showWriteModal, setShowWriteModal] = useState(false);
    const [writeForm, setWriteForm] = useState({
        title: '',
        category: '',
        subcategory: '',
        content: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 게시글 목록 조회
    const fetchPosts = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('access_token');
            
            const response = await fetch('/api/wasscam/posts', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('API Error Response:', errorText);
                throw new Error(`게시글 목록을 불러오는데 실패했습니다. (${response.status})`);
            }
            
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const responseText = await response.text();
                console.error('Non-JSON Response:', responseText);
                throw new Error('서버에서 유효하지 않은 응답을 받았습니다.');
            }
            
            const data = await response.json();
            setPosts(data.posts || []);
        } catch (error) {
            console.error('Fetch Posts Error:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // 게시글 작성
    const handleWriteSubmit = async (e) => {
        e.preventDefault();
        
        if (!writeForm.title || !writeForm.category || !writeForm.subcategory || !writeForm.content) {
            alert('모든 필드를 입력해주세요.');
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            const token = localStorage.getItem('access_token');
            const formData = new FormData();
            
            formData.append('title', writeForm.title);
            formData.append('category', writeForm.category);
            formData.append('subcategory', writeForm.subcategory);
            formData.append('content', writeForm.content);
            
            const response = await fetch('/api/wasscam/create', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('API Error Response:', errorText);
                
                // JSON 응답인지 확인
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    try {
                        const errorData = JSON.parse(errorText);
                        throw new Error(errorData.message || '게시글 작성에 실패했습니다.');
                    } catch (parseError) {
                        throw new Error(`게시글 작성에 실패했습니다. (${response.status})`);
                    }
                } else {
                    throw new Error(`게시글 작성에 실패했습니다. (${response.status})`);
                }
            }
            
            // 성공 시 모달 닫기 및 목록 새로고침
            setShowWriteModal(false);
            setWriteForm({ title: '', category: '', subcategory: '', content: '' });
            fetchPosts();
            
        } catch (error) {
            console.error('Write Post Error:', error);
            alert(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    // 게시글 클릭 시 상세 조회
    const handlePostClick = (postId) => {
        navigate(`/scamis/${postId}`);
    };

    useEffect(() => {
        // 임시로 더미 데이터 설정 (API 서버가 준비되지 않은 경우)
        const dummyPosts = [
            {
                id: 1,
                title: "신천지로 의심되는 동아리리이 |",
                author: "룰루",
                category: "보이스피싱",
                createdAt: "10분전",
                views: 200,
                likes: 37
            },
            {
                id: 2,
                title: "신천지로 의심되는 동아리리이 |",
                author: "룰루",
                category: "보이스피싱",
                createdAt: "10분전",
                views: 200,
                likes: 37
            },
            {
                id: 3,
                title: "신천지로 의심되는 동아리리이 |",
                author: "룰루",
                category: "보이스피싱",
                createdAt: "10분전",
                views: 200,
                likes: 37
            },
            {
                id: 4,
                title: "신천지로 의심되는 동아리리이 |",
                author: "룰루",
                category: "보이스피싱",
                createdAt: "10분전",
                views: 200,
                likes: 37
            },
            {
                id: 5,
                title: "신천지로 의심되는 동아리리이 |",
                author: "룰루",
                category: "보이스피싱",
                createdAt: "10분전",
                views: 200,
                likes: 37
            },
            {
                id: 6,
                title: "신천지로 의심되는 동아리리이 |",
                author: "룰루",
                category: "보이스피싱",
                createdAt: "10분전",
                views: 200,
                likes: 37
            }
        ];
        
        // API 호출 시도, 실패 시 더미 데이터 사용
        fetchPosts().catch(() => {
            console.log('API 호출 실패, 더미 데이터 사용');
            setPosts(dummyPosts);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <Container>
                <LoadingContainer>게시글을 불러오는 중...</LoadingContainer>
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <ErrorContainer>{error}</ErrorContainer>
            </Container>
        );
    }

    return (
        <Container>
            <Header>
                <Title>사칭이었어요ㅜㅜ 전체 게시판</Title>
                <WriteButton onClick={() => setShowWriteModal(true)}>
                    글쓰기
                </WriteButton>
            </Header>

            <BoardContainer>
                <Table>
                    <TableHeader>
                        <TableHeaderRow>
                            <TableHeaderCell>번호</TableHeaderCell>
                            <TableHeaderCell>제목</TableHeaderCell>
                            <TableHeaderCell>작성자</TableHeaderCell>
                            <TableHeaderCell>카테고리</TableHeaderCell>
                            <TableHeaderCell>작성일</TableHeaderCell>
                            <TableHeaderCell>조회수</TableHeaderCell>
                            <TableHeaderCell>공감수</TableHeaderCell>
                        </TableHeaderRow>
                    </TableHeader>
                    <TableBody>
                        {posts.map((post, index) => (
                            <TableRow key={post.id} onClick={() => handlePostClick(post.id)}>
                                <TableCell>{post.id}</TableCell>
                                <TableCell>{post.title}</TableCell>
                                <TableCell>{post.author}</TableCell>
                                <TableCell>
                                    <CategoryTag>{post.category}</CategoryTag>
                                </TableCell>
                                <TableCell>{post.createdAt}</TableCell>
                                <TableCell>{post.views}</TableCell>
                                <TableCell>{post.likes}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </BoardContainer>

            {/* 게시글 작성 모달 */}
            {showWriteModal && (
                <ModalOverlay onClick={() => setShowWriteModal(false)}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <ModalHeader>
                            <ModalTitle>게시글 작성</ModalTitle>
                            <CloseButton onClick={() => setShowWriteModal(false)}>×</CloseButton>
                        </ModalHeader>
                        
                        <form onSubmit={handleWriteSubmit}>
                            <FormGroup>
                                <Label>제목</Label>
                                <Input
                                    type="text"
                                    value={writeForm.title}
                                    onChange={(e) => setWriteForm(prev => ({ ...prev, title: e.target.value }))}
                                    placeholder="제목을 입력하세요"
                                    required
                                />
                            </FormGroup>
                            
                            <FormGroup>
                                <Label>카테고리</Label>
                                <Select
                                    value={writeForm.category}
                                    onChange={(e) => setWriteForm(prev => ({ ...prev, category: e.target.value }))}
                                    required
                                >
                                    <option value="">카테고리를 선택하세요</option>
                                    <option value="보이스피싱">보이스피싱</option>
                                    <option value="피싱사이트">피싱사이트</option>
                                    <option value="스미싱">스미싱</option>
                                    <option value="기타">기타</option>
                                </Select>
                            </FormGroup>
                            
                            <FormGroup>
                                <Label>세부 카테고리</Label>
                                <Select
                                    value={writeForm.subcategory}
                                    onChange={(e) => setWriteForm(prev => ({ ...prev, subcategory: e.target.value }))}
                                    required
                                >
                                    <option value="">세부 카테고리를 선택하세요</option>
                                    <option value="금융사기">금융사기</option>
                                    <option value="개인정보유출">개인정보유출</option>
                                    <option value="가짜앱">가짜앱</option>
                                    <option value="기타">기타</option>
                                </Select>
                            </FormGroup>
                            
                            <FormGroup>
                                <Label>내용</Label>
                                <TextArea
                                    value={writeForm.content}
                                    onChange={(e) => setWriteForm(prev => ({ ...prev, content: e.target.value }))}
                                    placeholder="내용을 입력하세요"
                                    required
                                />
                            </FormGroup>
                            
                            <ButtonGroup>
                                <Button type="button" onClick={() => setShowWriteModal(false)}>
                                    취소
                                </Button>
                                <Button type="submit" primary disabled={isSubmitting}>
                                    {isSubmitting ? '작성 중...' : '작성하기'}
                                </Button>
                            </ButtonGroup>
                        </form>
                    </ModalContent>
                </ModalOverlay>
            )}
        </Container>
    );
};

export default ScamIs;