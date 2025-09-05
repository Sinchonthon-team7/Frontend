import { useEffect, useState } from 'react';
import PlusCircleIcon from '../../assets/PlusCircleIcon.svg';
import { useNavigate } from 'react-router-dom';

// 임시 데이터. 실제로는 API로 받아옵니다.
const SCAM_DATA = [
  { id: 1, imageUrl: 'https://picsum.photos/id/10/800/400' },
  { id: 2, imageUrl: 'https://picsum.photos/id/20/800/400' },
  { id: 3, imageUrl: 'https://picsum.photos/id/30/800/400' },
  { id: 4, imageUrl: 'https://picsum.photos/id/40/800/400' },
  { id: 5, imageUrl: 'https://picsum.photos/id/50/800/400' },
];

export const MainPage = () => {
  const [trendScam, setScam] = useState([]);
  const [title, setTitle] = useState([]);

  const navigate = useNavigate();

  const goToIsScam = () => {
    navigate('/isscam');
  };
  useEffect(() => {
    setScam(SCAM_DATA);
  }, []);

  useEffect(() => {
    setTitle(SCAM_DATA);
  }, []);

  return (
    <div className="mx-auto w-full">
      <div className="pt-25 px-30 text-[32px] font-semibold">
        <div className="flex flex-row justify-between">
          <div> 요즘 사칭 트렌드</div>
          <div className="text-[24px] text-gray-400" onClick={goToIsScam}>더보기</div>
        </div>

        {/* 슬라이더 컨테이너 */}
        <div
          className="w-full h-[360px] overflow-x-auto snap-x snap-mandatory 
        [scrollbar-width:none] [&::-webkit-scrollbar]:hidden mt-10"
        >
          {/* 슬라이더 트랙 */}
          <div className="flex w-full h-full mx-10 gap-20 shadow">
            {trendScam.map((scam, title) => (
              // 각 슬라이드 아이템
              <div
                key={scam.id}
                className="flex-shrink-0 w-[380px] h-[280px] snap-center"
              >
                <img
                  src={scam.imageUrl}
                  alt={`Scam trend ${scam.id}`}
                  className="w-full h-full object-cover rounded-[10px]"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div>이거 사칭인가요?</div>
          <div className="flex flex-row w-[960px] h-[60px] rounded-[50px] mt-5 bg-gray-100 opacity-90 font-normal text-[26px] px-5 py-[12px] drop-shadow-[2px_4px_8px_rgba(0,0,0,0.25)]">
            <div className="w-[40px] h-[40px]">
              {/* 여기 플러스버튼 */}
              <img src={PlusCircleIcon} alt="" />
            </div>
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              className="w-full bg-transparent focus:outline-none placeholder:text-gray-500 text-[22px] ml-5"
            />
          </div>
          <div className="w-full flex justify-center">
            <div className="w-[600px] mt-6 grid grid-cols-6 gap-x-7 gap-y-4 p-4">
              <div className="col-span-2 flex justify-center items-center bg-gray-100 w-full h-[40px] rounded-[40px] text-[20px] font-normal">
                카테고리
              </div>
              <div className="col-span-2 flex justify-center items-center bg-gray-100 w-full h-[40px] rounded-[40px] text-[20px] font-normal">
                카테고리
              </div>
              <div className="col-span-2 flex justify-center items-center bg-gray-100 w-full h-[40px] rounded-[40px] text-[20px] font-normal">
                카테고리
              </div>

              <div className="col-start-2 col-span-2 flex justify-center items-center bg-gray-100 w-full h-[40px] rounded-[40px] text-[20px] font-normal">
                카테고리
              </div>
              <div className="col-start-4 col-span-2 flex justify-center items-center bg-gray-100 w-full h-[40px] rounded-[40px] text-[20px] font-normal">
                카테고리
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
