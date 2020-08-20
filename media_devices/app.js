function getMediaPromise() {
  const constraints = {
    'video': true,
    'audio': true
  };

  navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => {
      console.log('Got MediaStream:', stream);
    })
    .catch(error => {
      console.error('Error accessing media devices.', error);
    });
}

async function getMediaAsync() {
  async function openMediaDevices(constraints) {
    return await navigator.mediaDevices.getUserMedia(constraints);
  }

  try {
    const stream = await openMediaDevices({'video':true,'audio':true});
    console.log('Got MediaStream:', stream);
  } catch(error) {
    console.error('Error accessing media devices.', error);
  }
}

getMedia.onclick = () => {
 getMediaPromise();
};

function enumerateDevices() {
  function getConnectedDevices(type, callback) {
    navigator.mediaDevices.enumerateDevices()
      .then(devices => {
        const filtered = devices.filter(device => device.kind === type);
        callback(filtered);
      });
  }
  getConnectedDevices('videoinput', cameras => console.log('Cameras found', cameras));
}

getAllConnectedDevices.onclick = () => {
 enumerateDevices();
};

async function playVideoFromCamera() {
  try {
    const constraints = {
      'video': true,
      'audio': false,
    };
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    const videoElement = document.querySelector('video#localVideo');
    videoElement.srcObject = stream;
  } catch(error) {
    console.error('Error opening video camera.', error);
  }
}

playVideo.onclick = playVideoFromCamera
