import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ADDCATEGORY, ADDPRODUCT, CREATECOUPON, DELETECATEGORY, DELETECOUPONS, DELETEPRODUCT, GETALLCATEGORIES, GETALLCOUPONS, GETALLCUSTOMERS, GETALLORDERS, GETALLPRODUCTS, GETPRODUCTDETAILS, UPDATECATEGORY, UPDATEPRODUCT } from "../api/Api";
import { CategoryOperationResponse, ProductOperationResponse, FetchAllCategoryResponse, FetchAllProductResponse, FormValues_Props } from "../../config/DataTypes.config";

// addCategory thunk
export const addCategory = createAsyncThunk("/admin/api/add/new/category", async ({ data, page, pageSize, header }: FormValues_Props, { rejectWithValue, dispatch }): Promise<CategoryOperationResponse | any> => {
    try {
        const response = await ADDCATEGORY(data, header);
        const result: CategoryOperationResponse = response?.data;
        if (result?.success) {
            dispatch(getAllCategory({ page, pageSize, header }));
            return result
        };
    } catch (exc: any) {
        const err: any = rejectWithValue(exc.response.data);
        return err;
    }
});

// updateCategory thunk
export const updateCategory = createAsyncThunk("/admin/api/update/category", async ({ data, page, pageSize, category_id, header }: FormValues_Props, { rejectWithValue, dispatch }): Promise<CategoryOperationResponse | any> => {
    try {
        const response = await UPDATECATEGORY(data, category_id, header);
        const result: CategoryOperationResponse = response?.data;
        if (result?.success) {
            dispatch(getAllCategory({ page, pageSize, header }));
            return result
        };
    } catch (exc: any) {
        const err: any = rejectWithValue(exc.response.data);
        return err;
    }
});

// getAllCategory thunk
export const getAllCategory = createAsyncThunk("/admin/api/get/all/category", async ({ page, pageSize, header }: FormValues_Props, { rejectWithValue }): Promise<FetchAllCategoryResponse | any> => {
    try {
        const response = await GETALLCATEGORIES(page, pageSize, header);
        const result: FetchAllCategoryResponse = response?.data;
        if (result?.success) return result;
    } catch (exc: any) {
        const err: any = rejectWithValue(exc.response.data);
        return err;
    }
});

// deleteCategory thunk
export const deleteCategory = createAsyncThunk("/admin/api/delete/category", async ({ category_id, page, pageSize, header }: FormValues_Props, { rejectWithValue, dispatch }): Promise<FetchAllCategoryResponse | any> => {
    try {
        const response = await DELETECATEGORY(category_id, header);
        const result: FetchAllCategoryResponse = response?.data;
        if (result?.success) {
            dispatch(getAllCategory({ page, pageSize, header }));
            return result
        };
    } catch (exc: any) {
        const err: any = rejectWithValue(exc.response.data);
        return err;
    }
});

// addProduct thunk
export const addProduct = createAsyncThunk("/admin/api/add/new/product", async ({ data, header }: FormValues_Props, { rejectWithValue }): Promise<ProductOperationResponse | any> => {
    try {
        const response = await ADDPRODUCT(data, header);
        const result: ProductOperationResponse = response?.data;
        if (result?.success) {
            return result
        };
    } catch (exc: any) {
        const err: any = rejectWithValue(exc.response.data);
        return err;
    }
});

// updateProduct thunk
export const updateProduct = createAsyncThunk("/admin/api/update/product/", async (params: FormValues_Props, { rejectWithValue, dispatch }): Promise<ProductOperationResponse | any> => {
    try {
        const { data, page, pageSize, searchQuery, category, product_id, header } = params;
        const response = await UPDATEPRODUCT(data, product_id, header);
        const result: ProductOperationResponse = response?.data;
        if (result?.success) {
            dispatch(getAllProduct({ page, pageSize, searchQuery, category, header }));
            return result
        };
    } catch (exc: any) {
        const err: any = rejectWithValue(exc.response.data);
        return err;
    }
});

// getAllProduct thunk
export const getAllProduct = createAsyncThunk("/admin/api/get/all/product", async (params: FormValues_Props, { rejectWithValue }): Promise<FetchAllProductResponse | any> => {
    try {
        const { page, pageSize, searchQuery, category, header } = params;
        const response = await GETALLPRODUCTS({ page, pageSize, searchQuery, category }, header);
        const result: FetchAllProductResponse = response?.data;
        if (result?.success) {
            return result
        };
    } catch (exc: any) {
        const err: any = rejectWithValue(exc.response.data);
        return err;
    }
});

