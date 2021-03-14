// HTML Elements
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let count = 5;
const apiKey = '8rYE8aQ9k3h6T42-UauGkwlKh-OOw41GMXPzJ3xPxag';

let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
const imageLoaded = () => {
	imagesLoaded++;
	if (imagesLoaded === totalImages) {
		ready = true;
		loader.hidden = true;
		count = 30;
		apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
	}
};

// Helper Function to Set Attributes on DOM Elements
const setAttributes = (element, attributes) => {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
};

// Create Elements for Links & Photos, Add to DOM
const displayPhotos = () => {
	totalImages += photosArray.length;

	// Run function for each object in photosArray
	photosArray.forEach((photo) => {
		// Create <a> to link to Unsplash
		const item = document.createElement('a');
		setAttributes(item, {
			href: photo.links.html,
			target: '_blank',
		});
		// Create <img> for photo
		const img = document.createElement('img');
		setAttributes(img, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description,
		});
		// Create <p> for the title of the photo
		const title = document.createElement('p');
		title.innerHTML = photo.alt_description || 'No Title';
		// Event Listener, check when each is finished loading
		img.addEventListener('load', imageLoaded);
		// Put <img> & <p> inside <a>, then put both inside imageContainer Element
		item.appendChild(img);
		item.appendChild(title);
		imageContainer.appendChild(item);
	});
};

// Get Photos from Unsplash API
const getPhotos = async () => {
	try {
		const response = await fetch(apiUrl);
		photosArray = await response.json();
		displayPhotos();
	} catch (error) {
		// Catch Error Here
		alert('Error:', error);
	}
};

// Check to see if scrolling near to bottom of page, Load More Photos
window.addEventListener('scroll', () => {
	if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
		ready = false;
		getPhotos();
	}
});

// On Load
getPhotos();
