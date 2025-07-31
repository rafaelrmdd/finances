import { SideBar } from '@/components/SideBar';
import '@/styles/globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className='flex'>
            <SideBar />
            {children}
        </body>
    </html>
  );
}
