import { useNavigate } from 'react-router-dom';

const IsScamWrite = () => {
  const nav = useNavigate();
  return (
    <div className="flex justify-start m-[48px] gap-[16px] font-sans">
      <img
        src="./assets/back.svg"
        className="w-[20px] aspect-square hover:cursor-pointer"
        onClick={() => nav(-1)}
      />
      <div>이거 사칭일까요?</div>
    </div>
  );
};

export default IsScamWrite;
