export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-start p-24 relative">
      {/*  "PRODUCT BACKLOG" title*/}
      <div className="absolute top-15 left-18 p-4 bg-blue-100 text-blue-800 font-bold text-lg rounded-md shadow-md">
        PRODUCT BACKLOG
      </div>

      {/* Filter Options */}
      <div className="flex items-center space-x-6 mt-20 mb-4">
        <button className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md shadow-md hover:bg-gray-300">
          Priority
        </button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md shadow-md hover:bg-gray-300">
          Date
        </button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md shadow-md hover:bg-gray-300">
          Tags
        </button>
      </div>

      {/* Single-Column Table */}
      <div className="z-10 w-full max-w-5xl flex items-center justify-center font-mono text-sm mt-4">
        <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <thead>
            <tr>
              <th className="py-4 px-4 border-b border-gray-300 dark:border-gray-700 text-left">Tasks</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 4 }, (_, i) => (  // Changed length from 10 to 4
              <tr key={i}>
                <td className="relative py-8 px-8 border-b border-gray-300 dark:border-gray-700 text-left">
                  <div className="flex items-center justify-between">
                    {/* task Name and Assigned To which member */}
                    <div className="flex-1">
                      <div className="text-lg font-bold">Task {i + 1}</div>
                      <div className="text-sm text-gray-600">Assigned to: Shanwu</div>
                      {/* the tags */}
                      {i === 0 && (
                        <div className="flex space-x-2 mt-2">
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Priority</span>
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">New</span>
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">Feature</span>
                        </div>
                      )}
                    </div>
                    {/* adding task Progress and Mark */}
                    <div className="flex items-center space-x-2">
                      <span className="px-3 py-1 text-sm font-semibold rounded-md bg-gray-100 text-gray-800">3/10</span>
                      <span className={`px-3 py-1 text-sm font-semibold rounded-md ${
                        i % 3 === 0
                          ? 'bg-blue-200 text-blue-800'
                          : i % 3 === 1
                          ? 'bg-yellow-200 text-yellow-800'
                          : 'bg-green-200 text-green-800'
                      }`}>
                        {i % 3 === 0 ? 'Not Started' : i % 3 === 1 ? 'In Progress' : 'Complete'}
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
