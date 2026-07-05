import { Trash2 } from "lucide-react";

function TransactionTable({ transactions, onDeleteTransaction }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/4 p-6 shadow-2xl backdrop-blur">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">Recent Transactions</h2>
        <p className="text-sm text-slate-400">
          View and manage your latest income and expenses.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-175 text-left">
          <thead>
            <tr className="border-b border-white/10 text-sm text-slate-400">
              <th className="pb-4">Title</th>
              <th className="pb-4">Category</th>
              <th className="pb-4">Type</th>
              <th className="pb-4">Date</th>
              <th className="pb-4 text-right">Amount</th>
              <th className="pb-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-8 text-center text-slate-400">
                  No transactions found.
                </td>
              </tr>
            ) : (
              transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-b border-white/5 text-sm text-slate-300"
                >
                  <td className="py-4 font-medium text-white">
                    {transaction.title}
                  </td>

                  <td className="py-4">{transaction.category}</td>

                  <td className="py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        transaction.transaction_type === "income"
                          ? "bg-emerald-500/10 text-emerald-300"
                          : "bg-red-500/10 text-red-300"
                      }`}
                    >
                      {transaction.transaction_type}
                    </span>
                  </td>

                  <td className="py-4">{transaction.transaction_date}</td>

                  <td
                    className={`py-4 text-right font-semibold ${
                      transaction.transaction_type === "income"
                        ? "text-emerald-400"
                        : "text-red-400"
                    }`}
                  >
                    ₹{Number(transaction.amount).toLocaleString("en-IN")}
                  </td>

                  <td className="py-4 text-right">
                    <button
                      onClick={() => onDeleteTransaction(transaction.id)}
                      className="rounded-xl border border-red-500/20 bg-red-500/10 p-2 text-red-300 transition hover:bg-red-500/20"
                    >
                      <Trash2 size={18} />
                    </button>
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

export default TransactionTable;