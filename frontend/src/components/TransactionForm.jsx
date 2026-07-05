import { useState } from "react";
import { PlusCircle } from "lucide-react";

const initialForm = {
  title: "",
  amount: "",
  category: "",
  transaction_type: "expense",
  description: "",
  transaction_date: new Date().toISOString().split("T")[0],
};

function TransactionForm({ onAddTransaction }) {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      ...formData,
      amount: Number(formData.amount),
    };

    try {
      setLoading(true);
      await onAddTransaction(payload);
      setFormData(initialForm);
    } catch (error) {
      alert(error.response?.data?.detail || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/4 p-6 shadow-2xl backdrop-blur">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">Add Transaction</h2>
        <p className="text-sm text-slate-400">
          Add income or expense entry to your tracker.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title e.g. Lunch"
          className="input"
          required
        />

        <input
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Amount"
          type="number"
          className="input"
          required
        />

        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category e.g. Food"
          className="input"
          required
        />

        <select
          name="transaction_type"
          value={formData.transaction_type}
          onChange={handleChange}
          className="input"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <input
          name="transaction_date"
          value={formData.transaction_date}
          onChange={handleChange}
          type="date"
          className="input"
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="input min-h-24 resize-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:opacity-60"
        >
          <PlusCircle size={20} />
          {loading ? "Adding..." : "Add Transaction"}
        </button>
      </form>
    </div>
  );
}

export default TransactionForm;