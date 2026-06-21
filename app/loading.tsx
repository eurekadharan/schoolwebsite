export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-xs">
      <div className="flex flex-col items-center gap-3">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#3eaea6]/25 border-t-[#3eaea6]"></div>
        <span className="text-[11px] font-black uppercase tracking-widest text-[#3eaea6] animate-pulse">
          Loading Content
        </span>
      </div>
    </div>
  );
}
