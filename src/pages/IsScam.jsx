import { useNavigate } from 'react-router-dom';
import ListTable from '../components/ListTable';
import Category from '../components/Category'; // 새로 만든 Category 컴포넌트를 import 합니다.
import { isScamData } from '../data/isscam';

const IsScam = () => {
  const nav = useNavigate();
  return (
    <div className="flex flex-col m-[48px] items-center font-sans">
      {/* 헤더 */}
      <div className="flex w-full justify-between items-baseline ">
        <div className="flex gap-[16px] items-baseline">
          <div className="font-sans font-black text-black text-[48px]">
            이거 사칭인가요?
          </div>
          <div>전체 게시판</div>
        </div>
        <div>
          <button
            className="bg-primary text-white font-sans w-auto h-[30px] px-[30px] py-[12px] rounded-[20px] flex items-center justify-center hover:cursor-pointer"
            onClick={() => nav('/isscam/write')}
          >
            글쓰기
          </button>
        </div>
      </div>

      {/* 기존 div들을 Category 컴포넌트로 대체합니다. */}
      <Category />

      <div className="w-full mt-[30px]">
        <ListTable items={isScamData} />
      </div>
    </div>
  );
};

export default IsScam;
