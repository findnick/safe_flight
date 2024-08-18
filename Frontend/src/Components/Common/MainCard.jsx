export default function MainCard({ children }) {
  return (
    <div className="flex flex-col items-center gap-8 md:items-baseline md:flex-row justify-between mx-14">
      {children}
    </div>
  );
}
