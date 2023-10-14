import SideBar from '../components/SideBar';
import './globals.css'

export default function RootLayout({ children, modal }) {
  return (
    <html lang="en">
      <body>
        <SideBar />
        <main className='content'>
          {children}
        </main>
        {modal}
      </body>
    </html>
  );
}