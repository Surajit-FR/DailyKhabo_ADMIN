import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/others/Dashboard';
import Products from '../pages/others/Products';
import AddProduct from '../components/core/products/AddProduct';
import Categories from '../pages/others/Categories';
import Coupons from '../pages/others/Coupons';
import Customers from '../pages/others/Customers';
import Orders from '../pages/others/Orders';
import { useMemo } from 'react';


const AllRoutes = (): JSX.Element => {
    const token: string | null = window.localStorage.getItem("token");
    const _TOKEN = JSON.parse(token ?? 'null');

    const header = useMemo(() => ({
        headers: {
            Authorization: `Bearer ${_TOKEN}`
        }
    }), [_TOKEN]);
    return (
        <>
            <Routes>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/add/product' element={<AddProduct />} />
                <Route path='/products' element={<Products />} />
                <Route path='/product/categories' element={<Categories />} />
                <Route path='/coupons' element={<Coupons />} />
                <Route path='/customers' element={<Customers header={header} />} />
                <Route path='/orders' element={<Orders header={header} />} />
            </Routes>
        </>
    );
};

export default AllRoutes;