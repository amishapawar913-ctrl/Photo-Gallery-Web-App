export default function Spinner() {
  return (
    <div role="status" className="flex flex-col items-center gap-3 py-24 text-slate-600">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />
      <span>Loading photos...</span>
    </div>
  );
}
