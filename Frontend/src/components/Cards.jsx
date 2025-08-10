import React from "react";
import { useNavigate } from "react-router-dom";
import PaymentButton from "./PaymentButton";
import toast from 'react-hot-toast';

const Cards = ({ item, course }) => {
  const navigate = useNavigate();

  const handleDownload = async () => {
    try {
      // Using the new file ID
      const fileId = '1OYbTsuwFxM-G7P2gcc74IyPIKdlvTC7B';
      const downloadUrl = `https://drive.google.com/uc?export=download&id=1vIqkf2-EadEOWT46xIvnkYMwFkDBbcSB
`;
      
      // Create a temporary anchor element
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Download started!');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download. Please try again.');
    }
  };

  if (!item) {
    return <p>Course not available</p>;
  }

  return (
    <div className="mt-4 my-3 p-3">
      <div className="card bg-base-100 w-92 shadow-xl hover:scale-105 duration-300 transition-all dark:bg-slate-900 dark:text-white dark:border">
        <figure>
          <img src={item.image} alt="Book" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {item.name}
            <div className="badge badge-secondary">{item.category}</div>
          </h2>
          <p>{item.title}</p>
          <div className="card-actions justify-between items-center">
            <div className="badge badge-outline">₹{item.price}</div>
            <button
              onClick={handleDownload}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors duration-300 flex items-center gap-2"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" 
                  clipRule="evenodd" 
                />
              </svg>
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
