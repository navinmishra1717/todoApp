import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

interface User {
    id: string;
    firstname: string;
    lastname?: string;
    profile?: string;
    email?: string;
    gender?: string;
}

export default function UserList() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://randomuser.me/api/');
            const userData = response.data?.results[0];
            setUsers([
                ...users,
                {
                    id: userData?.id?.value,
                    firstname: userData?.name?.first,
                    lastname: userData?.name?.last,
                    email: userData?.email,
                    profile: userData?.picture?.thumbnail
                }
            ]);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('Failed to fetch user:', error);
        }
    };

    const handleNext = async () => {
        if (currentIndex === users.length - 1) {
            await fetchUser();
            setCurrentIndex(currentIndex + 1);
        } else {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return loading ? (
        <p>Loading...</p>
    ) : (
        <div>
            <b>Users</b>
            <div className="user-table">
                {users?.length &&
                    users.map((user: User) => (
                        <div className="table-data">
                            {users[currentIndex].email === user.email ? (
                                <>
                                    <b>name: {user.firstname}</b>
                                    <b>surname: {user.lastname}</b>
                                </>
                            ) : (
                                <>
                                    <span>name: {user.firstname}</span>
                                    <span>surname: {user.lastname}</span>
                                </>
                            )}
                        </div>
                    ))}
            </div>
            <div className="button-section">
                <button onClick={handlePrevious} disabled={currentIndex === 0}>
                    Previous
                </button>
                <button onClick={handleNext}>Next</button>
            </div>
        </div>
    );
}
