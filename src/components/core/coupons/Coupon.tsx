import React from 'react';
import styled from 'styled-components';
import { CouponListType } from '../../../config/DataTypes.config';
import { formatDateTime } from '../../../helper/FormatDateTime';

// Styled Components for the custom checkbox
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

    /* Pseudo-element for the check mark */
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

type DataListProps = {
    data: CouponListType,
    index: number,
    isSelected: boolean,
    handleCheckboxChange: (couponId: string, isChecked: boolean) => void,
}

const Coupon = ({ data, index, isSelected, handleCheckboxChange }: DataListProps): JSX.Element => {

    const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleCheckboxChange(data._id, e.target.checked);
    };

    return (
        <tr>
            <td>{index + 1}.</td>
            <td>{data?.discount_coupon}</td>
            <td>{data?.discount_amount}</td>
            <td>
                {
                    data?.is_expired ?
                        <span className='text-danger' style={{ fontSize: "18px" }}>EXPIRED</span>
                        : <span className='text-success' style={{ fontSize: "18px" }}>ACTIVE</span>
                }
            </td>
            <td>{formatDateTime(data?.expiry_date)}</td>
            <td>
                <HiddenCheckbox
                    id={data?._id}
                    checked={isSelected}
                    onChange={onCheckboxChange}
                />
                <CustomCheckboxContainer htmlFor={data?._id}></CustomCheckboxContainer>
            </td>
        </tr>
    );
};

export default Coupon;