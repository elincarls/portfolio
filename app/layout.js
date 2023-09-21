import './globals.css'
//import { Inter } from 'next/font/google'

export default function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Alptopps</title>
      </head>
      <body>
        {children}
      </body>
    </html>)
}