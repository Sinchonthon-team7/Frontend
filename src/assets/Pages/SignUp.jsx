import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
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
        if (!formData.email || !formData.password || !formData.confirmPassword) {
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
            const response = await fetch('/api/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || '회원가입에 실패했습니다.');
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
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="w-full max-w-md">
                {/* 로고 위치 */}
                <div className="text-center mb-8">
                    <div className="text-gray-500 text-lg mb-2">로고위치</div>
                </div>

                {/* 에러 메시지 */}
                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}

                {/* 회원가입 폼 */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* 이메일 입력 */}
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                            사용할 이메일을 입력해주세요
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full border-b-2 border-gray-300 focus:border-[#8180F7] focus:outline-none py-2 text-lg"
                            placeholder="이메일을 입력하세요"
                            required
                        />
                    </div>

                    {/* 비밀번호 입력 */}
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                            사용할 비밀번호를 입력해주세요
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full border-b-2 border-gray-300 focus:border-[#8180F7] focus:outline-none py-2 text-lg"
                            placeholder="비밀번호를 입력하세요 (8자 이상)"
                            required
                        />
                    </div>

                    {/* 비밀번호 확인 */}
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                            비밀번호를 다시 입력해주세요
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="w-full border-b-2 border-gray-300 focus:border-[#8180F7] focus:outline-none py-2 text-lg"
                            placeholder="비밀번호를 다시 입력하세요"
                            required
                        />
                    </div>

                    {/* 다음 버튼 */}
                    <div className="flex justify-end mt-8">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-[#8180F7] hover:bg-[#6B6AE6] disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-medium text-lg transition-colors duration-200"
                        >
                            {isLoading ? '처리 중...' : '다음 >'}
                        </button>
                    </div>
                </form>

                {/* 로그인 링크 */}
                <div className="text-center mt-6">
                    <p className="text-gray-600">
                        이미 계정이 있으신가요?{' '}
                        <button
                            onClick={() => navigate('/login')}
                            className="text-[#8180F7] hover:underline font-medium"
                        >
                            로그인하기
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};