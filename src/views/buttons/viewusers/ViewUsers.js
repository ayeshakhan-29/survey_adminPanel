/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { db } from '../../../Firebase/Firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { FaTrash } from 'react-icons/fa'; // Import the trash icon from React Icons

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Function to fetch user data from Firestore
    const fetchUserData = async () => {
      try {
        const usersCollection = collection(db, 'users');
        const snapshot = await getDocs(usersCollection);

        const userData = [];
        snapshot.forEach((doc) => {
          userData.push({ id: doc.id, ...doc.data() });
        });

        setUsers(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // Function to delete a user
  const deleteUser = async (userId) => {
    try {
      const userDoc = doc(db, 'users', userId);
      await deleteDoc(userDoc);

      // Remove the deleted user from the state
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <h2 className='text-sky-400 text-2xl mb-4'>User List</h2>
      <table className='table-fixed border-collapse w-3/4 mx-auto'> {/* Set the width of the table */}
        <thead>
          <tr className='bg-sky-300'>
            <th className='w-1/4 border border-gray-400 px-4 py-2'>Name</th>
            <th className='w-1/4 border border-gray-400 px-4 py-2'>Email</th>
            <th className='w-1/4 border border-gray-400 px-4 py-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className='bg-white'>
              <td className='w-1/4 border border-gray-400 px-4 py-2'>{user.displayName}</td>
              <td className='w-1/4 border border-gray-400 px-4 py-2'>{user.email}</td>
              <td className='w-1/4 border border-gray-400 px-4 py-2'>
                <button
                  className='bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded'
                  onClick={() => deleteUser(user.id)}
                >
                  <FaTrash /> {/* Trash bin icon */}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
