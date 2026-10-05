export default function AdminLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-32">
            <div className="h-4 bg-gray-100 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-100 rounded w-1/4"></div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mt-8">
        <div className="h-12 bg-gray-100 border-b border-gray-200"></div>
        <div className="p-6 space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-6 bg-gray-50 rounded w-full"></div>
          ))}
        </div>
      </div>
    </div>
  )
}
