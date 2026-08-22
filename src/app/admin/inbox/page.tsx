import { getInboxMessages } from '@/actions/inbox'; 

export const dynamic = "force-dynamic";

export default async function InboxPage() {
  const messages = await getInboxMessages();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Inbox Messages & Quotes</h1>
      
      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-3">Tipe</th>
              <th className="p-3">Nama / Email</th>
              <th className="p-3">Pesan / Detail Quote</th>
              <th className="p-3">Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {messages.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  Belum ada pesan masuk.
                </td>
              </tr>
            ) : (
              messages.map((item: any) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-semibold">
                    <span className={item.type === 'QUOTE' ? 'text-blue-600' : 'text-green-600'}>
                      {item.type || 'CONTACT'}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-gray-500 text-xs">{item.email}</div>
                  </td>
                  <td className="p-3 max-w-xs truncate">{item.message}</td>
                  <td className="p-3 text-xs text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString('id-ID')}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}