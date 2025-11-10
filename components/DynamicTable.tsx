import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';

// Server-side API route ашиглан өгөгдөл татах (Strapi-д шууд дуудлага хийхгүй)
// API route нь server-side дээр cache хийгддэг, тиймээс Strapi API calls маш бага байна
const getLicenseTables = async () => {
  try {
    // Next.js API route ашиглах - server-side дээр cache хийгддэг
    const res = await fetch('/api/license-tables');
    
    if (!res.ok) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to fetch license-tables:', res.status, res.statusText);
      }
      throw new Error(`Failed to fetch license-tables: ${res.status}`);
    }
    
    const result = await res.json();
    
    if (!result || !result.data) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('No license-tables data received from API');
      }
      return [];
    }
    
    return result.data;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching license-tables:', error);
    }
    return [];
  }
};

interface ReportData {
  id?: number;
  year: number;
  month: number | string;
  total: number;
  reported: number;
  investigated: number;
  resolved: number;
}

export default function DynamicReportTable() {
  const [data, setData] = useState<ReportData[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<ReportData | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [dataSource, setDataSource] = useState<'strapi' | 'static' | 'unknown'>('unknown');
  const [error, setError] = useState<string | null>(null);
  const [newRow, setNewRow] = useState<ReportData>({
    year: new Date().getFullYear(),
    month: 1,
    total: 0,
    reported: 0,
    investigated: 0,
    resolved: 0
  });

  // Strapi-аас өгөгдөл татах
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const licenseTablesData = await getLicenseTables();
      
      if (licenseTablesData && licenseTablesData.length > 0) {
        // Strapi license-tables өгөгдлийг манай форматад хувиргах
        const transformedData = licenseTablesData.map((item: any) => ({
          id: item.id,
          year: item.attributes?.year || new Date().getFullYear(),
          month: item.attributes?.meetings || 'цахим',
          total: item.attributes?.total || 0,
          reported: item.attributes?.newlyIssued || 0,
          investigated: item.attributes?.extended || 0,
          resolved: item.attributes?.cancelled || 0
        }));
        setData(transformedData);
        setDataSource('strapi');
        setError(null);
      } else {
        // Strapi-д өгөгдөл байхгүй бол статик өгөгдөл харуулах
        const fallbackData: ReportData[] = [
          { id: 1, year: 2013, month: 15, total: 177, reported: 146, investigated: 31, resolved: 1 },
          { id: 2, year: 2014, month: 16, total: 258, reported: 229, investigated: 29, resolved: 1 },
          { id: 3, year: 2015, month: 15, total: 166, reported: 145, investigated: 21, resolved: 0 },
          { id: 4, year: 2016, month: 10, total: 130, reported: 67, investigated: 63, resolved: 0 },
          { id: 5, year: 2017, month: 6, total: 188, reported: 63, investigated: 125, resolved: 0 },
          { id: 6, year: 2018, month: 6, total: 108, reported: 39, investigated: 69, resolved: 1 },
          { id: 7, year: 2019, month: 8, total: 73, reported: 39, investigated: 34, resolved: 2 },
          { id: 8, year: 2020, month: 9, total: 101, reported: 56, investigated: 45, resolved: 2 },
          { id: 9, year: 2021, month: 'цахим', total: 113, reported: 46, investigated: 68, resolved: 0 },
          { id: 10, year: 2022, month: 'цахим', total: 53, reported: 16, investigated: 37, resolved: 0 },
          { id: 11, year: 2023, month: 'цахим', total: 118, reported: 109, investigated: 9, resolved: 2 },
          { id: 12, year: 2024, month: 'цахим', total: 104, reported: 102, investigated: 2, resolved: 2 },
        ];
        setData(fallbackData);
        setDataSource('static');
        setError('Strapi-д өгөгдөл олдсонгүй. Статик өгөгдөл харуулж байна.');
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Strapi-аас өгөгдөл татахад алдаа:', error);
      }
      // Алдаа гарвал статик өгөгдөл харуулах
      const fallbackData: ReportData[] = [
        { id: 1, year: 2013, month: 15, total: 177, reported: 146, investigated: 31, resolved: 1 },
        { id: 2, year: 2014, month: 16, total: 258, reported: 229, investigated: 29, resolved: 1 },
        { id: 3, year: 2015, month: 15, total: 166, reported: 145, investigated: 21, resolved: 0 },
        { id: 4, year: 2016, month: 10, total: 130, reported: 67, investigated: 63, resolved: 0 },
        { id: 5, year: 2017, month: 6, total: 188, reported: 63, investigated: 125, resolved: 0 },
        { id: 6, year: 2018, month: 6, total: 108, reported: 39, investigated: 69, resolved: 1 },
        { id: 7, year: 2019, month: 8, total: 73, reported: 39, investigated: 34, resolved: 2 },
        { id: 8, year: 2020, month: 9, total: 101, reported: 56, investigated: 45, resolved: 2 },
        { id: 9, year: 2021, month: 'цахим', total: 113, reported: 46, investigated: 68, resolved: 0 },
        { id: 10, year: 2022, month: 'цахим', total: 53, reported: 16, investigated: 37, resolved: 0 },
        { id: 11, year: 2023, month: 'цахим', total: 118, reported: 109, investigated: 9, resolved: 2 },
        { id: 12, year: 2024, month: 'цахим', total: 104, reported: 102, investigated: 2, resolved: 2 },
      ];
      setData(fallbackData);
      setDataSource('static');
      setError('Strapi-тай холбогдоход алдаа гарлаа. Статик өгөгдөл харуулж байна.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Strapi license-tables-руу хадгалах функц
  const saveToStrapi = async (rowData: ReportData, isUpdate = false) => {
    setLoading(true);
    try {
      const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
      const method = isUpdate ? 'PUT' : 'POST';
      const url = isUpdate 
        ? `${STRAPI_URL}/api/license-tables/${rowData.id}`
        : `${STRAPI_URL}/api/license-tables`;

      // Strapi format-д хувиргах
      const strapiData = {
        data: {
          year: rowData.year,
          meetings: rowData.month,
          total: rowData.total,
          newlyIssued: rowData.reported,
          extended: rowData.investigated,
          cancelled: rowData.resolved
        }
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer YOUR_TOKEN`, // Token нэмнэ үү
        },
        body: JSON.stringify(strapiData),
      });

      if (response.ok) {
        const result = await response.json();
        return result.data;
      } else {
        throw new Error('Хадгалахад алдаа гарлаа');
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Алдаа:', error);
      }
      alert('Алдаа гарлаа! Console-оо шалгана уу.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Шинэ мөр нэмэх
  const handleAdd = async () => {
    const saved = await saveToStrapi(newRow);
    if (saved) {
      setData([...data, { ...newRow, id: saved.id }]);
      setShowAddForm(false);
      setNewRow({
        year: new Date().getFullYear(),
        month: 1,
        total: 0,
        reported: 0,
        investigated: 0,
        resolved: 0
      });
    }
  };

  // Засварлах эхлэх
  const startEdit = (row: ReportData) => {
    setEditingId(row.id!);
    setEditForm({ ...row });
  };

  // Засварлах хадгалах
  const handleUpdate = async () => {
    if (editForm) {
      const saved = await saveToStrapi(editForm, true);
      if (saved) {
        setData(data.map(row => row.id === editingId ? editForm : row));
        setEditingId(null);
        setEditForm(null);
      }
    }
  };

  // Устгах
  const handleDelete = async (id: number) => {
    if (!confirm('Устгахдаа итгэлтэй байна уу?')) return;
    
    setLoading(true);
    try {
      const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
      const response = await fetch(`${STRAPI_URL}/api/license-tables/${id}`, {
        method: 'DELETE',
        // headers: { 'Authorization': `Bearer YOUR_TOKEN` }
      });

      if (response.ok) {
        setData(data.filter(row => row.id !== id));
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Алдаа:', error);
      }
      alert('Устгахад алдаа гарлаа!');
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({ value, onChange, type = 'text', className = '' }: any) => (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={`px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    />
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Тусгай зөвшөөрлийн өгөгдөл</h1>
          <div className="flex items-center gap-2 mt-2">
            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              dataSource === 'strapi' 
                ? 'bg-green-100 text-green-800' 
                : dataSource === 'static'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              <div className={`w-2 h-2 rounded-full mr-1.5 ${
                dataSource === 'strapi' 
                  ? 'bg-green-500' 
                  : dataSource === 'static'
                  ? 'bg-yellow-500'
                  : 'bg-gray-500'
              }`}></div>
              {dataSource === 'strapi' ? 'Strapi-аас ирсэн өгөгдөл' : 
               dataSource === 'static' ? 'Статик өгөгдөл' : 
               'Тодорхойгүй'}
            </div>
            {dataSource === 'static' && (
              <span className="text-xs text-gray-500">
                (Strapi-тай холбогдохгүй байна)
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchData}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition disabled:opacity-50"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Шинэчлэх
          </button>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 transition"
            disabled={loading}
          >
            <Plus size={20} />
            Шинэ нэмэх
          </button>
        </div>
      </div>

      {/* Error/Info Message */}
      {error && (
        <div className={`mb-4 p-4 rounded-lg border-l-4 ${
          dataSource === 'static' 
            ? 'bg-yellow-50 border-yellow-400 text-yellow-800' 
            : 'bg-red-50 border-red-400 text-red-800'
        }`}>
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className={`h-5 w-5 ${
                dataSource === 'static' ? 'text-yellow-400' : 'text-red-400'
              }`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Шинэ мөр нэмэх форм */}
      {showAddForm && (
        <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 mb-6">
          <h3 className="font-semibold mb-3 text-blue-900">Шинэ мөр нэмэх</h3>
          <div className="grid grid-cols-6 gap-3">
            <InputField value={newRow.year} onChange={(e: any) => setNewRow({...newRow, year: parseInt(e.target.value) || 0})} type="number" />
            <InputField value={newRow.month} onChange={(e: any) => setNewRow({...newRow, month: e.target.value})} />
            <InputField value={newRow.total} onChange={(e: any) => setNewRow({...newRow, total: parseInt(e.target.value) || 0})} type="number" />
            <InputField value={newRow.reported} onChange={(e: any) => setNewRow({...newRow, reported: parseInt(e.target.value) || 0})} type="number" />
            <InputField value={newRow.investigated} onChange={(e: any) => setNewRow({...newRow, investigated: parseInt(e.target.value) || 0})} type="number" />
            <InputField value={newRow.resolved} onChange={(e: any) => setNewRow({...newRow, resolved: parseInt(e.target.value) || 0})} type="number" />
          </div>
          <div className="flex gap-2 mt-3">
            <button onClick={handleAdd} disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2">
              <Save size={16} /> Хадгалах
            </button>
            <button onClick={() => setShowAddForm(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 flex items-center gap-2">
              <X size={16} /> Цуцлах
            </button>
          </div>
        </div>
      )}

      {/* Хүснэгт */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Он</th>
              <th className="px-4 py-3 text-left">Хугацаа</th>
              <th className="px-4 py-3 text-left">Нийт тоо</th>
              <th className="px-4 py-3 text-left">Шийдвэрлэсэн</th>
              <th className="px-4 py-3 text-left">Судлагдаж буй</th>
              <th className="px-4 py-3 text-left">Цуцалсан</th>
              <th className="px-4 py-3 text-center">Үйлдэл</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={row.id} className={`border-b hover:bg-gray-50 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                {editingId === row.id && editForm ? (
                  <>
                    <td className="px-4 py-3"><InputField value={editForm.year} onChange={(e: any) => setEditForm({...editForm, year: parseInt(e.target.value) || 0})} type="number" className="w-20" /></td>
                    <td className="px-4 py-3"><InputField value={editForm.month} onChange={(e: any) => setEditForm({...editForm, month: e.target.value})} className="w-24" /></td>
                    <td className="px-4 py-3"><InputField value={editForm.total} onChange={(e: any) => setEditForm({...editForm, total: parseInt(e.target.value) || 0})} type="number" className="w-20" /></td>
                    <td className="px-4 py-3"><InputField value={editForm.reported} onChange={(e: any) => setEditForm({...editForm, reported: parseInt(e.target.value) || 0})} type="number" className="w-20" /></td>
                    <td className="px-4 py-3"><InputField value={editForm.investigated} onChange={(e: any) => setEditForm({...editForm, investigated: parseInt(e.target.value) || 0})} type="number" className="w-20" /></td>
                    <td className="px-4 py-3"><InputField value={editForm.resolved} onChange={(e: any) => setEditForm({...editForm, resolved: parseInt(e.target.value) || 0})} type="number" className="w-20" /></td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2 justify-center">
                        <button onClick={handleUpdate} disabled={loading} className="text-green-600 hover:text-green-800"><Save size={18} /></button>
                        <button onClick={() => { setEditingId(null); setEditForm(null); }} className="text-red-600 hover:text-red-800"><X size={18} /></button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-4 py-3 font-medium">{row.year}</td>
                    <td className="px-4 py-3">{row.month}</td>
                    <td className="px-4 py-3 text-center bg-yellow-50 font-semibold">{row.total}</td>
                    <td className="px-4 py-3 text-center bg-green-50">{row.reported}</td>
                    <td className="px-4 py-3 text-center bg-blue-50">{row.investigated}</td>
                    <td className="px-4 py-3 text-center bg-red-50">{row.resolved}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2 justify-center">
                        <button onClick={() => startEdit(row)} disabled={loading} className="text-blue-600 hover:text-blue-800"><Edit2 size={18} /></button>
                        <button onClick={() => handleDelete(row.id!)} disabled={loading} className="text-red-600 hover:text-red-800"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-100 font-bold">
            <tr>
              <td colSpan={2} className="px-4 py-3">Нийт</td>
              <td className="px-4 py-3 text-center">{data.reduce((sum, row) => sum + row.total, 0)}</td>
              <td className="px-4 py-3 text-center">{data.reduce((sum, row) => sum + row.reported, 0)}</td>
              <td className="px-4 py-3 text-center">{data.reduce((sum, row) => sum + row.investigated, 0)}</td>
              <td className="px-4 py-3 text-center">{data.reduce((sum, row) => sum + row.resolved, 0)}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 shadow-xl">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-700">Уншиж байна...</p>
          </div>
        </div>
      )}
    </div>
  );
}