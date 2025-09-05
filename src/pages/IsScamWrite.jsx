import { useNavigate } from 'react-router-dom';

const IsScamWrite = () => {
  const nav = useNavigate();
  return (
    <div className="p-[48px] font-sans">
      <div className="flex justify-start items-center gap-[22px]">
        <img
          src="/back.svg"
          className="w-[30px] aspect-square hover:cursor-pointer"
          onClick={() => nav(-1)}
        />
        <div className="font-bold text-[32px]">이거 사칭일까요?</div>
      </div>
      <div className="bg-[#F8F8F8] w-full mt-[30px] py-[48px] px-[120px] flex gap-[42px] rounded-[20px] shadow-md">
        <div className="flex-none shrink-0 w-[90px] h-[90px] overflow-hidden rounded-full border border-gray-300">
          <img
            alt="캐릭터"
            src="/agu.jpg"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full h-full gap-[16px] flex flex-col">
          <div className="flex gap-[16px]">
            {' '}
            <div className="bg-[#EFEFEF] rounded-[50px] px-[12px] hover:cursor-pointer">
              카테고리
            </div>
            <div className="bg-[#EFEFEF] rounded-[50px] px-[12px] hover:cursor-pointer">
              카테고리
            </div>
            <div className="bg-[#EFEFEF] rounded-[50px] px-[12px] hover:cursor-pointer">
              카테고리
            </div>
            <div className="bg-[#EFEFEF] rounded-[50px] px-[12px] hover:cursor-pointer">
              카테고리
            </div>
            <div className="bg-[#EFEFEF] rounded-[50px] px-[12px] hover:cursor-pointer">
              카테고리
            </div>
            <div className="bg-[#EFEFEF] rounded-[50px] px-[12px] hover:cursor-pointer">
              카테고리
            </div>
          </div>
          <input
            className="bg-[#EFEFEF] p-[12px] rounded-[10px] text-[32px] font-bold text-black"
            placeholder="제목을 작성해주세요."
          />
          <div>
            {/* 사진/영상 첨부 */}
            <div className="text-[12px] text-gray-600 mb-[8px]">
              사진/영상 첨부
            </div>
            <div className="bg-[#EFEFEF] w-[70px] h-[80px] rounded-[10px] flex justify-center">
              <img
                src="/plus.svg"
                className="w-[20px] justify-center items-center aspect-square hover:cursor-pointer"
              />
            </div>
          </div>
          <div>
            {/* 글 작성 */}
            <div className="mb-[10px] font-black">사칭이 으심되.</div>
            <textarea
              placeholder="내용을 작성해주세요."
              className="bg-[#EFEFEF] flex items-start p-[20px] w-full h-[480px]"
            />
          </div>
          <div className="flex justify-end items-center">
            <button
              className="bg-secondary opacity-50 w-[98px] h-[32px] rounded-[20px] text-white px-[2px] hover:cursor-pointer hover:oparatity-100"
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
