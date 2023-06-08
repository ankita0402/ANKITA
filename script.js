window.addEventListener('DOMContentLoaded', () => {
    const container1 = document.getElementById('container1');
    const container2 = document.getElementById('container2');
    const resetButton = document.getElementById('resetButton');

    let draggedItem = null;

    // Drag events
    function handleDragStart(e) {
        draggedItem = this;
        this.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
    }

    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.dataTransfer.dropEffect = 'move';
        return false;
    }

    function handleDragEnter(e) {
        this.classList.add('over');
    }

    function handleDragLeave(e) {
        this.classList.remove('over');
    }

    function handleDrop(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        }

        if (draggedItem !== this) {
            this.appendChild(draggedItem);
        }

        return false;
    }

    function handleDragEnd(e) {
        this.classList.remove('dragging');
    }

    // Reset button click event
    resetButton.addEventListener('click', () => {
        container1.innerHTML = `
        <h2>Container 1</h2>
        <div class="drag-item" draggable="true">Item 1</div>
        <div class="drag-item" draggable="true">Item 2</div>
        <div class="drag-item" draggable="true">Item 3</div>
      `;
        container2.innerHTML = `
        <h2>Container 2</h2>
      `;
    });

    // Attach drag events to items
    const dragItems = document.querySelectorAll('.drag-item');
    dragItems.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
    });

    // Attach drop events to containers
    container1.addEventListener('dragover', handleDragOver);
    container1.addEventListener('dragenter', handleDragEnter);
    container1.addEventListener('dragleave', handleDragLeave);
    container1.addEventListener('drop', handleDrop);

    container2.addEventListener('dragover', handleDragOver);
    container2.addEventListener('dragenter', handleDragEnter);
    container2.addEventListener('dragleave', handleDragLeave);
    container2.addEventListener('drop', handleDrop);
});