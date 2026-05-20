export default function Loader({ label = "جاري التحميل...", full = false, className = "" }) {
  const wrapper = full ? "grid min-h-screen place-items-center" : "grid place-items-center py-12";
  return (
    <div className={`${wrapper} ${className}`}>
      <div className="flex flex-col items-center gap-3">
        <div className="w-[50px] aspect-square rounded-full border-[8px] border-solid border-transparent animate-spin [border-right-color:#ffa50097]" />
        {label ? <p className="text-sm text-[var(--text-muted)]" suppressHydrationWarning>{label}</p> : null}
      </div>
    </div>
  );
}