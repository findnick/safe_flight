export default function BoldText({ children }) {
  return (
    <h6 className="text-base font-medium" style={{ color: "#000" }}>
      {children}
    </h6>
  );
}
