import SideNav from '../../components/SideNav';
import TopNav from '../../components/TopNav';
import './../fonts'
import { open_sans, sora } from './../fonts';
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