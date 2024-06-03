import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/others/Dashboard';
import Products from '../pages/others/Products';
import AddProduct from '../components/core/products/AddProduct';
import Categories from '../pages/others/Categories';

const AllRoutes = (): JSX.Element => {
    return (
        <>
            <Routes>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/add/product' element={<AddProduct />} />
                <Route path='/products' element={<Products />} />
                <Route path='/product/categories' element={<Categories />} />
            </Routes>
        </>
    );
};

export default AllRoutes;