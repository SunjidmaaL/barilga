'use client'

import comparisonData from '@/data/comparison.json'

export default function ComparisonTable() {
  const { title, headers, rows } = comparisonData

  return (
    <div className="space-y-6">
      {/* Desktop Table View */}
      <div className="hidden lg:block rounded-xl bg-white shadow ring-1 ring-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
              <tr>
                {headers.map((header, index) => (
                  <th 
                    key={index} 
                    className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rows.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-gray-900">
                      {row.category}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-700 leading-relaxed">
                      {row.col1 || '-'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-700 leading-relaxed">
                      {row.col2 || '-'}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tablet View (md to lg) */}
      <div className="hidden md:block lg:hidden space-y-4">
        {rows.map((row, index) => (
          <div key={index} className="bg-white rounded-lg shadow ring-1 ring-gray-200 p-5 hover:shadow-md transition-shadow">
            <h3 className="text-sm font-bold text-indigo-700 mb-4 pb-2 border-b border-gray-200">
              {row.category}
            </h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-2">{headers[1]}</p>
                <p className="text-sm text-gray-700 leading-relaxed">{row.col1 || '-'}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-2">{headers[2]}</p>
                <p className="text-sm text-gray-700 leading-relaxed">{row.col2 || '-'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-3">
        {rows.map((row, index) => (
          <div key={index} className="bg-white rounded-lg shadow ring-1 ring-gray-200 p-4">
            <h3 className="text-sm font-bold text-indigo-700 mb-3 pb-2 border-b border-gray-200">
              {row.category}
            </h3>
            
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-1">{headers[1]}</p>
                <p className="text-xs text-gray-700 leading-relaxed">{row.col1 || '-'}</p>
              </div>
              <div className="pt-2 border-t border-gray-100">
                <p className="text-xs font-semibold text-gray-500 mb-1">{headers[2]}</p>
                <p className="text-xs text-gray-700 leading-relaxed">{row.col2 || '-'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
