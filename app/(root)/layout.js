import { NavBar } from "../components/navBar";

export default function Layout({ children }) {

  return (
  <main className="font-work-sans">
    <NavBar/>
    {children}</main>);
}
