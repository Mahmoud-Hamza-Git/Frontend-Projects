/*///////////////
/// GLOBALS ///
*/ //////////////
const socket = io('/');
const user_1 = document.getElementById('user-1');
const user_2 = document.getElementById('user-2');
const btnCamera = document.getElementById('camera-btn');
const btnMic = document.getElementById('mic-btn');
const constraints = {
  video: {
    width: { min: 640, ideal: 1920, max: 1920 },
    height: { min: 480, ideal: 1080, max: 1080 },
  },
  audio: false,
};
let roomID = ROOMID;
// check if the user enters direct to the room.html page without going to the lobby.
if (!roomID) {
  window.location = '/';
}

let localStream, remoteStream, peerConnction;
const servers = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
};

/*///////////////
/// FUNCTIONS DECLARATION ///
*/ //////////////

let init = async () => {
  // create the local and remote streams(remote stream moved to peerConnection)
  localStream = await navigator.mediaDevices.getUserMedia(constraints);
  user_1.srcObject = localStream;

  // listening to events
  socket.on('MemberJoined', (user2_ID) => {
    console.log('2nd Member Joined:', user2_ID);
    createOffer(user2_ID);
  });
  socket.on('MessageSent', (message, otherPeer_ID) => {
    handleMessageSent(message, otherPeer_ID);
  });
  socket.on('MemberLeft', (memberLeftID) => {
    console.log('Member', memberLeftID, 'Left');
    handleMemberLeft();
  });

  // join the room
  socket.emit('join-room', ROOMID);
};

///////////////////
// EVENT HANDLERS
//////////////////
let handleMessageSent = async (message, otherPeer_ID) => {
  message = JSON.parse(message);
  if (message.type === 'offer') {
    createAnswer(otherPeer_ID, message.offer); // here we will add the offer then create an answer and send it back to peer-1
  }
  if (message.type === 'answer') {
    addAnswer(message.answer); //we will not need the userID here as we will not send any messages back
  }
  if (message.type === 'candidate') {
    // check if we have a connection then add these ice candidates
    if (peerConnction) {
      peerConnction.addIceCandidate(message.candidate);
    }
  }
  console.log(message.type, ' Message Sent');
};

let handleMemberLeft = async () => {
  user_2.style.display = 'none';
  user_1.classList.remove('small-frame');
};

let toggleCamera = async () => {
  // get the video track from the local stream and check if it is enabled or not
  let videoTrack = localStream.getTracks().find((track) => track.kind === 'video');
  if (videoTrack.enabled) {
    videoTrack.enabled = false;
    btnCamera.style.backgroundColor = '#df2c2ce8';
  } else {
    videoTrack.enabled = true;
    btnCamera.style.backgroundColor = '#b366f9e6';
  }
};

let toggleMic = async () => {
  let btnBackground = getComputedStyle(btnMic).backgroundColor; //get css values in javascript using getComputedStyle (as style.color only gets the inline style of the element)
  if (btnBackground == 'rgba(223, 42, 42, 0.91)') {
    btnMic.style.backgroundColor = 'rgba(178, 103, 249, 0.902)';
  } else {
    btnMic.style.backgroundColor = 'rgba(223, 42, 42, 0.91)';
  }
  // get the audio track from the local stream and check if it is enabled or not
  let audioTrack = localStream.getTracks().find((track) => track.kind === 'audio');
  if (audioTrack?.enabled) {
    audioTrack.enabled = false;
  } else if (audioTrack?.enabled) {
    audioTrack.enabled = true;
  }
};

///////////////////
// REUSABLE FUNCTIONS
//////////////////
let createPeerConnection = async (MemberID) => {
  peerConnction = new RTCPeerConnection(servers);

  // display the user-2 video(this will happen in both peers when the user joins)
  // create the remote stream then later we will add data to it.
  remoteStream = new MediaStream();
  user_2.srcObject = remoteStream;
  user_2.style.display = 'block';
  user_1.classList.add('small-frame');

  // put all tracks(videos or audios) from localStream on the connection interface
  localStream.getTracks().forEach((track) => {
    peerConnction.addTrack(track, localStream);
  });

  // listen to event comes from the remote peer when adds their tracks on the PeerConnection then take them and add to the remoteStream object
  peerConnction.ontrack = (event) => {
    event.streams[0].getTracks().forEach((track) => {
      remoteStream.addTrack(track);
    });
  };

  // we will listen to the ICE Candidates when they come from the STUN server as they will start to come whenever we setLocalDescription
  peerConnction.onicecandidate = async (event) => {
    // why check if the current event is a candidate? we are listening already for ice candidate event
    if (event.candidate) {
      socket.emit(
        'send-message',
        JSON.stringify({ type: 'candidate', candidate: event.candidate }),
        MemberID
      );
    }
  };
};

// create and send offer and ICE Candidates (Member id of peer 2)
let createOffer = async (user2_ID) => {
  await createPeerConnection(user2_ID); //as i will send iceCandidates to user_2

  let offer = await peerConnction.createOffer();
  peerConnction.setLocalDescription(offer);

  // send message with the offer to the peer with that MemberID(we can send not only a string message but we can send the offer object after stringify it)
  socket.emit('send-message', JSON.stringify({ type: 'offer', offer: offer }), user2_ID); // (Member id of peer 2)
};

// take the offer and create an answer and send it back to the other peer (notice that the remote peer tracks will be added to the peer connection interface in this step, as in createPeerConnection() function we will extract tracks from localStream(which is considered remote now relative peer-1 which we started with))
let createAnswer = async (otherPeer_ID, offer) => {
  await createPeerConnection(otherPeer_ID); //the createAnswer() only called at the 2nd peer only, also createOffer() only called at the first peer only so you will find createPeerConnection() function is called in each of them.(ok so it dosen't called twise for the single client)

  // so for the peer_2 we will set the remote discription to the offer and the local discription to the answer
  await peerConnction.setRemoteDescription(offer);
  let answer = await peerConnction.createAnswer();
  await peerConnction.setLocalDescription(answer);

  // send the message back to peer_1
  socket.emit('send-message', JSON.stringify({ type: 'answer', answer: answer }), otherPeer_ID);
};

// add the answer to remote discription of peer_1
let addAnswer = async (answer) => {
  // add simple condition to check if this peer doesn't have remoteDescription
  if (!peerConnction.currentRemoteDescription) {
    peerConnction.setRemoteDescription(answer);
  }
  // user_2.style.display = "block"; we can't display it here as we want to do this for both peers but here it will be done for only peer-1 who always adds the answer so we will do it in the createPearConnection which happens in both peers
};

///////////////////
// EVENT LISTENERS
//////////////////
btnCamera.addEventListener('click', toggleCamera);
btnMic.addEventListener('click', toggleMic);

///////////////////
// STARTING THE PAGE
//////////////////
init();
