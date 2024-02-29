import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Services from "./components/Services";
import Products from "./components/products";
import About from "./components/About";
import Blog from "./components/Blog"

function LandingPage(){
  return(
    <>
      <NavBar/>
      <Home/>
      <Services/>
      <About/>
      <Products/>
      <Blog/>
    </>
  )
}

export default LandingPage;
