import { SideBar } from '@/components/SideBar';
import '@/styles/globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='flex min-h-screen'>
        <div className='flex-shrink-0 flex flex-col min-h-full'>
          <SideBar />
        </div>
        <main className='flex-1 min-h-full'>
          {children}
        </main>
      </body>
    </html>
  );
}
