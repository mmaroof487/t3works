export default function GridPattern() {
  const columns = 24;
  const rows = 6;
  return (
    <div className="flex shrink-0 scale-105 flex-wrap items-center justify-center gap-x-px gap-y-px bg-gray-100">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${String(col)}-${String(row)}`}
              className={
                index % 2 === 0
                  ? 'flex h-8 w-8 shrink-0 rounded-[2px] bg-gray-50'
                  : 'flex h-8 w-8 shrink-0 rounded-[2px] bg-gray-50 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset]'
              }
            />
          );
        })
      )}
    </div>
  );
}
