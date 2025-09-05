import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();

  const goToIsScam = () => {
    navigate('/isscam');
  };

  const goToScamIs = () => {
    navigate('/scamis');
  };
  
  const goToLogin = () => {
    navigate('/login')
  }

  return (
    <div className="flex w-full h-[60px] px-[16px] bg-[#8180F7] items-center">
      <div className="w-[40px] h-[40px]">{/* 로고 넣기*/}</div>

      {/* 헤더 */}
      <div className="flex gap-10">
        <div className="w-[100px] cursor-pointer" onClick={goToIsScam}>
          <p className="text-white text-[20px] leading-1.5">사칭일까요?</p>
        </div>
        <div className="w-[100px] cursor-pointer" onClick={goToScamIs}>
          <p className="text-white text-[20px] leading-1.5">사칭이에요</p>
        </div>
        <div className="w-[100px] cursor-pointer" onClick={goToLogin}>
          <p className="text-white text-[20px] leading-1.5">사칭이에요</p>
        </div>
      </div>
    </div>
  );
};
