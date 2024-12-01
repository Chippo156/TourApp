import Admin from "../../page/Admin";
import Footer from "../Footer";
import Header from "../Header";
import { Outlet } from 'react-router-dom';

function LayoutAdmin() {
  return (
    <div>
      <Header />
      <Admin />
      <Footer />
    </div>
  );
}

export default LayoutAdmin;
