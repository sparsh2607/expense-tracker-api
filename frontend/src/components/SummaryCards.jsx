import { ArrowDownCircle, ArrowUpCircle, IndianRupee, Wallet } from "lucide-react";

function SummaryCards({ summary }) {
  const cards = [
    {
      title: "Total Income",
      value: summary?.total_income || 0,
      icon: ArrowUpCircle,
      accent: "text-emerald-400",
    },
    {
      title: "Total Expense",
      value: summary?.total_expense || 0,
      icon: ArrowDownCircle,
      accent: "text-red-400",
    },
    {
      title: "Balance",
      value: summary?.balance || 0,
      icon: Wallet,
      accent: "text-blue-400",
    },
    {
      title: "Transactions",
      value: summary?.total_transactions || 0,
      icon: IndianRupee,
      accent: "text-violet-400",
      isMoney: false,
    },
  ];

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-3xl border border-white/10 bg-white/4 p-6 shadow-2xl backdrop-blur"
          >
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm text-slate-400">{card.title}</p>
              <Icon className={card.accent} size={24} />
            </div>

            <h2 className="text-2xl font-bold text-white">
              {card.isMoney === false ? "" : "₹"}
              {Number(card.value).toLocaleString("en-IN")}
            </h2>
          </div>
        );
      })}
    </section>
  );
}

export default SummaryCards;