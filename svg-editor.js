document.addEventListener("DOMContentLoaded", function() {
    const svgCanvas = document.getElementById("svg-canvas");
    let selectedTool = "draw-rectangle"; // Default tool
    
    // Event listeners for tool buttons
    document.getElementById("draw-rectangle").addEventListener("click", function() {
        selectedTool = "draw-rectangle";
    });
    
    document.getElementById("draw-circle").addEventListener("click", function() {
        selectedTool = "draw-circle";
    });
    
    document.getElementById("draw-path").addEventListener("click", function() {
        selectedTool = "draw-path";
    });
    
    // SVG canvas click handler for drawing shapes
    svgCanvas.addEventListener("click", function(event) {
        const rect = svgCanvas.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const offsetY = event.clientY - rect.top;
        
        if (selectedTool === "draw-rectangle") {
            // Example: Drawing a rectangle
            const rectEl = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rectEl.setAttribute("x", offsetX - 25);
            rectEl.setAttribute("y", offsetY - 25);
            rectEl.setAttribute("width", "50");
            rectEl.setAttribute("height", "50");
            rectEl.setAttribute("fill", "blue");
            svgCanvas.appendChild(rectEl);
        } else if (selectedTool === "draw-circle") {
            // Example: Drawing a circle
            const circleEl = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circleEl.setAttribute("cx", offsetX);
            circleEl.setAttribute("cy", offsetY);
            circleEl.setAttribute("r", "25");
            circleEl.setAttribute("fill", "red");
            svgCanvas.appendChild(circleEl);
        } else if (selectedTool === "draw-path") {
            // Example: Drawing a path (using D3.js or SVG.js for more complex paths)
            const pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
            pathEl.setAttribute("d", `M ${offsetX} ${offsetY} L ${offsetX + 50} ${offsetY + 50}`);
            pathEl.setAttribute("stroke", "green");
            pathEl.setAttribute("stroke-width", "2");
            pathEl.setAttribute("fill", "none");
            svgCanvas.appendChild(pathEl);
        }
    });
    
    // Example: Saving SVG
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
});
