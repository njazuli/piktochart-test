
import { fetchImages, handleFileSelected, uploadImage } from './imageHandling.js';
import { addTextButton, fileInput, canvasArea, uploadButton } from './elements.js';
import { addTextToCanvas, loadCanvasFromStorage, deselectAll, handleMouseMove, handleMouseUp } from './canvasHandling.js';

// Initialize DOM elements
document.addEventListener('DOMContentLoaded', () => {
  fileInput.addEventListener('change', handleFileSelected);
  uploadButton.addEventListener('click', uploadImage);
  addTextButton.addEventListener('click', addTextToCanvas);
  canvasArea.addEventListener('click', deselectAll);

  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);

  fetchImages();
  loadCanvasFromStorage();
});