import React from 'react';
import styled from 'styled-components';
import { CustomHeadersType, FeedbackListType } from "../../../config/DataTypes.config";
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { updateFeedback } from '../../../services/slices/UtilitySlice';

const CustomCheckboxContainer = styled.label`
    display: inline-block;
    width: 20px;
    height: 20px;
    background-color: #e0e0e0;
    border-radius: 4px;
    position: relative;
    cursor: pointer;
    transition: background-color 0.2s ease;
    box-shadow: 0 0 5px rgba(0,0,0,0.1);

    &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 6px;
        height: 12px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: translate(-50%, -50%) rotate(45deg) scale(0);
        transition: transform 0.2s ease;
    }
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
    display: none;

    &:checked + ${CustomCheckboxContainer} {
        background-color: #007bff;
    }

    &:checked + ${CustomCheckboxContainer}::after {
        transform: translate(-50%, -50%) rotate(45deg) scale(1);
    }
`;

type FeedbackProps = {
    header: CustomHeadersType | undefined;
    item: FeedbackListType;
    index: number;
    isSelected: boolean;
    handleCheckboxChange: (feedbackId: string, isChecked: boolean) => void;
};

const Feedback = ({ header, item, index, isSelected, handleCheckboxChange }: FeedbackProps): JSX.Element => {
    const dispatch: Dispatch<any> = useDispatch();

    const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleCheckboxChange(item?._id, e.target.checked);
    };

    const isHighlighted = item?.is_highlighted;
    const buttonClass = isHighlighted ? "btn-success" : "btn-primary";
    const buttonText = isHighlighted ? "HIGHLIGHTED" : "HIGHLIGHT";

    return (
        <>
            <tr>
                <td>{index + 1}</td>
                <td>
                    <p style={{ fontSize: "16px" }}>
                        {item?.full_name ? item?.full_name : "--"} <br />
                        <span style={{ fontSize: "12px", fontWeight: "lighter" }}>
                            {item?.designation ? item?.designation : "--"}
                        </span>
                    </p>
                </td>

                <td>
                    <p style={{ fontWeight: "lighter" }}>
                        {item?.email ? item?.email : "--"} <br />
                        {item?.phone ? item?.phone : null}
                    </p>
                </td>

                <td className="px-1" style={{ width: "500px", whiteSpace: "wrap", height: "auto" }}>
                    <p>{item?.message}</p>
                </td>
                <td>
                    <button
                        style={{ borderRadius: "25px", cursor: "pointer" }}
                        className={`btn ${buttonClass} w-50`}
                        onClick={() => dispatch(updateFeedback({ feedback_id: item?._id, header }))}
                    >{buttonText}
                    </button>
                </td>
                <td>
                    <HiddenCheckbox
                        id={item._id}
                        checked={isSelected}
                        onChange={onCheckboxChange}
                    />
                    <CustomCheckboxContainer htmlFor={item._id}></CustomCheckboxContainer>
                </td>
            </tr>
        </>
    );
};

export default Feedback;