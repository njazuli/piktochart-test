import { fileInput, uploadButton, imagesList, fileLabel } from './elements.js';
import { addImageToCanvas } from './canvasHandling.js';

// fetchImages function to get images from the server
async function fetchImages() {
  try {
    const response = await fetch('/images');
    const images = await response.json();
    console.log('Fetched images:', images);
    renderImagesList(images);
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

// Function to render the list of images
function renderImagesList(images) {
    imagesList.innerHTML = '';
    images.forEach(image => {
      const col = document.createElement('div');
      col.className = 'col-6 mb-2 p-2'; 
      
      // Create image element
      const img = document.createElement('img');
      img.src = image;
      img.alt = 'Asset image';
      img.className = 'img-fluid'; 
      
      img.setAttribute('data-toggle', 'tooltip');
      img.setAttribute('data-placement', 'top');
      img.setAttribute('title', 'Click image to add to canvas');
      
      col.addEventListener('click', () => addImageToCanvas(image));
      
      // Append elements
      col.appendChild(img);
      imagesList.appendChild(col);
    });
    
    $('[data-toggle="tooltip"]').tooltip();
  }

let selectedFile = null; // Keep this here for now as it's specific to image uploading

// Function to handle file selection
function handleFileSelected(event) {
  selectedFile = event.target.files[0];
  fileLabel.textContent = selectedFile ? selectedFile.name : 'Choose Image';
}

// Function to upload the selected image
async function uploadImage() {
  if (!selectedFile) return;

  const formData = new FormData();
  formData.append('upload', selectedFile);

  try {
    const response = await fetch('/uploads', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    if (data.file) {
      fetchImages();
      selectedFile = null;
      fileInput.value = null;
      fileLabel.textContent = 'Choose Image';
    }
  } catch (error) {
    console.error('Error uploading image:', error);
  }
}

export { fetchImages, handleFileSelected, uploadImage };