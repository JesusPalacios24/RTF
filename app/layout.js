import NAV from "./components/nav"
import FOOTER from "./components/footer"
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      {/* LA BARRA DE NAVEGACION*/}
      <NAV/>

      <main>{children}</main>

      {/* PIE DE PAGINA*/}
      <FOOTER/>
      </body>
    </html>
  );
}

