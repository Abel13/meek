"use strict";

class RoomController {
  constructor({ socket, request }) {
    this.socket = socket;
    this.request = request;
    console.console.log("called");
  }

  onError() {
    console.log("error");
    //Error on subscription
  }

  onClose() {
    console.log("close");
    //Unsubscribe channel
  }

  onEnter(data) {
    console.log("enter");
    this.socket.broadcastToAll("enterRoom", data);
  }
}

module.exports = RoomController;
