import * as Yup from 'yup';

// login validation
export const loginValidationSchema = Yup.object({
    credential: Yup.string().email('Invalid email address').required('Email ID is required'),
    password: Yup.string().required('Password is required')
});

// category validation
export const categoryValidationSchema = Yup.object({
    category_name: Yup.string().required('Category name is required'),
    categoryImage: Yup.mixed().required("Category image is required"),
});

// add product validation
export const addProductValidationSchema = Yup.object({
    productTitle: Yup.string().required("Product title is required"),
    offer: Yup.string().required("Offer selection is required"),
    offerPercentage: Yup.number()
        .when('offer', {
            is: (offer: any) => offer === 'true',
            then: (schema) => schema.required('Offer percentage is required').min(0, 'Minimum value is 0').max(100, 'Maximum value is 100'),
            otherwise: (schema) => schema.nullable()
        }),
    is_discount_code: Yup.string().required("Discount code selection is required"),
    discountCode: Yup.string()
        .when('is_discount_code', {
            is: (offer: any) => offer === 'true',
            then: (schema) => schema.required('Discount code is required').matches(/^[A-Z0-9]{10}$/, 'Discount code must be 10 uppercase alphanumeric characters without spaces'),
            otherwise: (schema) => schema.nullable()
        }),
    productImages: Yup.array().of(Yup.mixed().required("Product image is required")).min(1, "At least one product image is required"),
    productDescription: Yup.string(),
    productQuantity: Yup.number().required("Quantity is required").positive("Quantity must be a positive number"),
    price: Yup.number().required("Price is required").positive("Price must be a positive number"),
    availability: Yup.string().required("Availability selection is required"),
    category: Yup.string().required("Category selection is required"),
    // productKeyPoints: Yup.array().of(Yup.mixed().required("Product highlight is required")).min(1, "At least one key point is required")
});

// coupon validation
export const couponValidationSchema = Yup.object({
    couponNumber: Yup.number().required("Number is required").positive("Number must be a positive number"),
    discount_amount: Yup.number().required("Discount amount is required").positive("Discount amount must be a positive number"),
    expiry_date: Yup.date().required("Expiry date is required").min(new Date(), "Expiry date must be in the future")
});