export default function ListTable({ items }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-fixed border-separate border-spacing-y-3">
        <thead className="text-sm text-gray-500">
          <tr>
            <th className="w-12 text-left px-4">#</th>
            <th className="text-left px-4">제목</th>
            <th className="w-24 px-4">작성자</th>
            <th className="w-28 px-4">카테고리</th>
            <th className="w-28 px-4">작성일</th>
            <th className="w-20 px-4">조회수</th>
            <th className="w-20 px-4">공감수</th>
          </tr>
        </thead>
        <tbody>
          {items.map((r) => (
            <tr key={r.id}>
              <td className="bg-white shadow rounded-l-xl px-4 py-3">{r.id}</td>
              <td className="bg-white shadow px-4 py-3 font-medium truncate">
                {r.title}
              </td>
              <td className="bg-white shadow px-4 py-3 text-center">
                {r.author}
              </td>
              <td className="bg-white shadow px-4 py-3 text-center">
                {r.category}
              </td>
              <td className="bg-white shadow px-4 py-3 text-center">
                {r.timeAgo}
              </td>
              <td className="bg-white shadow px-4 py-3 text-center">
                {r.views}
              </td>
              <td className="bg-white shadow rounded-r-xl px-4 py-3 text-center">
                {r.likes}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
