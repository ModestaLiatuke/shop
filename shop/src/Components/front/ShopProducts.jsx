import { useContext } from "react";
import FrontContext from "../../Contexts/FrontContext";
import Product from "./Product";
import filterShow from "../../Function/filterShow";

function ShopProducts() {
    const { products } = useContext(FrontContext)

    return (
        <div className="products">
            {
                products.map(p => filterShow(p.show) ? <Product key={p.id} product={p}></Product> : null)
            }

        </div>
    )
}

export default ShopProducts;