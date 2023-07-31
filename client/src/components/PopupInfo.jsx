import React, { useState } from 'react';
import { BiSolidInfoSquare } from 'react-icons/bi';
import '../App.css';
import LineDesign from './LineDesign';

const PopupInfo = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopupInfo = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={togglePopupInfo} className='fixed right-4 top-4 cursor-pointer'><BiSolidInfoSquare className='text-indigo-700 text-2xl hover:text-indigo-600 transition-all ease-in-out' /></button>

      {isOpen && (
        <div className="popup flex justify-center content-center fixed top-0 left-0 w-full h-full z-10">
          <div className="popup-content bg-white shadow-lg bg-gray-200 rounded-sm p-4 self-center mx-2 sm:w-[485px] sm:mx-0">
            <h1 className='font-bold text-4xl mb-3 text-center tracking-tight'><span className='bg-indigo-700 rounded-sm text-white px-2 py-0.5'>Probability</span>Pick</h1>
            <LineDesign />
                        
            <a href="https://www.pcsodraw.com/"><p className='bg-indigo-200 text-center w-full rounded-sm py-0.5 text-indigo-700 text-xs hover:bg-indigo-300 transition-all duration-300'>https://www.pcsodraw.com/</p></a>
            <p className='text-sm text-center'>This is the data source from which I obtain the dataset utilized for computing the probabilities.</p>
            
            <div className='text-right'>
                <button onClick={togglePopupInfo} className="mt-4 bg-gray-700 hover:bg-gray-600 transition text-white font-bold py-1 px-4 rounded-sm">
                    Close
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupInfo;
