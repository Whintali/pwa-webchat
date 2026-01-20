async function fetchRooms() {
  try{
  const response = await fetch(`https://api.tools.gavago.fr/socketio/api/rooms`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const resultData = await response.json();
  console.log(resultData);
  return resultData;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return {data:{}};
  }
}

async function fetchRoomFromID(roomId: string) { }

export {fetchRooms};