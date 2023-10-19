import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import './globals.css'
import { Inter } from 'next/font/google'
import {NextAuthProvider} from './provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'NEXT AUTH GITHUB',
  description: 'nextauth with github provider.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <Navbar />
          {children}
          <Footer />
        </NextAuthProvider> 
      </body>
    </html>
  );
}
