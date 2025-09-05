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

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
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
        if (!formData.username || !formData.password || !formData.confirmPassword) {
            setError('모든 필드를 입력해주세요.');
            return false;
        }
        
        if (formData.password !== formData.confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.');
            return false;
        }
        
        if (formData.password.length < 8) {
            setError('비밀번호는 8자 이상이어야 합니다.');
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
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password
                })
            });
            
            console.log('응답 상태:', response.status, response.statusText);
            console.log('응답 헤더:', Object.fromEntries(response.headers.entries()));
            
            if (!response.ok) {
                let errorMessage = '회원가입에 실패했습니다.';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorMessage;
                } catch (parseError) {
                    // JSON 파싱 실패 시 상태 코드로 에러 메시지 설정
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
            
            // JWT 토큰을 localStorage에 저장
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
            }
            
            // 성공 시 메인 페이지로 이동
            navigate('/');
            
        } catch (error) {
            console.error('회원가입 에러:', error);
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

                {/* 회원가입 폼 */}
                <Form onSubmit={handleSubmit}>
                    {/* 사용자명 입력 */}
                    <InputGroup>
                        <Label>
                            사용할 아이디를 입력해주세요
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
                            사용할 비밀번호를 입력해주세요
                        </Label>
                        <Input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="비밀번호를 입력하세요 (8자 이상)"
                            required
                        />
                    </InputGroup>

                    {/* 비밀번호 확인 */}
                    <InputGroup>
                        <Label>
                            비밀번호를 다시 입력해주세요
                        </Label>
                        <Input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="비밀번호를 다시 입력하세요"
                            required
                        />
                    </InputGroup>

                    {/* 다음 버튼 */}
                    <ButtonContainer>
                        <SubmitButton
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? '처리 중...' : '다음 >'}
                        </SubmitButton>
                    </ButtonContainer>
                </Form>

                {/* 로그인 링크 */}
                <LinkContainer>
                    <LinkText>
                        이미 계정이 있으신가요?{' '}
                        <LinkButton
                            onClick={() => navigate('/login')}
                        >
                            로그인하기
                        </LinkButton>
                    </LinkText>
                </LinkContainer>
            </FormContainer>
        </Container>
    );
};

export default SignUp;