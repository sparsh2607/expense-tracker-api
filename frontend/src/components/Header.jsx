import { IndianRupee, Sparkles } from "lucide-react";

function Header() {
  return (
    <header className="flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center md:justify-between">
      <div>
        <div className="mb-2 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 text-white text-slate-100 shadow-lg shadow-emerald-500/20">
            <IndianRupee size={28} strokeWidth={2.5} />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              SpendWise
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Smart finance dashboard for tracking expenses, income, and insights.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-5 py-2 text-sm font-medium text-emerald-300">
        <Sparkles size={16} />
        FastAPI Connected
      </div>
    </header>
  );
}

export default Header;