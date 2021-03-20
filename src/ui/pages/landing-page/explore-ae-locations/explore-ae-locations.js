import React from 'react';
import './explore-ae-locations.css';
import ProfileCard from '../../../../ui/components/profile-card';

const ExploreAELocations = (props) => {
  console.log(props.data);
  let profiles = props.data.results;
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
