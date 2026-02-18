import Navbar from "../components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Gourmet Restaurant",
  description: "Experience fine dining at its best.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main style={{ minHeight: '80vh' }}>
          {children}
        </main>

      </body>
    </html>
  );
}
