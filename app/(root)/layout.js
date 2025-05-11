import { NavBar } from "../components/navBar";


export default function Layout({ children }) {

  return (
  <main className="font-work-sans">
    <title>Medband</title>
    <NavBar/>
    {children}</main>);
}
