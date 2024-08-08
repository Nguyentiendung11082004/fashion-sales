import Smile from '@/components/icons/thanks/Smile';
import ThanksIcon from '@/components/icons/thanks/ThanksIcon';
import React from 'react'
import { Link } from 'react-router-dom';

const Thanks = () => {
  return (
    <div className="container">
      <div className="flex my-20 items-center justify-center">
        <div>
          <div className="flex flex-col items-center space-y-2">
         <ThanksIcon/>
            <h1 className="text-4xl font-bold text-center">Thank You !</h1>
            <p className="text-center">
              Thank you for your interest! Check your email for a link to the
              guide.
            </p>
            <Link to="" className="inline-flex items-center rounded border border-indigo-600 bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring">
             <Smile/>
              <span className="text-sm font-medium"> Home </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Thanks