// getProductDetails thunk
export const getProductDetails = createAsyncThunk("/admin/api/get/product/details", async ({ product_id, header }: FormValues_Props, { rejectWithValue }): Promise<FetchAllProductResponse | any> => {
    try {
        const response = await GETPRODUCTDETAILS(product_id, header);
        const result: FetchAllProductResponse = response?.data;
        if (result?.success) {
            return result
        };
    } catch (exc: any) {
        const err: any = rejectWithValue(exc.response.data);
        return err;
    }
});

// deleteProduct thunk
export const deleteProduct = createAsyncThunk("/admin/api/delete/product", async (params: FormValues_Props, { rejectWithValue, dispatch }): Promise<ProductOperationResponse | any> => {
    try {
        const { page, pageSize, searchQuery, category, product_id, header } = params;
        const response = await DELETEPRODUCT(product_id, header);
        const result: ProductOperationResponse = response?.data;
        if (result?.success) {
            dispatch(getAllProduct({ page, pageSize, searchQuery, category, header }));
            return result
        };
    } catch (exc: any) {
        const err: any = rejectWithValue(exc.response.data);
        return err;
    }
});

// createCoupon thunk
export const createCoupon = createAsyncThunk("/admin/api/create/coupons", async ({ data, page, pageSize, header }: FormValues_Props, { rejectWithValue, dispatch }): Promise<any> => {
    try {
        const response = await CREATECOUPON(data, header);
        const result: any = response?.data;
        if (result?.success) {
            dispatch(getAllCoupons({ page, pageSize, header }));
            return result
        };
    } catch (exc: any) {
        const err: any = rejectWithValue(exc.response.data);
        return err;
    }
});

// getAllCoupons thunk
export const getAllCoupons = createAsyncThunk("/admin/api/get/all/coupons", async (params: FormValues_Props, { rejectWithValue }): Promise<any> => {
    try {
        const { page, pageSize, isExpired, header } = params;
        const response = await GETALLCOUPONS({ page, pageSize, isExpired }, header);
        const result: any = response?.data;
        if (result?.success) return result;
    } catch (exc: any) {
        const err: any = rejectWithValue(exc.response.data);
        return err;
    }
});

// deleteCoupons thunk
export const deleteCoupons = createAsyncThunk("/admin/api/delete/coupons", async ({ selectedIDs, page, pageSize, isExpired, header }: FormValues_Props, { rejectWithValue, dispatch }): Promise<any> => {
    try {
        const response = await DELETECOUPONS(selectedIDs, header);
        const result: any = response?.data;
        if (result?.success) {
            dispatch(getAllCoupons({ page, pageSize, isExpired, header }));
            return result;
        }
    } catch (exc: any) {
        const err: any = rejectWithValue(exc.response.data);
        return err;
    }
});

// getAllCustomers thunk
export const getAllCustomers = createAsyncThunk("/admin/api/get/all/customers", async (params: FormValues_Props, { rejectWithValue }): Promise<any> => {
    try {
        const { searchQuery, header } = params;
        const response = await GETALLCUSTOMERS({ searchQuery }, header);
        const result: any = response?.data;
        if (result?.success) {
            return result
        };
    } catch (exc: any) {
        const err: any = rejectWithValue(exc.response.data);
        return err;
    }
});

// getAllOrders thunk
export const getAllOrders = createAsyncThunk("/admin/api/get/all/orders", async (params: FormValues_Props, { rejectWithValue }): Promise<any> => {
    try {
        const { page, pageSize, searchQuery, header } = params;
        const response = await GETALLORDERS({ page, pageSize, searchQuery }, header);
        const result: any = response?.data;
        if (result?.success) {
            return result
        };
    } catch (exc: any) {
        const err: any = rejectWithValue(exc.response.data);
        return err;
    }
});

