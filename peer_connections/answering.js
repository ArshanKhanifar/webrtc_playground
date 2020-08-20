const configuration = {'iceServers': []};
const peerConnection = new RTCPeerConnection(configuration);

peerConnection.addEventListener('icecandidate', event => {
  var cand = event.candidate;
  if(!cand){
    console.log('iceGatheringState complete', peerConnection.localDescription.sdp);
    answerText.value = JSON.stringify(peerConnection.localDescription);
  } else {
    console.log(cand.candidate);
  }
});

peerConnection.addEventListener('datachannel', event => {
  const dataChannel = event.channel;
  console.log("data channel added", dataChannel);
  dataChannel.addEventListener('open', event => {
    console.log("data channel opened")
  });

  dataChannel.addEventListener('message', event => {
    console.log("received message: ", event.data);
  });
});

offerButton.onclick = async () => {
  peerConnection.setRemoteDescription(
    new RTCSessionDescription(JSON.parse(offerText.value))
  );
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
};

peerConnection.addEventListener('connectionstatechange', event => {
  if (peerConnection.connectionState === 'connected') {
    console.log("Peers connected!")
  }
});
