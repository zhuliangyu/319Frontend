import React, { useEffect, useState } from 'react';
import './explore-ae-locations.css';
import ProfileCard from '../../../../ui/components/profile-card';

import EventEmitter from '../../../hooks/event-manager';
import storage from '../../../../services/storage';

const ExploreAELocations = (props) => {
  let [profiles, setProfiles] = useState(props.data.results);
  useEffect(async() => {
    setProfiles(props.data.results);
  }, [props])
  useEffect(async() => {

    let state = await storage.ss.getFlag('filters');
    if (state) {
      if (props.data.results.length == 0) {
        EventEmitter.emit('triggerLoc');
      }
    }
  }, []);
  return (
    <div className="explore">
      <div className="explore-title">
        Explore {props.data.city}
      </div>
      <div className='explore-wrapper'>
        <div className='explore-container'>
          {profiles !== undefined ? 
          (
          ((profiles.length > 0) ? (
            profiles.map(profile => 
              (
                <ProfileCard key={profiles.indexOf(profile)} data={profile} />
              )
              )
          ):(
           
            null
          ))
          ) : 
          (
            null
          )
          }
        </div>
      </div>
    </div>
  )

}

export default ExploreAELocations;
