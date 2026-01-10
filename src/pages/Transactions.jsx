import Card from '../components/ui/Card';

const MOCK_HISTORY = [
    { id: 101, item: 'Calculus Textbook', date: 'Oct 15, 2023', amount: 45, type: 'Sold', status: 'Completed' },
    { id: 102, item: 'Coffee Maker', date: 'Sep 28, 2023', amount: 20, type: 'Bought', status: 'Completed' },
];

export default function Transactions() {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Transaction History</h1>
            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b bg-gray-50 text-sm md:text-base">
                                <th className="px-6 py-4 font-medium text-gray-500">Item</th>
                                <th className="px-6 py-4 font-medium text-gray-500">Date</th>
                                <th className="px-6 py-4 font-medium text-gray-500">Type</th>
                                <th className="px-6 py-4 font-medium text-gray-500">Status</th>
                                <th className="px-6 py-4 font-medium text-gray-500 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {MOCK_HISTORY.map((tx) => (
                                <tr key={tx.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{tx.item}</td>
                                    <td className="px-6 py-4 text-gray-600">{tx.date}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${tx.type === 'Sold' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                            {tx.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{tx.status}</td>
                                    <td className={`px-6 py-4 font-bold text-right ${tx.type === 'Sold' ? 'text-green-600' : 'text-gray-900'}`}>
                                        {tx.type === 'Sold' ? '+' : '-'}${tx.amount}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
