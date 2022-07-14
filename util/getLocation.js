/**Location Proximities System 
 * @description This Functions Collect `4 arguments [2 postion]` and calculate the raduis distance from them
 * @param {Number} lat1  This Is The Latitude of the center postion 
 * @param {Number} lon1  This Is The Longitude of the center postion 
 * @param {Number} lat2  This Is The Latitude away from the center postion 
 * @param {Number} lon2  This Is The Longitude away from the center postion 
 * @returns {Number} The Raduis Of The position away from the center position `SCALE 1.0 = 10 meter away`
*/
exports.getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) =>{
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d * 100; // Radius 1 = 10 meter 
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI / 180)
  }
  
  // Center Location
  var centerLat = 9.28935;
  var centerLng = 7.41590;
  
  // // Test Locations
  // var posts = [{
  //     name: 'Near Solar Beside Block A',
  //     latitude: '9.28962',
  //     longitude: '7.41599',
  //   },
  //   {
  //     name: ' Main Gate',
  //     latitude: '9.29074',
  //     longitude: '7.41643',
  //   },
  //   {
  //     name: 'Boy Hotel',
  //     latitude: '9.28689',
  //     longitude: '7.41118',
  //   },
  //   {
  //     name: 'Lugbe',
  //     latitude: '8.97159',
  //     longitude: '7.36529',
  //   },
  //   {
  //     name: '100 away South',
  //     latitude: '9.28896',
  //     longitude: '7.41507',
  //   },
  //   {
  //     name: '100 away North',
  //     latitude: '9.28931',
  //     longitude: '7.41684',
  //   },
  //   {
  //     name: '30meter',
  //     latitude: '9.289505211762625',
  //     longitude: '7.41559566720387',
  //   },
  //   {
  //     name:"Atm",
  //     latitude:'9.289022',
  //     longitude:'7.415915'
  //   }
  //   , 
  // ];
  
  // posts.forEach((post) => {
    
  //   console.log(getDistanceFromLatLonInKm(centerLat, centerLng, post.latitude, post.longitude) + " - " + post.name)

  // });

  // Note Dude Might Want 50 meter away So Not Greater then 5