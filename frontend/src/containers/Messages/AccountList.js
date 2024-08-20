import React from 'react';

const AccountList = ({ accounts, onSelectAccount }) => {
  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-md w-full">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Accounts</h2>
      <ul className="list-none p-0">
        {accounts.length > 0 ? (
          accounts.map(account => (
            <li
              key={account.id}
              className="p-3 border-t border-b border-black  transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer rounded-lg mb-2"
              onClick={() => onSelectAccount(account)}
            >
              <div className="flex justify-between no-underline items-center">
                <p className="font-medium text-gray-900">{account.user_name}</p>
              </div>
            </li>
          ))
        ) : (
          <div className="p-4 text-gray-500">No accounts available</div>
        )}
      </ul>
    </div>
  );
};

export default AccountList;
