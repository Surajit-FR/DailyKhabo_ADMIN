import * as Yup from 'yup';

// login validation
export const loginValidationSchema = Yup.object({
    credential: Yup.string().email('Invalid email address').required('Email ID is required'),
    password: Yup.string().required('Password is required')
});

// category validation
export const categoryValidationSchema = Yup.object({
    category_name: Yup.string()
        .required('Category name is required'),
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
    productImages: Yup.array().of(Yup.mixed().required("Product image is required")).min(1, "At least one product image is required"),
    productDescription: Yup.string(),
    price: Yup.number().required("Price is required").positive("Price must be a positive number"),
    availability: Yup.string().required("Availability selection is required"),
    visibility: Yup.string().required("Visibility selection is required"),
    category: Yup.string().required("Category selection is required")
});