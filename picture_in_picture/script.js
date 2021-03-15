const videoElement = document.getElementById('video');
const pipButton = document.getElementById('button');

// Prompt to select media stream, pass to video element, then play
const selectMediaStream = async () => {
	try {
		const mediaStream = await navigator.mediaDevices.getDisplayMedia();
		videoElement.srcObject = mediaStream;
		videoElement.onloadedmetadata = async () => {
			videoElement.play();
			//Start Picture in Picture
			await videoElement.requestPictureInPicture();
		};
	} catch (error) {
		console.log('Error:', error);
	}
};

const closeConnection = () => {
	let tracks = videoElement.srcObject.getTracks();
	tracks.forEach((track) => track.stop());
	videoElement.srcObject = null;
};

pipButton.addEventListener('click', async () => {
	// Select Media Stream
	if (document.pictureInPictureElement) document.exitPictureInPicture();
	else await selectMediaStream();
});

video.addEventListener('enterpictureinpicture', () => {
	pipButton.textContent = 'Close Picture in Picture';
});

video.addEventListener('leavepictureinpicture', () => {
	pipButton.textContent = 'Select Media to Stream';
	closeConnection();
});
