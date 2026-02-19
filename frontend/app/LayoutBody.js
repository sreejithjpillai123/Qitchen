'use client';
import { usePathname } from 'next/navigation';
import Navbar from "../components/Navbar";

export default function LayoutBody({ children }) {
    const pathname = usePathname();
    const isAdmin = pathname.startsWith('/admin');

    return (
        <body>
            {!isAdmin && <Navbar />}
            <main style={{ minHeight: '80vh' }}>
                {children}
            </main>
        </body>
    );
}
