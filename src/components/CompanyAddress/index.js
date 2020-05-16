import React from 'react';
import useTranslations from '../useTranslations';

const CompanyAddress = () => {

    const {} = useTranslations();

    const centerText = {textAlign: 'center'}

    return (
        <>
            <div style={centerText}>
            <p>1 Bridge Plaza N</p>
            <p>Suite 275</p>
            <p>Fort Lee, NJ 07024</p>
            <p>(267) 775 - 3011</p>
            <p>support@uequations.com</p>
            <p>© 2020 All Rights Reserved</p>
            </div>
        </>
    )
}

export default CompanyAddress
