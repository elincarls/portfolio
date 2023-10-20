import SideBar from '../components/SideBar';
import './fonts'
import { open_sans, sora } from './fonts';
import './globals.css'

export default function RootLayout({ children, modal }) {
  return (
    <html lang="en" className={`${open_sans.variable} ${sora.variable}`}>
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