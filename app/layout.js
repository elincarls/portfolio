import SideBar from '../components/Navigation/SideBar/SideBar';
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Alptopps</title>
      </head>
      <body>
       <SideBar />
        <div className='content'>
          {children}
        </div>
      </body>
    </html>)
}