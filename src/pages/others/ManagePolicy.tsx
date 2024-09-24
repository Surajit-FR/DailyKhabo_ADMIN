import { Link } from "react-router-dom";
import { CustomHeadersType } from "../../config/DataTypes.config";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { policyValidationSchema } from "../../helper/FormValidation";
import { useState } from "react";
import { addPolicy, clearAddPolicyResp, clearError } from "../../services/slices/UtilitySlice";
import CustomAlert from "../../util/CustomAlert";

type Custom_props = {
    header: CustomHeadersType | undefined;
};

const ManagePolicy = ({ header }: Custom_props): JSX.Element => {
    const { policy_resp_data, error } = useSelector((state: any) => state.utilitySlice);
    const dispatch: Dispatch<any> = useDispatch();
    const [file, setFile] = useState<File | null>(null);

    const { setFieldValue, values, handleSubmit, handleChange, errors, touched, resetForm } = useFormik({
        initialValues: {
            policyName: "",
            file: null
        },
        validationSchema: policyValidationSchema,
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append("policyName", values.policyName);
            if (file) {
                formData.append("policyFile", file);
            };
            dispatch(addPolicy({ data: formData, resetForm, header }));
        }
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.currentTarget.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFieldValue("file", selectedFile);
        }
    };

    return (
        <>
            <main className="page-content">
                <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                    <div className="breadcrumb-title pe-3">Manage Privacy Policy</div>
                    <div className="ps-3">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb mb-0 p-0">
                                <li className="breadcrumb-item">
                                    <Link to="#"><i className="bx bx-home-alt"></i></Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">Privacy Policy</li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12 mx-auto">
                        <div className="card">
                            <div className="card-header py-3 bg-transparent">
                                <div className="d-sm-flex align-items-center">
                                    <h5 className="mb-2 mb-sm-0">Add Privacy Policy</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card-body">

                    <div className="row d-flex justify-content-center">
                        <div className="col-6">
                            {
                                error?.success === false ?
                                    <CustomAlert
                                        type="danger"
                                        message={error?.message}
                                        onClose={() => dispatch(clearError())}
                                    /> : policy_resp_data?.success === true ?
                                        <CustomAlert
                                            type="success"
                                            message={policy_resp_data?.message}
                                            onClose={() => dispatch(clearAddPolicyResp())}
                                        /> : null
                            }
                        </div>
                    </div>

                    <form className="row g-3" onSubmit={handleSubmit}>
                        <div className="col-12 col-lg-8">
                            <div className="card shadow-none bg-light border">
                                <div className="row g-3 card-body">
                                    <div className="col-12 col-lg-12">
                                        <label className="form-label">Policy Name</label>
                                        <input
                                            type="text"
                                            className="form-control mb-2"
                                            placeholder="Policy Name"
                                            value={values.policyName}
                                            onChange={handleChange}
                                            name="policyName"
                                        />
                                        {errors.policyName && touched.policyName && (
                                            <div className="text-danger">*{errors.policyName}</div>
                                        )}

                                        <label className="form-label">Upload Policy Document (.doc)</label>
                                        <input
                                            type="file"
                                            className="form-control mb-2"
                                            accept=".doc, .docx"
                                            onChange={handleFileChange}
                                        />
                                        {errors.file && touched.file && (
                                            <div className="text-danger">*{errors.file}</div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="ms-auto">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Add Content
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
};

export default ManagePolicy;