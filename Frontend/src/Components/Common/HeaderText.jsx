export default function HeaderText({ children }) {
  return (
    <h1 className="text-4xl sm:text-6xl font-bold text-white text-center">
      {children}
    </h1>
  );
}
