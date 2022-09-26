const Provider = async (latitude, longitude, area, selectedItems) => {
  constant = 1 / 110.574;
  console.log(this.latitude);
  console.log("provider");
  console.log(
    `${area * constant + latitude},${longitude - area * constant},${
      latitude - area * constant
    },${area * constant + longitude})`
  );
  var obj = {};
  var nodes = []
  var around = `${
    latitude - area * constant
  },${longitude - area * constant},${area * constant + latitude},${
    area * constant + longitude
  }`
  for (let i = 0; i < selectedItems.length; i++) {
    if(selectedItems[i] === "peak")
    nodes.push(`%20node[%22natural%22=%22peak%22](${around});`)
   /* else if(selectedItems[i] === "reservoir")
    nodes.push(`%20relation[%22water%22=%22reservoir%22](${around});`)*/
    
  }
  await fetch(
    `https://www.overpass-api.de/api/interpreter?data=[out:json];(${nodes[0]});out%20body;${(selectedItems.includes("reservoir"))?"out%20center;":""}%3E;out%20skel%20qt;`
  )
    .then((response) => response.json())
    .then((data) => {
      obj = data;
      console.log(obj);
    })
    .catch((error) => {
      console.log(error);
    });
  return obj;
};

export default Provider;
