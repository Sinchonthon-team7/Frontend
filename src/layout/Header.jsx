import { useNavigate } from 'react-router-dom';
import logo from '../assets/남사칭.png';

export const Header = () => {
  const navigate = useNavigate();

  const goToIsScam = () => {
    navigate('/isscam');
  };

  const goToScamIs = () => {
    navigate('/scamis');
  };

  const goToLogin = () => {
    navigate('/login');
  };

  const goToSignUp = () => {
    navigate('/signup');
  };

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="flex w-full h-[60px] px-[16px] bg-[#8180F7] items-center justify-between pr-30">
      <div className="flex flex-row items-center cursor-pointer" onClick={goToHome}>
        <img src={logo} className="w-[50px] h-[50px]" />
        <p className="text-white text-[16px]">남사칭</p>
      </div>

      {/* 헤더 */}
      <div className="flex gap-8">
        <div className="w-auto cursor-pointer mx-2" onClick={goToIsScam}>
          <p className="text-white text-[20px] leading-1.5 gap-2">
            사칭일까요?
          </p>
        </div>

        <div className="w-auto cursor-pointer mx-2" onClick={goToScamIs}>
          <p className="text-white text-[20px] leading-1.5">사칭이에요</p>
        </div>

        <div className="w-auto cursor-pointer" onClick={goToLogin}>
          <p className="text-white text-[16px] leading-1.5">로그인</p>
        </div>

        <div className="w-auto cursor-pointer" onClick={goToSignUp}>
          <p className="text-white text-[16px] leading-1.5">회원가입</p>
        </div>
      </div>
    </div>
  );
};
