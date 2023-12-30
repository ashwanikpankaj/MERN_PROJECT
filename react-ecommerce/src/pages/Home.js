import NavBar from "../features/navbar/NavBar"
import ProductList from "../features/productList/ProductList"
import SignupPage from "./SignupPage";

const Home = ()=>{
    return <NavBar>
        {/* <ProductList/> */}
        <SignupPage/>
    </NavBar>
}
export default Home;