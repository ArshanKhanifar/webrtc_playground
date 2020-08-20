const configuration = {'iceServers': []};
const peerConnection = new RTCPeerConnection(configuration);
let dataChannel;

peerConnection.addEventListener('icecandidate', event => {
  var cand = event.candidate;
  if(!cand){
    console.log('iceGatheringState complete',peerConnection.localDescription.sdp);
    offerText.value = JSON.stringify(peerConnection.localDescription);
  } else {
    console.log(cand.candidate);
  }
});

function setupDataChannel(dataChannel) {
  dataChannel.addEventListener('open', event => {
    console.log("data channel opened")
  });
  dataChannel.addEventListener('message', event => {
    console.log("received message: ", event.data);
  });
}

async function makeCall() {
  dataChannel = peerConnection.createDataChannel("dataChannel");
  setupDataChannel(dataChannel);
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
}

offerButton.onclick = async () => { await makeCall() };

answerButton.onclick = async () => {
  const answer = JSON.parse(answerText.value);
  const remoteDesc = new RTCSessionDescription(answer);
  await peerConnection.setRemoteDescription(remoteDesc);
};

messageButton.onclick = async () => {
  console.log("message", messageText.value);
  dataChannel.send(messageText.value);
};

peerConnection.addEventListener('connectionstatechange', event => {
  if (peerConnection.connectionState === 'connected') {
    console.log("Peers connected!")
  }
});



