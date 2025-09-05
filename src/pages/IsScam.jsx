import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ListTable from '../components/ListTable';
import Category from '../components/Category'; // 새로 만든 Category 컴포넌트를 import 합니다.
import { isScamData } from '../data/isscam';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  margin: 48px;
  align-items: center;
  font-family: 'Pretendard', system-ui, -apple-system, Segoe UI, Roboto,
    Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji';
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: baseline;
`;

const TitleWrap = styled.div`
  display: flex;
  gap: 16px;
  align-items: baseline;
`;

const Title = styled.h1`
  font-weight: 900;
  color: #000;
  font-size: 48px;
  line-height: 1.1;
  margin: 0;
`;

const BoardType = styled.div`
  color: #333;
  font-size: 16px;
`;

const WriteButton = styled.button`
  background: var(--primary, #8180f7);
  color: #fff;
  font-family: inherit;
  border: 0;
  border-radius: 20px;
  padding: 12px 30px;
  height: 30px; /* 원 코드 유지 */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: filter 0.15s ease;

  &:hover {
    filter: brightness(0.95);
  }

  &:active {
    filter: brightness(0.9);
  }
`;

const CategoryRow = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
  justify-content: flex-start;
  margin-top: 30px;
  font-family: inherit;
`;

const CategoryChip = styled.div`
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  border-radius: 50px;
  padding: 6px 12px;
  font-size: 14px;
  user-select: none;
`;

const TableWrap = styled.div`
  width: 100%;
  margin-top: 30px;
`;

const IsScam = () => {
  const nav = useNavigate();
  return (
    <Page>
      <Header>
        <TitleWrap>
          <Title>이거 사칭인가요?</Title>
          <BoardType>전체 게시판</BoardType>
        </TitleWrap>

        <WriteButton onClick={() => nav('/isscam/write')}>글쓰기</WriteButton>
      </Header>

      <CategoryRow>
        <CategoryChip>카테고리</CategoryChip>
        <CategoryChip>카테고리</CategoryChip>
        <CategoryChip>카테고리</CategoryChip>
        <CategoryChip>카테고리</CategoryChip>
        <CategoryChip>카테고리</CategoryChip>
        <CategoryChip>카테고리</CategoryChip>
      </CategoryRow>

      <TableWrap>
        <ListTable items={isScamData} />
      </TableWrap>
    </Page>
  );
};

export default IsScam;
