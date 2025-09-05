import { useNavigate } from 'react-router-dom';
import ListTable from '../components/ListTable';
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
      <div className="font-sans flex flex-row gap-[16px] judstify-start w-full mt-[30px]">
        <div className="bg-white shadow-md rounded-[50px] px-[12px]">
          카테고리
        </div>
        <div className="bg-white shadow-md rounded-[50px] px-[12px]">
          카테고리
        </div>
        <div className="bg-white shadow-md rounded-[50px] px-[12px]">
          카테고리
        </div>
        <div className="bg-white shadow-md rounded-[50px] px-[12px]">
          카테고리
        </div>
        <div className="bg-white shadow-md rounded-[50px] px-[12px]">
          카테고리
        </div>
        <div className="bg-white shadow-md rounded-[50px] px-[12px]">
          카테고리
        </div>
      </div>
      <div className="w-full mt-[30px]">
        <ListTable items={isScamData} />
      </div>
    </div>
  );
};

export default IsScam;
