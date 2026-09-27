import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Dashboard from "./Project/Dashboard";

export default function App() {
  return (
    <>
      <Header />
      <div className="bg-[#09090b] text-zinc-100 min-h-screen antialiased flex flex-col selection:bg-zinc-100 selection:text-zinc-900">
        <Dashboard />
      </div>

      <Footer />
    </>
  );
}