const UtilitySlice = createSlice({
    name: "utilitySlice",
    initialState: {
        // Category States
        category_resp_data: null,
        category_del_resp: null,
        category_data: [],
        update_category_resp_data: null,
        update_cat_error: null,

        // Product States
        add_product_resp_data: null,
        update_product_resp_data: null,
        product_del_resp: null,
        products_data: [],
        products_details_data: [],
        del_error: null,

        // Coupon States
        coupon_data: [],
        add_coupon_resp_data: null,
        coupon_del_resp: null,

        // Customers States
        customers_data: [],

        // Orders States
        orders_data: [],

        // Common States
        utility_loading: false,
        error: null,
    },
    reducers: {
        clearCategoryRespData(state) {
            state.category_resp_data = null;
        },
        clearUpdateCategoryRespData(state) {
            state.update_category_resp_data = null;
        },
        clearCategoryDelResp(state) {
            state.category_del_resp = null;
        },
        clearCatError(state) {
            state.update_cat_error = null;
        },

        clearAddProductRespData(state) {
            state.add_product_resp_data = null;
        },
        clearUpdateProductRespData(state) {
            state.update_product_resp_data = null;
        },
        clearProductDelResp(state) {
            state.product_del_resp = null;
        },
        clearProductsDetailsData(state) {
            state.products_details_data = [];
        },
        clearDelError(state) {
            state.del_error = null;
        },

        clearAddCouponRespData(state) {
            state.add_coupon_resp_data = null;
        },
        clearCouponDelResp(state) {
            state.coupon_del_resp = null;
        },

        clearError(state) {
            state.error = null;
        },
    },
    extraReducers: builder => {
        // addCategory states
        builder.addCase(addCategory.pending, (state) => {
            state.utility_loading = true;
        })
        builder.addCase(addCategory.fulfilled, (state, { payload }) => {
            state.utility_loading = false;
            const category_resp_data: any = payload;
            state.category_resp_data = category_resp_data;
        })
        builder.addCase(addCategory.rejected, (state, { payload }) => {
            state.utility_loading = false;
            const err: any | null = payload;
            state.error = err;
        })

        // updateCategory states
        builder.addCase(updateCategory.pending, (state) => {
            state.utility_loading = true;
        })
        builder.addCase(updateCategory.fulfilled, (state, { payload }) => {
            state.utility_loading = false;
            const update_category_resp_data: any = payload;
            state.update_category_resp_data = update_category_resp_data;
        })
        builder.addCase(updateCategory.rejected, (state, { payload }) => {
            state.utility_loading = false;
            const err: any | null = payload;
            state.update_cat_error = err;
        })

        // getAllCategory states
        builder.addCase(getAllCategory.pending, (state) => {
            state.utility_loading = true;
        })
        builder.addCase(getAllCategory.fulfilled, (state, { payload }) => {
            state.utility_loading = false;
            const category_data: any = payload;
            state.category_data = category_data;
        })
        builder.addCase(getAllCategory.rejected, (state, { payload }) => {
            state.utility_loading = false;
            const err: any | null = payload;
            state.error = err;
        })

        // deleteCategory states
        builder.addCase(deleteCategory.pending, (state) => {
            state.utility_loading = true;
        })
        builder.addCase(deleteCategory.fulfilled, (state, { payload }) => {
            state.utility_loading = false;
            const category_del_resp: any = payload;
            state.category_del_resp = category_del_resp;
        })
        builder.addCase(deleteCategory.rejected, (state, { payload }) => {
            state.utility_loading = false;
            const err: any | null = payload;
            state.del_error = err;
        })

        // addProduct states
        builder.addCase(addProduct.pending, (state) => {
            state.utility_loading = true;
        })
        builder.addCase(addProduct.fulfilled, (state, { payload }) => {
            state.utility_loading = false;
            const add_product_resp_data: any = payload;
            state.add_product_resp_data = add_product_resp_data;
        })
        builder.addCase(addProduct.rejected, (state, { payload }) => {
            state.utility_loading = false;
            const err: any | null = payload;
            state.error = err;
        })

        // updateProduct states
        builder.addCase(updateProduct.pending, (state) => {
            state.utility_loading = true;
        })
        builder.addCase(updateProduct.fulfilled, (state, { payload }) => {
            state.utility_loading = false;
            const update_product_resp_data: any = payload;
            state.update_product_resp_data = update_product_resp_data;
        })
        builder.addCase(updateProduct.rejected, (state, { payload }) => {
            state.utility_loading = false;
            const err: any | null = payload;
            state.error = err;
        })

        // getAllProduct states
        builder.addCase(getAllProduct.pending, (state) => {
            state.utility_loading = true;
        })
        builder.addCase(getAllProduct.fulfilled, (state, { payload }) => {
            state.utility_loading = false;
            const products_data: any = payload;
            state.products_data = products_data;
        })
        builder.addCase(getAllProduct.rejected, (state, { payload }) => {
            state.utility_loading = false;
            const err: any | null = payload;
            state.error = err;
        })

        // getProductDetails states
        builder.addCase(getProductDetails.pending, (state) => {
            state.utility_loading = true;
        })
        builder.addCase(getProductDetails.fulfilled, (state, { payload }) => {
            state.utility_loading = false;
            const products_details_data: any = payload;
            state.products_details_data = products_details_data;
        })
        builder.addCase(getProductDetails.rejected, (state, { payload }) => {
            state.utility_loading = false;
            const err: any | null = payload;
            state.error = err;
        })

        // deleteProduct states
        builder.addCase(deleteProduct.pending, (state) => {
            state.utility_loading = true;
        })
        builder.addCase(deleteProduct.fulfilled, (state, { payload }) => {
            state.utility_loading = false;
            const product_del_resp: any = payload;
            state.product_del_resp = product_del_resp;
        })
        builder.addCase(deleteProduct.rejected, (state, { payload }) => {
            state.utility_loading = false;
            const err: any | null = payload;
            state.del_error = err;
        })

        // createCoupon states
        builder.addCase(createCoupon.pending, (state) => {
            state.utility_loading = true;
        })
        builder.addCase(createCoupon.fulfilled, (state, { payload }) => {
            state.utility_loading = false;
            const add_coupon_resp_data: any = payload;
            state.add_coupon_resp_data = add_coupon_resp_data;
        })
        builder.addCase(createCoupon.rejected, (state, { payload }) => {
            state.utility_loading = false;
            const err: any | null = payload;
            state.error = err;
        })

        // getAllCoupons states
        builder.addCase(getAllCoupons.pending, (state) => {
            state.utility_loading = true;
        })
        builder.addCase(getAllCoupons.fulfilled, (state, { payload }) => {
            state.utility_loading = false;
            const coupon_data: any = payload;
            state.coupon_data = coupon_data;
        })
        builder.addCase(getAllCoupons.rejected, (state, { payload }) => {
            state.utility_loading = false;
            const err: any | null = payload;
            state.error = err;
        })

        // deleteCoupons states
        builder.addCase(deleteCoupons.pending, (state) => {
            state.utility_loading = true;
        })
        builder.addCase(deleteCoupons.fulfilled, (state, { payload }) => {
            state.utility_loading = false;
            const coupon_del_resp: any = payload;
            state.coupon_del_resp = coupon_del_resp;
        })
        builder.addCase(deleteCoupons.rejected, (state, { payload }) => {
            state.utility_loading = false;
            const err: any | null = payload;
            state.del_error = err;
        })

        // getAllCustomers states
        builder.addCase(getAllCustomers.pending, (state) => {
            state.utility_loading = true;
        })
        builder.addCase(getAllCustomers.fulfilled, (state, { payload }) => {
            state.utility_loading = false;
            const customers_data: any = payload;
            state.customers_data = customers_data;
        })
        builder.addCase(getAllCustomers.rejected, (state, { payload }) => {
            state.utility_loading = false;
            const err: any | null = payload;
            state.del_error = err;
        })

        // getAllOrders states
        builder.addCase(getAllOrders.pending, (state) => {
            state.utility_loading = true;
        })
        builder.addCase(getAllOrders.fulfilled, (state, { payload }) => {
            state.utility_loading = false;
            const orders_data: any = payload;
            state.orders_data = orders_data;
        })
        builder.addCase(getAllOrders.rejected, (state, { payload }) => {
            state.utility_loading = false;
            const err: any | null = payload;
            state.del_error = err;
        })
    }
})


export const {
    clearCategoryRespData,
    clearUpdateCategoryRespData,
    clearCatError,
    clearCategoryDelResp,

    clearAddProductRespData,
    clearUpdateProductRespData,
    clearProductDelResp,
    clearProductsDetailsData,
    clearDelError,

    clearAddCouponRespData,
    clearCouponDelResp,

    clearError,
} = UtilitySlice.actions;
export default UtilitySlice.reducer;