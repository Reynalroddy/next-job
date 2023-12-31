import './globals.css'
import "primereact/resources/themes/tailwind-light/theme.css";     
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";  
import "primeflex/primeflex.css";
import './globals.css'
import { Providers } from '@/components/ReduxProvider';
import type { Metadata } from 'next'
import LayoutProvider from '@/components/LayoutProvider';
export const metadata: Metadata = {
  title: 'jobs',
  description: 'Generated by reynal',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>    
        <Providers>
      <LayoutProvider>{children}</LayoutProvider>
      </Providers>   
      </body>
    </html>
  )
}
