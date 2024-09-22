import { Auth } from 'aws-amplify';
import React, { useEffect } from 'react';

const AccountManagement = () => {
    useEffect(() => {
        getAttributes()
    }, [])
    const getAttributes = async () => {
        const user = await Auth.currentAuthenticatedUser();
    
        const { attributes } = user;
        console.log(attributes)
    }
    

    return (
        <div>

        </div>
    );
}

export default AccountManagement;