import { useNavigate } from 'react-router-dom';

const IsScamWrite = () => {
  const nav = useNavigate();
  return (
    <div className="m-[48px] font-sans">
      <div className="flex justify-start items-center gap-[16px]">
        <img
          src="/back.svg"
          className="w-[30px] aspect-square hover:cursor-pointer"
          onClick={() => nav(-1)}
        />
        <div className="font-bold text-[32px]">이거 사칭일까요?</div>
      </div>
      <div className="bg-[#F8F8F8] h-dvh w-full mt-[30px] py-[48px] px-[120px] flex gap-[42px]">
        <div>캐릭터</div>
        <div className="w-full h-full gap-[16px] flex flex-col">
          <div>카테고리</div>
          <div className="text-[32px] font-bold">제목을 작성해주세요</div>
          <div>
            {/* 사진/영상 첨부 */}
            <div className="text-[12px] text-gray-600 mb-[8px]">
              사진/영상 첨부
            </div>
            <div className="bg-white w-[70px] h-[80px] rounded-[10px] flex justify-center">
              <img
                src="/plus.svg"
                className="w-[20px]  justify-center items-center aspect-square hover:cursor-pointer"
              />
            </div>
          </div>
          <div>
            {/* 글 작성 */}
            <div>글 작성</div>
            <div className="bg-gray-200 p-[20px] h-[480px]">
              내용을 작성해주세요
            </div>
          </div>
          <div className="flex justify-end items-center">
            <button
              className="bg-primary w-[98px] h-[32px] rounded-[20px] text-white px-[2px]"
              onClick={() => alert('등록완료!')}
            >
              등록하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IsScamWrite;
