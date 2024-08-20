import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AccountList from "./AccountList";
import { getToken } from '../../services/LocalStorageService';
import { useGetLoggedUserQuery } from '../../services/userAuthApi';
import ChatBox from './ChatBox';
import axios from 'axios';


const ChatPage = () => {
  const { ids } = useParams();
  const [selectedAccount, setSelectedAccount] = useState(null);
  const { access_token } = getToken();  // Ensure you have this function
  const { data: loggedUser, isSuccess, isLoading, error } = useGetLoggedUserQuery(access_token);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    if (loggedUser) {
      axios.get('http://localhost:8000/api/realtors')
        .then(response => {
          const filteredAccounts = response.data.results?.filter(account => account.user !== loggedUser.id) || [];
          setAccounts(filteredAccounts);
        })
        .catch(error => console.error("Error fetching accounts", error));
    }
  }, [loggedUser]);

  useEffect(() => {
    if (ids) {
      const [senderId, receiverId] = ids.split('_');
      if (senderId === loggedUser?.id.toString()) {
        const selected = accounts.find(account => account.id.toString() === receiverId);
        setSelectedAccount(selected);
      }
    }
  }, [ids, loggedUser, accounts]);

  return (
    <div className="h-screen flex overflow-hidden">
      <div className="w-1/3 border-r bg-gradient-to-b from-blue-200 to-blue-400 shadow-lg  relative flex flex-col items-center justify-center">
        
        <AccountList 
          accounts={accounts} 
          onSelectAccount={setSelectedAccount} 
        />
      </div>
      <div className="w-2/3 flex flex-col bg-gradient-to-b from-gray-100 to-gray-300 shadow-lg">
        {isLoading ? (
          <div className="p-4 flex items-center justify-center h-full text-gray-500">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
          </div>
        ) : isSuccess && loggedUser ? (
          selectedAccount ? (
            <ChatBox 
              senderId={loggedUser.id} 
              selectedAccount={selectedAccount} 
              key={selectedAccount.id}
            />
          ) : (
            <div className="p-4 flex items-center justify-center h-full text-gray-500">
              Select an account to start chatting
            </div>
          )
        ) : (
          <div className="p-4 flex items-center justify-center h-full text-gray-500">
            Error loading user data
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;