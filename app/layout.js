import SideNav from '../components/SideNav';
import TopNav from '../components/TopNav';
import './fonts'
import { schibsted_grotesk } from './fonts';
import './globals.css'

export default function RootLayout({ children, modal }) {
  return (
    
    <html lang="en" className={`${schibsted_grotesk.variable}`}>
      <body>
        <main>
          {children}
        </main>
        {modal}
      </body>
    </html>
  );
}