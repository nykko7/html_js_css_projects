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
		//Enable Button
		pipButton.disabled = false;
	}
};

pipButton.addEventListener('click', async () => {
	// Select Media Stream
	selectMediaStream();
});

video.addEventListener('enterpictureinpicture', () => {
	pipButton.textContent = 'Close PiP to use';
	//Disable Button
	pipButton.disabled = true;
});

video.addEventListener('leavepictureinpicture', () => {
	pipButton.textContent = 'Select Media Stream';
	//Enable Button
	pipButton.disabled = false;
});
