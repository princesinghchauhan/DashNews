const Table = ({ data }) => (
    <table className="min-w-full bg-white text-gray-500">
      <thead>
        <tr>
          <th className="px-4 py-2">Author</th>
          <th className="px-4 py-2">Articles</th>
          <th className="px-4 py-2">Payout</th>
          <th className="px-4 py-2">Type</th>
          <th className="px-4 py-2">Date</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} className="text-center text-gray-500">
            <td className="border px-4 py-2">{row.author}</td>
            <td className="border px-4 py-2">{row.articles}</td>
            <td className="border px-4 py-2">{row.payout}</td>
            <td className="border px-4 py-2">{row.type}</td>
            <td className="border px-4 py-2">{row.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
  
  export default Table;
  