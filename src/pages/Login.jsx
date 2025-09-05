import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Styled Components
const Container = styled.div`
    min-height: 100vh;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const FormContainer = styled.div`
    width: 100%;
    max-width: 28rem; /* max-w-md */
`;

const LogoContainer = styled.div`
    text-align: center;
    margin-bottom: 2rem;
`;

const LogoText = styled.div`
    color: #6b7280; /* text-gray-500 */
    font-size: 1.125rem; /* text-lg */
    margin-bottom: 0.5rem;
`;

const ErrorMessage = styled.div`
    margin-bottom: 1rem;
    padding: 0.75rem;
    background-color: #fef2f2; /* bg-red-100 */
    border: 1px solid #fca5a5; /* border-red-400 */
    color: #b91c1c; /* text-red-700 */
    border-radius: 0.375rem;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem; /* space-y-6 */
`;

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
`;

const Label = styled.label`
    display: block;
    color: #374151; /* text-gray-700 */
    font-size: 0.875rem; /* text-sm */
    font-weight: 500; /* font-medium */
    margin-bottom: 0.5rem;
`;

const Input = styled.input`
    width: 100%;
    border-bottom: 2px solid #d1d5db; /* border-gray-300 */
    border-top: none;
    border-left: none;
    border-right: none;
    outline: none;
    padding: 0.5rem 0;
    font-size: 1.125rem; /* text-lg */
    
    &:focus {
        border-bottom-color: #8180f7; /* focus:border-[#8180F7] */
    }
    
    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 2rem;
`;

const SubmitButton = styled.button`
    background-color: #8180f7;
    color: white;
    padding: 0.75rem 2rem;
    border-radius: 0.5rem;
    font-weight: 500;
    font-size: 1.125rem;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s;
    
    &:hover:not(:disabled) {
        background-color: #6b6ae6;
    }
    
    &:disabled {
        background-color: #9ca3af;
        cursor: not-allowed;
    }
`;

const LinkContainer = styled.div`
    text-align: center;
    margin-top: 1.5rem;
`;

const LinkText = styled.p`
    color: #4b5563; /* text-gray-600 */
`;

const LinkButton = styled.button`
    color: #8180f7;
    background: none;
    border: none;
    font-weight: 500;
    cursor: pointer;
    text-decoration: underline;
    
    &:hover {
        text-decoration: underline;
    }
`;

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // 에러 메시지 초기화
        if (error) setError('');
    };

    const validateForm = () => {
        if (!formData.username || !formData.password) {
            setError('아이디와 비밀번호를 모두 입력해주세요.');
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
            const response = await fetch('/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password
                })
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || '로그인에 실패했습니다.');
            }
            
            const data = await response.json();
            
            // JWT 토큰들을 localStorage에 저장
            if (data.access && data.refresh) {
                localStorage.setItem('access_token', data.access.token);
                localStorage.setItem('access_expire_at', data.access.expire_at);
                localStorage.setItem('refresh_token', data.refresh.token);
                localStorage.setItem('refresh_expire_at', data.refresh.expire_at);
                localStorage.setItem('grant_type', data.grant_type);
            }
            
            // 성공 시 메인 페이지로 이동
            navigate('/');
            
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container>
            <FormContainer>
                {/* 로고 위치 */}
                <LogoContainer>
                    <LogoText>로고위치</LogoText>
                </LogoContainer>

                {/* 에러 메시지 */}
                {error && (
                    <ErrorMessage>
                        {error}
                    </ErrorMessage>
                )}

                {/* 로그인 폼 */}
                <Form onSubmit={handleSubmit}>
                    {/* 아이디 입력 */}
                    <InputGroup>
                        <Label>
                            아이디를 입력해주세요
                        </Label>
                        <Input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder="아이디를 입력하세요"
                            required
                        />
                    </InputGroup>

                    {/* 비밀번호 입력 */}
                    <InputGroup>
                        <Label>
                            비밀번호를 입력해주세요
                        </Label>
                        <Input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="비밀번호를 입력하세요"
                            required
                        />
                    </InputGroup>

                    {/* 로그인 버튼 */}
                    <ButtonContainer>
                        <SubmitButton
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? '로그인 중...' : '로그인'}
                        </SubmitButton>
                    </ButtonContainer>
                </Form>

                {/* 회원가입 링크 */}
                <LinkContainer>
                    <LinkText>
                        계정이 없으신가요?{' '}
                        <LinkButton
                            onClick={() => navigate('/signup')}
                        >
                            회원가입하기
                        </LinkButton>
                    </LinkText>
                </LinkContainer>
            </FormContainer>
        </Container>
    );
};

export default Login;