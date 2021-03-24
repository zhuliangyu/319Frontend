import React, { useEffect, useState } from 'react';
import './contractors.css';
import ProfileCard from '../profile-card';
import ProfileCardList from '../profile-card-list';
import storage from '../../../services/storage';

const Contractors = (props) => {
  let contractors = props.data;
  const [view, syncLocalStorageview] = useState(storage.ls.getPair('contractorsView'));

  const changeViewFn = e => {
    syncLocalStorageview(storage.ls.getPair('contractorsView'));
  };

  useEffect(() => {
    window.addEventListener('storage', changeViewFn);
    return () => {
      window.removeEventListener('storage', changeViewFn);
    }
  }, []);

  return (
    <div className='contractors-wrapper'>
      <div className='contractors-container'>
        {contractors !== undefined ? 
        (
         ((contractors.length > 0) ? (
          contractors.map(result => 
            (
              <ProfileCard key={contractors.indexOf(result)} data={result} />
            )
            )
         ):(
          //<center><b>{`👀 We looked meticulously, but could find anyone maching your criteria in the directory.`}</b></center>
          null
         ))
        ) : 
        (
          <center><b>{`💬 The Server and I aren't talking right now, try again later?`}</b></center>
          //null
        )
        }
      </div>
    </div>
  );
};

export default Contractors;
