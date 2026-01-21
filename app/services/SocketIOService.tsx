import socket from "@/socket-client";


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

async function postImageMessage(dataURL: string,roomName: string) { 
  try{
    const response = await fetch(`https://api.tools.gavago.fr/socketio/api/images/`, 
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id:socket.id, image_data : dataURL }),
      }
    );
    if(!response.ok){
      console.error("Error posting image message - Response: ", response.statusText);
      return;
    }
    const resultData = await response.json();
    socket.emit("chat-msg", { categorie: "NEW_IMAGE", id_image: socket.id, roomName: roomName});

  }
  catch (error) { 
    console.error("Error posting image message - General:", error);
  }

}
async function getImageMessage(imageId: string) { 
  try{
    const response = await fetch(`https://api.tools.gavago.fr/socketio/api/images/${imageId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Response image fetch: ", response);
    if(!response.ok){
      console.error("Error getting image message: ", response.statusText);
      return null;
    }
    const resultData = await response.json();
    return resultData.data_image;
  } catch (error) {
    console.error("Error getting image message:", error);
    return null;
  }
}

export {fetchRooms,postImageMessage,getImageMessage};