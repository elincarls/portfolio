import SideNav from '../components/SideNav';
import TopNav from '../components/TopNav';
import './fonts'
import { open_sans, sora } from './fonts';
import './globals.css'

export default function RootLayout({ children, modal }) {
  return (
    
    <html lang="en" className={`${open_sans.variable} ${sora.variable}`}>
      <body>
        <main>
          {children}
        </main>
        {modal}
      </body>
    </html>
  );
}