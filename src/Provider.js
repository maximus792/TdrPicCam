const Provider = async (latitude, longitude, area) => {
  constant = 1 / 110.574;
  console.log(this.latitude);
  console.log("provider");
  console.log(
    `${area * constant + latitude},${longitude - area * constant},${
      latitude - area * constant
    },${area * constant + longitude})`
  );
  var obj = {};
  await fetch(
    `https://www.overpass-api.de/api/interpreter?data=[out:json];(%20node[%22natural%22=%22peak%22](${
      latitude - area * constant
    },${longitude - area * constant},${area * constant + latitude},${
      area * constant + longitude
    }););out%20body;%3E;out%20skel%20qt;`
  )
    .then((response) => response.json())
    .then((data) => {
      obj = data;
    })
    .catch((error) => {
      console.log(error);
    });
  return obj;
};

export default Provider;
