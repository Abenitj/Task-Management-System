import React from 'react';

const FormCard = ({ title, description, icon: Icon, linkText, linkUrl, bgColor, iconColor }) => {
  return (
    <a href={linkUrl} className="block bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-xs mx-auto">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold text-gray-800 dark:text-white">{title}</div>
          <div className={`p-2 ${iconColor} text-white rounded-full`}>
            <Icon size={20} />
          </div>
        </div>
        <div className="mt-2 text-gray-600 dark:text-gray-400">
          <p>{description}</p>
        </div>
      </div>
      <div className={`p-3 ${bgColor} text-center text-gray-500 dark:text-gray-300`}>
        <p className="hover:text-gray-700 dark:hover:text-white">{linkText}</p>
      </div>
    </a>
  );
};

export default FormCard;
