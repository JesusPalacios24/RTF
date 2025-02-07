import NAV from "./components/nav";
import FOOTER from "./components/footer";
import "./globals.css";
import MsalWrapper from "./components/MsalWrapper";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MsalWrapper>
          <NAV />
          <main>{children}</main>
          <FOOTER />
        </MsalWrapper>
      </body>
    </html>
  );
}
