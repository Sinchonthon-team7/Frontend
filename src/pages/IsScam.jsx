import { useNavigate } from 'react-router-dom';

const IsScam = () => {
  const nav = useNavigate();
  return (
    <div className="flex justify-between m-[48px] items-center">
      <div className="flex justify-start gap-[16px] items-center">
        <div className="font-sans font-black text-black text-[48px]">
          이거 사칭인가요?
        </div>
        <div>전체 게시판</div>
      </div>
      <button
        className="bg-primary text-white font-sans w-auto h-[30px] px-[30px] py-[20px] rounded-[20px] flex items-center justify-center hover:cursor-pointer"
        onClick={() => nav('/isscam/write')}
      >
        글쓰기
      </button>
    </div>
  );
};

export default IsScam;
