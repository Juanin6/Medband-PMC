import { NavBarDashBoard } from "../components/navBarDashBoard";

export default function Layout({ children }) {

  return (
  <main className="font-work-sans">
    <NavBarDashBoard/>
    {children}</main>);
}