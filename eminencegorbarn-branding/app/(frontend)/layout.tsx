import LoadingScreen from "./components/LoadingScreen";
import EminenceNavbar from "./components/EminenceNavbar";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";
import SuppressExtensionErrors from "./components/SuppressExtensionErrors";

if (process.env.NODE_ENV === 'development') {
  const originalError = console.error
  console.error = (...args) => {
    const msg = args.map(a => (typeof a === 'string' ? a : a?.message || '')).join(' ')
    if (
      msg.includes('data-arp') || msg.includes('hydration') || msg.includes('data-my-extension') || msg.includes('MetaMask') || msg.includes('Failed to connect')
    ) {
      return
    }
    originalError.call(console, ...args)
  }
}

export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SmoothScroll>
      <SuppressExtensionErrors />
      <LoadingScreen />
      <EminenceNavbar/>
      {children}
      <Footer/>
    </SmoothScroll>
  );
}