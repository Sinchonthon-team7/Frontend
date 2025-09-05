// components/ListTable.jsx
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ScrollX = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: separate;
  border-spacing: 0 12px; /* spacing-y-3 */
`;

const Thead = styled.thead`
  font-size: 0.875rem; /* text-sm */
  color: #6b7280; /* gray-500 */
`;

const Th = styled.th`
  text-align: left;
  padding: 0 16px;
  font-weight: 600;

  /* 가로폭 지정 (Tailwind 대응) */
  &.w-12 {
    width: 3rem;
  }
  &.w-20 {
    width: 5rem;
  }
  &.w-24 {
    width: 6rem;
  }
  &.w-28 {
    width: 7rem;
  }

  &:not(.text-left) {
    text-align: center;
  }
`;

const Tr = styled.tr`
  /* 행 클릭 가능 표시 + 접근성 포커스 */
  cursor: pointer;

  /* 첫/끝 셀 둥근 모서리 적용을 위해 td에서 처리 */
  &:hover td {
    filter: brightness(0.98);
  }
  &:active td {
    filter: brightness(0.96);
  }
  &:focus-within td {
    outline: 2px solid #8180f7;
    outline-offset: -2px;
  }
`;

const Td = styled.td`
  background: #fff;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.08);
  padding: 12px 16px;
  font-size: 0.95rem;
  line-height: 1.4;
  text-align: ${(p) => (p.center ? 'center' : 'left')};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  /* 첫/마지막 셀 라운딩 */
  &.first {
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
  }
  &.last {
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
  }
`;

export default function ListTable({ items }) {
  const nav = useNavigate();

  const goDetail = (id) => {
    nav(`/isscam/${id}`);
  };

  const onRowKey = (e, id) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      goDetail(id);
    }
  };

  return (
    <ScrollX>
      <Table>
        <Thead>
          <tr>
            <Th className="w-12 text-left">#</Th>
            <Th className="text-left">제목</Th>
            <Th className="w-24">작성자</Th>
            <Th className="w-28">카테고리</Th>
            <Th className="w-28">작성일</Th>
            <Th className="w-20">조회수</Th>
            <Th className="w-20">공감수</Th>
          </tr>
        </Thead>
        <tbody>
          {items.map((r) => (
            <Tr
              key={r.id}
              role="button"
              tabIndex={0}
              onClick={() => goDetail(r.id)}
              onKeyDown={(e) => onRowKey(e, r.id)}
              aria-label={`${r.title} 상세로 이동`}
            >
              <Td className="first">{r.id}</Td>
              <Td title={r.title}>{r.title}</Td>
              <Td center>{r.author}</Td>
              <Td center>{r.category}</Td>
              <Td center>{r.timeAgo}</Td>
              <Td center>{r.views}</Td>
              <Td className="last" center>
                {r.likes}
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </ScrollX>
  );
}
