import Navbar from "../components/Navbar";
import "./globals.css";
import LayoutBody from "./LayoutBody";

export const metadata = {
  title: "Gourmet Restaurant",
  description: "Experience fine dining at its best.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <LayoutBody>
        {children}
      </LayoutBody>
    </html>
  );
}
