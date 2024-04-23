// ProfilePage.js
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const ProfilePage = ({ userId }) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    console.log('userId:', userId);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
				const res = await fetch(`/api/users/${userId}`);
				const data = await res.json();
                console.log('data:', data);
				if (data.error) {
                    throw new Error(data.error);
				}
                setLoading(false);
				setUserData(data);
			} catch (error) {
				toast.error(error.message);
                console.error('Error fetching user data:', error);
			}
        };

        fetchUserData();
    }, [userId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!userData) {
        return <div>Error: Unable to fetch user data.</div>;
    }

    return (
        <div>
            <h1>Profile Page</h1>
            <div>
                <img src={userData.profilepic} alt="Profile" />
                <p>Full Name: {userData.fullName}</p>
                <p>Username: {userData.username}</p>
                <p>Gender: {userData.gender}</p>
            </div>
        </div>
    );
};

export default ProfilePage;
