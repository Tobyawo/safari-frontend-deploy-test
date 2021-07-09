import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles/style.scss";
import Home from "./pages/HomePage";
import About from "./pages/AboutPage";
import Contact from "./pages/ContactPage";
import Cart from "./pages/CartPage";
import SignInSignUp from "./pages/SignInSignUpPage";
import TermsConditions from "./pages/TermsConditionsPage";
import Clothes from "./pages/categories/Clothes";
import Checkout from "./pages/CheckoutPage";
import Checkout from "./pages/CheckoutPage"
import Shoes from './pages/categories/Shoes';
import Accessories from "./pages/categories/Accessories";
import AccountInfo from "./pages/account/Account";
import AccountAddressBook from "./pages/account/AddressBook";
import AccountMyOrders from "./pages/account/MyOrders";
import AccountMyFavourites from "./pages/account/MyFavourites";
import AdminDashboard from "./pages/admindashboard/AdminDashboard";
import AdminOrders from "./pages/adminorders/AdminOrders";
import AdminProducts from "./pages/adminproducts/AdminProducts";
import ProductPage from "./pages/ProductPage";
import ProductItemLayout from "./components/ProductItemLayout";
import SearchPage from "./pages/SearchPage";
import FavouritesPage from "./pages/FavouritesPage";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/terms-conditions" component={TermsConditions} />
          <Route path="/cart" component={Cart} />
          <Route path="/signin-signup" component={SignInSignUp} />
          <Route path="/categories/clothes/" component={Clothes} />
          <Route path='/categories/shoes' component={Shoes} />
          <Route path="/categories/accessories" component={Accessories} />
          <Route path="/account/information" component={AccountInfo} />
          <Route path="/account/addressbook" component={AccountAddressBook} />
          <Route path="/account/myorders" component={AccountMyOrders} />
          <Route path="/account/myfavourites" component={AccountMyFavourites} />
          <Route path="/admin/dashboard" component={AdminDashboard} />
          <Route path="/favourites" component={FavouritesPage} />
          <Route path="/admin/orders" component={AdminOrders} />
          <Route path="/admin/products" component={AdminProducts} />
          <Route path="/search?keyword=data" component={SearchPage} />
          <Route path="/product/:id" component={ProductPage} />
          <Route path="/product" component={ProductPage} />
          <Route path="/search" component={SearchPage} />
          <Route path ="/checkout" component={Checkout} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
