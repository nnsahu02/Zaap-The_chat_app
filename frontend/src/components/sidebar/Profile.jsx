import React, { useState, useEffect } from 'react';
import { CgProfile } from "react-icons/cg";
import { useAuthContext } from '../../context/AuthContext';

const Profile = () => {
    const { authUser } = useAuthContext();
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [userData, setUserData] = useState(null); // State to hold user data
    const [loading, setLoading] = useState(false);

    const profileClickHandler = () => {
        setShowProfileModal(true);
        fetchUserData(); // Fetch user data when profile icon is clicked
    }

    // Function to fetch user data
    const fetchUserData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/users/${authUser._id}`);
            const userData = await response.json();
            setUserData(userData);
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <CgProfile
                className="w-6 h-6 text-white cursor-pointer"
                onClick={profileClickHandler}
                style={{ margin : '30px 50px 10px 4px'}}
            />
            {showProfileModal && (
                <div style={modalStyle}>
                    <div style={modalContentStyle}>
                        {loading && <p>Loading...</p>}
                        {userData && (
                            <div>
                                <div className='w-15 rounded-full'>
                                    <img src={userData.profilePic} alt='user avatar' />
                                </div>
                                <div style={userInfoContainerStyle}>
                                    <h2 style={modalHeaderTextStyle}>User Profile</h2>
                                    <p><strong>Full Name:</strong> {userData.fullName}</p>
                                    <p><strong>Username:</strong> {userData.username}</p>
                                    <p><strong>Gender:</strong> {userData.gender}</p>
                                </div>
                            </div>
                        )}
                        <button style={closeButtonStyle} onClick={() => setShowProfileModal(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

const modalStyle = {
    position: 'fixed',
    top: 160,
    left: 260,
    width: '40%',
    height: '40%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};

const modalContentStyle = {
    backgroundColor: '#fefefe',
    padding: '30px',
    borderRadius: '8px',
    maxWidth: '500px',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: '16px'
};

const profileImageContainerStyle = {
    textAlign: 'center'
};

const profileImageStyle = {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    margin: '20px 0',
    border: '4px solid #ffffff'
};

const userInfoContainerStyle = {
    marginBottom: '20px'
};

const modalHeaderTextStyle = {
    margin: 0,
    fontSize: '20px',
    fontWeight: 'bold',
    color : '#333',
    marginBottom: '10px'
};

const closeButtonStyle = {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'block',
    margin: '0 auto'
};

export default Profile;
