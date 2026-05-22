import './../globals.css';

export default function RootLayout({ children, modal }) {
  return (
    <>
      <main className="content">
        {children}</main>
      {modal}
    </>
  );
}
