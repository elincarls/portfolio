import SideNav from '../../components/SideNav';
import TopNav from '../../components/TopNav';
import './../fonts'
import { schibsted_grotesk } from './../fonts';
import './../globals.css';

export default function RootLayout({ children, modal }) {
  return (
  <>
        <SideNav />
        <TopNav />
        <main className='content'>
          {children}
        </main>
        {modal}
  </>
  );
}