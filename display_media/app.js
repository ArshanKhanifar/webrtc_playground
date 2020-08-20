async function playVideoFromCamera() {
  try {
    const constraints = {
      audio: false,
    };
    const stream = await navigator.mediaDevices.getDisplayMedia(constraints);
    const videoElement = document.querySelector('video#localVideo');
    videoElement.srcObject = stream;
  } catch(error) {
    console.error('Error getting screen capture.', error);
  }
}

playVideo.onclick = playVideoFromCamera
