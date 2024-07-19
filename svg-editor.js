document.addEventListener("DOMContentLoaded", function() {
    const svgCanvas = document.getElementById("svg-canvas");
    let selectedTool = "draw-rectangle"; // Default tool
    let selectedElement = null; // Element selected for editing
    let isDrawing = false;
    let startX, startY;

    // Event listeners for tool buttons
    document.getElementById("draw-rectangle").addEventListener("click", function() {
        selectedTool = "draw-rectangle";
    });
    
    document.getElementById("draw-circle").addEventListener("click", function() {
        selectedTool = "draw-circle";
    });

    document.getElementById("edit-properties").addEventListener("click", function() {
        selectedTool = "edit-properties";
    });

    document.getElementById("save-svg").addEventListener("click", function() {
        const svgData = new XMLSerializer().serializeToString(svgCanvas);
        const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement("a");
        a.href = url;
        a.download = "drawing.svg";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    // Event listeners for property panel inputs
    document.getElementById("fill-color").addEventListener("input", function(event) {
        if (selectedElement) {
            selectedElement.setAttribute("fill", event.target.value);
        }
    });

    document.getElementById("stroke-color").addEventListener("input", function(event) {
        if (selectedElement) {
            selectedElement.setAttribute("stroke", event.target.value);
        }
    });

    document.getElementById("stroke-width").addEventListener("input", function(event) {
        if (selectedElement) {
            selectedElement.setAttribute("stroke-width", event.target.value);
        }
    });

    document.getElementById("opacity").addEventListener("input", function(event) {
        if (selectedElement) {
            selectedElement.setAttribute("opacity", event.target.value);
        }
    });

    // SVG canvas event handlers for drawing shapes
    svgCanvas.addEventListener("touchstart", function(event) {
        if (selectedTool !== "edit-properties") {
            event.preventDefault();
            const touch = event.touches[0];
            const rect = svgCanvas.getBoundingClientRect();
            startX = touch.clientX - rect.left;
            startY = touch.clientY - rect.top;
            isDrawing = true;

            if (selectedTool === "draw-rectangle") {
                selectedElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                selectedElement.setAttribute("x", startX);
                selectedElement.setAttribute("y", startY);
                selectedElement.setAttribute("width", 0);
                selectedElement.setAttribute("height", 0);
                selectedElement.setAttribute("fill", "blue");
                selectedElement.setAttribute("stroke", "black");
                selectedElement.setAttribute("stroke-width", "1");
                selectedElement.setAttribute("opacity", "1");
                svgCanvas.appendChild(selectedElement);
            } else if (selectedTool === "draw-circle") {
                selectedElement = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                selectedElement.setAttribute("cx", startX);
                selectedElement.setAttribute("cy", startY);
                selectedElement.setAttribute("r", 0);
                selectedElement.setAttribute("fill", "red");
                selectedElement.setAttribute("stroke", "black");
                selectedElement.setAttribute("stroke-width", "1");
                selectedElement.setAttribute("opacity", "1");
                svgCanvas.appendChild(selectedElement);
            }
        }
    });

    svgCanvas.addEventListener("touchmove", function(event) {
        if (isDrawing) {
            event.preventDefault();
            const touch = event.touches[0];
            const rect = svgCanvas.getBoundingClientRect();
            const offsetX = touch.clientX - rect.left;
            const offsetY = touch.clientY - rect.top;

            if (selectedTool === "draw-rectangle") {
                const width = Math.abs(offsetX - startX);
                const height = Math.abs(offsetY - startY);
                selectedElement.setAttribute("width", width);
                selectedElement.setAttribute("height", height);
                selectedElement.setAttribute("x", Math.min(offsetX, startX));
                selectedElement.setAttribute("y", Math.min(offsetY, startY));
            } else if (selectedTool === "draw-circle") {
                const radius = Math.sqrt(Math.pow(offsetX - startX, 2) + Math.pow(offsetY - startY, 2));
                selectedElement.setAttribute("r", radius);
            }
        }
    });

    svgCanvas.addEventListener("touchend", function(event) {
        isDrawing = false;
    });

    // Allow element dragging and resizing
    function addElementEventListeners(element) {
        element.addEventListener("touchstart", startDrag);
        element.addEventListener("touchmove", drag);
        element.addEventListener("touchend", endDrag);
    }

    let selectedElementForDrag = null;
    let offset = { x: 0, y: 0 };

    function startDrag(event) {
        event.preventDefault();
        const touch = event.touches[0];
        selectedElementForDrag = event.target;
        const rect = selectedElementForDrag.getBoundingClientRect();
        offset.x = touch.clientX - rect.left;
        offset.y = touch.clientY - rect.top;
    }

    function drag(event) {
        if (selectedElementForDrag) {
            event.preventDefault();
            const touch = event.touches[0];
            const rect = svgCanvas.getBoundingClientRect();
            const x = touch.clientX - rect.left - offset.x;
            const y = touch.clientY - rect.top - offset.y;

            if (selectedElementForDrag.tagName === "rect") {
                selectedElementForDrag.setAttribute("x", x);
                selectedElementForDrag.setAttribute("y", y);
            } else if (selectedElementForDrag.tagName === "circle") {
                selectedElementForDrag.setAttribute("cx", x + offset.x);
                selectedElementForDrag.setAttribute("cy", y + offset.y);
            }
        }
    }

    function endDrag() {
        selectedElementForDrag = null;
    }
});
