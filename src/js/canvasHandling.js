// canvasHandling.js
import { canvasArea, textInput } from './elements.js';

export let nextId = 0;
export let canvasItems = [];
export let dragItem = null;
export let dragOffsetX = 0;
export let dragOffsetY = 0;
export let selectedFile = null;
export let dragElement = null; 

function generateId() {
  return `item-${nextId++}`;
}

function saveCanvasToStorage() {
  localStorage.setItem('mini-piktochart-canvas', JSON.stringify(canvasItems));
}

function loadCanvasFromStorage() {
  const savedCanvas = localStorage.getItem('mini-piktochart-canvas');
  if (savedCanvas) {
    try {
      // Clear existing array first
      canvasItems.length = 0; 
      const parsedItems = JSON.parse(savedCanvas);
      canvasItems.push(...parsedItems);

      // Update nextId
      if (canvasItems.length > 0) {
        const maxId = Math.max(...canvasItems.map(
          item => parseInt(item.id.split('-')[1]) || 0
        ));
        nextId = maxId + 1;
      }

      renderAllCanvasItems();
    } catch (error) {
      console.error('Error loading canvas from storage:', error);
    }
  }
}

// Canvas item functions - add text
function addTextToCanvas() {
  const text = textInput.value.trim();
  if (!text) return;

  const item = {
    id: generateId(),
    type: 'text',
    content: text,
    x: 300,
    y: 300,
    zIndex: canvasItems.length + 1,
    selected: false
  };

  canvasItems.push(item);
  renderCanvasItem(item);
  saveCanvasToStorage();

  textInput.value = '';
}

// Canvas item functions - add image from the list to canvas
function addImageToCanvas(imageSrc) {
  const item = {
    id: generateId(),
    type: 'image',
    content: imageSrc,
    x: 50,
    y: 50,
    zIndex: canvasItems.length + 1,
    selected: false
  };

  canvasItems.push(item);
  renderCanvasItem(item);
  saveCanvasToStorage();
}

function renderCanvasItem(item) {
    // Create parent element
    const element = document.createElement('div');
    element.id = item.id;
    element.className = 'item';
    if (item.selected) element.classList.add('selected');
    
    // Set styles
    element.style.transform = `translate(${item.x}px, ${item.y}px)`;
    element.style.zIndex = item.zIndex;
    element.style.position = 'absolute';
    element.style.willChange = 'transform';
    element.style.transition = 'transform 0.1s ease-out';
    element.style.cursor = 'move'; 

    // Add content based on type
  if (item.type === 'image') {
    const imgDiv = document.createElement('div');
    const img = document.createElement('img');
    img.src = item.content;
    img.style.width = '150px';
    img.style.height = 'auto';
    imgDiv.appendChild(img);
    element.appendChild(imgDiv);
  } else if (item.type === 'text') {
    const textDiv = document.createElement('div');
    textDiv.style.fontSize = '24px';
    textDiv.style.padding = '10px';
    textDiv.textContent = item.content;
    element.appendChild(textDiv);
  }

  // If selected, add delete button
  if (item.selected) {
    addDeleteButton(element, item);
  }

  element.addEventListener('click', (e) => {
    e.stopPropagation();
    selectItem(item);
  });

  element.addEventListener('mousedown', (e) => {
    e.stopPropagation();
    element.style.transition = 'none';
    startDrag(e, item, element);
  });

  canvasArea.appendChild(element);
}

// addDeleteButton function    
function addDeleteButton(element, item) {
  const deleteButton = document.createElement('button');
  deleteButton.className = 'btn btn-sm btn-danger';
  deleteButton.style.position = 'absolute';
  deleteButton.style.right = '-10px';
  deleteButton.style.top = '-10px';
  deleteButton.textContent = '×';

  deleteButton.addEventListener('click', (e) => {
    e.stopPropagation();
    removeItem(item);
  });

  element.appendChild(deleteButton);
}

function renderAllCanvasItems() {
  // Clear current canvas
  canvasArea.innerHTML = '';

  // Render each item
  canvasItems.forEach(item => {
    renderCanvasItem(item);
  });
}

// function to select an item when it is clicked
function selectItem(item) {
  canvasItems.forEach(i => {
    i.selected = false;
  });
  item.selected = true;
  renderAllCanvasItems();
  saveCanvasToStorage();
}

// function to deselect an item when it is clicked
function deselectAll(e) {
  if (e.target !== canvasArea) return;
  canvasItems.forEach(item => {
    item.selected = false;
  });
  renderAllCanvasItems();
  saveCanvasToStorage();
}

function removeItem(item) {
  const index = canvasItems.findIndex(i => i.id === item.id);
  if (index !== -1) {
    canvasItems.splice(index, 1);
    renderAllCanvasItems();
    saveCanvasToStorage();
  }
}

// function to start dragging an item when the user clicks on it
function startDrag(event, item, element) {
    if (!item.selected) {
      selectItem(item);
    }
    dragItem = item;
    dragElement = element;
    dragOffsetX = event.clientX - item.x;
    dragOffsetY = event.clientY - item.y;
    
    document.body.style.cursor = 'grabbing';
    
    if (element) {
      element.style.cursor = 'grabbing';
    }
  }

// set ticking to false to prevent multiple requestAnimationFrame calls
let ticking = false;

// function to handle mouse movement when dragging an item
function handleMouseMove(event) {
  if (!dragItem) return;

  if (!ticking) {
    window.requestAnimationFrame(() => {
      const canvasRect = canvasArea.getBoundingClientRect();
      let newX = event.clientX - dragOffsetX;
      let newY = event.clientY - dragOffsetY;

      newX = Math.max(0, Math.min(newX, canvasRect.width - 100));
      newY = Math.max(0, Math.min(newY, canvasRect.height - 100));

      dragItem.x = newX;
      dragItem.y = newY;

      if (dragElement) {
        dragElement.style.transform = `translate(${newX}px, ${newY}px)`;
      }
      
      ticking = false;
    });
    
    ticking = true;
  }
}

function handleMouseUp() {
    if (dragItem && dragElement) {
      dragElement.style.transition = 'transform 0.1s ease-out';
      
      document.body.style.cursor = 'default';
      
      if (dragElement) {
        dragElement.style.cursor = 'move';
      }
      
      saveCanvasToStorage();
      dragItem = null;
      dragElement = null;
    }
  }

export { addTextToCanvas, addImageToCanvas, renderAllCanvasItems, loadCanvasFromStorage, deselectAll, handleMouseMove, handleMouseUp };