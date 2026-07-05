import { useEffect, useState } from "react";

import {
  createTransaction,
  deleteTransaction,
  getCategorySummary,
  getSummary,
  getTransactions,
} from "./api/transactions";

import Header from "./components/Header";
import SummaryCards from "./components/SummaryCards";
import TransactionForm from "./components/TransactionForm";
import TransactionTable from "./components/TransactionTable";
import CategoryChart from "./components/CategoryChart";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState(null);
  const [categoryData, setCategoryData] = useState({});
  const [loading, setLoading] = useState(true);

  async function refreshDashboard() {
    try {
      setLoading(true);

      const transactionsData = await getTransactions();
      const summaryData = await getSummary();
      const categorySummaryData = await getCategorySummary();

      setTransactions(transactionsData);
      setSummary(summaryData);
      setCategoryData(categorySummaryData.category_wise_expenses || {});
    } catch (error) {
      console.error(error);
      alert("Backend se data fetch nahi ho pa raha. FastAPI server check karo.");
    } finally {
      setLoading(false);
    }
  }

  async function handleAddTransaction(transactionData) {
    await createTransaction(transactionData);
    await refreshDashboard();
  }

  async function handleDeleteTransaction(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (!confirmDelete) return;

    await deleteTransaction(id);
    await refreshDashboard();
  }

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);

        const transactionsData = await getTransactions();
        const summaryData = await getSummary();
        const categorySummaryData = await getCategorySummary();

        setTransactions(transactionsData);
        setSummary(summaryData);
        setCategoryData(categorySummaryData.category_wise_expenses || {});
      } catch (error) {
        console.error(error);
        alert("Backend se data fetch nahi ho pa raha. FastAPI server check karo.");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="absolute inset-0 -z-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.18),transparent_35%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.14),transparent_30%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-8">
        <Header />

        {loading ? (
          <div className="mt-16 text-center text-slate-400">
            Loading dashboard...
          </div>
        ) : (
          <div className="mt-8 space-y-8">
            <SummaryCards summary={summary} />

            <div className="grid gap-8 xl:grid-cols-[420px_1fr]">
              <TransactionForm onAddTransaction={handleAddTransaction} />
              <CategoryChart categoryData={categoryData} />
            </div>

            <TransactionTable
              transactions={transactions}
              onDeleteTransaction={handleDeleteTransaction}
            />
          </div>
        )}
      </div>
    </main>
  );
}

export default App;