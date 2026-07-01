export function LoadingSpinner({ size = 24 }: { size?: number }) {
  return (
    <div className="flex justify-center py-8">
      <div
        className="animate-spin rounded-full border-2 border-slate-300 border-t-blue-600"
        style={{ width: size, height: size }}
      />
    </div>
  );
}