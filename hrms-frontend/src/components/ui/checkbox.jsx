export function Checkbox({ className = "", ...props }) {
  return (
    <input
      type="checkbox"
      className={`h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary ${className}`}
      {...props}
    />
  );
}
