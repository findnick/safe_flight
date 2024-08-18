export default function RegularText({ children }) {
  return (
    <p className="text-sm font-normal" style={{ color: "var(--stroke-tb)" }}>
      {children}
    </p>
  );
}
