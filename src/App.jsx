import { useState } from "react";

import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { Navbar } from "./Navbar";
import { Product } from "./Product";
import { Login } from "./login/Login";
import { Createuser } from "./createuser/Createuser";
import { EachProduct } from "./EachProduct";
import { CheckoutPage } from "./CheckoutPage";
import { MySelect } from "./MySelect";
import { MyProfile } from "./login/MyProfile";
import { OtpVerify } from "./createuser/OtpVerify.jsx";
import { Dashboard } from "./admincomponents/Dashboard.jsx";
import { CatagoriesPage } from "./admincomponents/CatagoriesPage";
import { AdminuserProduct } from "./admincomponents/AdminuserProduct";
import { AdminuserPageUsers } from "./admincomponents/AdminuserPageUsers";
import { EditCatagories } from "./admincomponents/EditCatagories";
import { EditProduct } from "./admincomponents/EditProduct";
import { OrderAndContactDetails } from "./admincomponents/OrderAndContactDetails";
import { MyOrders } from "./MyOrders";
import { Editaddress } from "./Editaddress";
import { Forgotpage } from "./login/Forgotpage";
import { ConfirmPassword } from "./login/ConfirmPassword";

function App() {
  const [adddata, setadddata] = useState([]);
  const [cartitem, setcartitem] = useState([]);
  const [price, setprice] = useState();
  const [quantity, setquantity] = useState();
  console.log(cartitem, "app cartitem");
  console.log(adddata, "from app");

  return (
    <div className="App">
      <Navbar
        setprice={setprice}
        setcartitem={setcartitem}
        setadddata={setadddata}
        adddata={adddata}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/forgotpage" element={<Forgotpage />} />
        <Route path="/ex" element={<MySelect />} />
        <Route
          path="/product"
          element={<Product adddata={adddata} setadddata={setadddata} />}
        />

        <Route
          path="/users/resetpassword"
          element={<ConfirmPassword />}
          caseSensitive
        />

        <Route path="/login" element={<Login />} />
        <Route path="/createuser" element={<Createuser />} />
        <Route
          path="/products/:id"
          element={
            <EachProduct
              setprice={setprice}
              setquantity={setquantity}
              setcartitem={setcartitem}
            />
          }
        />
        <Route
          path="/checkoutpage"
          element={
            <CheckoutPage
              price={price}
              quantity={quantity}
              cartitem={cartitem}
            />
          }
        />
        <Route path="/none" element={<MySelect />} />

        <Route
          path="/myprofile"
          element={
            <ProtectedRouteMyprofile>
              <MyProfile />
            </ProtectedRouteMyprofile>
          }
        />
        <Route
          path="/myorders"
          element={
            <ProtectedRouteMyorder>
              <MyOrders />
            </ProtectedRouteMyorder>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutAdminDashboardPage>
              <Dashboard />
            </ProtectedRoutAdminDashboardPage>
          }
        />
        <Route
          path="/admincatagories"
          element={
            <ProtectedRoutAdminCatagoriesPage>
              <CatagoriesPage />
            </ProtectedRoutAdminCatagoriesPage>
          }
        />
        <Route
          path="/adminproducts"
          element={
            <ProtectedRoutAdminProductPage>
              <AdminuserProduct />
            </ProtectedRoutAdminProductPage>
          }
        />
        <Route
          path="/adminpageusers"
          element={
            <ProtectedRoutAdminPageUsers>
              <AdminuserPageUsers />
            </ProtectedRoutAdminPageUsers>
          }
        />
        <Route
          path="/edit/catagories/:id"
          element={
            <ProtectedRoutEditCatagoriesPage>
              <EditCatagories />
            </ProtectedRoutEditCatagoriesPage>
          }
        />
        <Route
          path="/edit/product/:id"
          element={
            <ProtectedRoutEditProductPage>
              <EditProduct />
            </ProtectedRoutEditProductPage>
          }
        />
        <Route
          path="/order/contact/:id"
          element={
            <ProtectedRoutAdminOrdersPage>
              <OrderAndContactDetails />
            </ProtectedRoutAdminOrdersPage>
          }
        />
        <Route
          path="/editaddress"
          element={
            <ProtectedRouteEditaddress>
              <Editaddress />
            </ProtectedRouteEditaddress>
          }
        />

        <Route path="/otpverify" element={<OtpVerify />} />
      </Routes>
    </div>
  );
}

function ProtectedRoutAdminPageUsers({ children }) {
  return localStorage.getItem("adtoken") ? (
    <section className="text-white">
      <div>{children}</div>
    </section>
  ) : (
    <Navigate replace to="/" />
  );
}
function ProtectedRoutAdminDashboardPage({ children }) {
  return localStorage.getItem("adtoken") ? (
    <section className="text-white">
      <div>{children}</div>
    </section>
  ) : (
    <Navigate replace to="/" />
  );
}
function ProtectedRoutAdminCatagoriesPage({ children }) {
  return localStorage.getItem("adtoken") ? (
    <section className="text-white">
      <div>{children}</div>
    </section>
  ) : (
    <Navigate replace to="/" />
  );
}
function ProtectedRoutEditCatagoriesPage({ children }) {
  return localStorage.getItem("adtoken") ? (
    <section className="text-white">
      <div>{children}</div>
    </section>
  ) : (
    <Navigate replace to="/" />
  );
}
function ProtectedRoutEditProductPage({ children }) {
  return localStorage.getItem("adtoken") ? (
    <section className="text-white">
      <div>{children}</div>
    </section>
  ) : (
    <Navigate replace to="/" />
  );
}
function ProtectedRoutAdminProductPage({ children }) {
  return localStorage.getItem("adtoken") ? (
    <section className="text-white">
      <div>{children}</div>
    </section>
  ) : (
    <Navigate replace to="/" />
  );
}
function ProtectedRoutAdminOrdersPage({ children }) {
  return localStorage.getItem("adtoken") ? (
    <section className="text-white">
      <div>{children}</div>
    </section>
  ) : (
    <Navigate replace to="/" />
  );
}

function ProtectedRouteMyprofile({ children }) {
  return localStorage.getItem("token") || localStorage.getItem("adtoken") ? (
    <section>{children}</section>
  ) : (
    <Navigate to="/" />
  );
}
function ProtectedRouteMyorder({ children }) {
  return localStorage.getItem("token") ? (
    <section>{children}</section>
  ) : (
    <Navigate to="/" />
  );
}
function ProtectedRouteEditaddress({ children }) {
  return localStorage.getItem("token") ? (
    <section>{children}</section>
  ) : (
    <Navigate to="/" />
  );
}

export default App;
