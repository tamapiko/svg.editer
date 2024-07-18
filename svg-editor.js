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
        if (selectedTool === "draw-rectangle") {
            // Example: Drawing a rectangle
            const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect.setAttribute("x", event.clientX);
            rect.setAttribute("y", event.clientY);
            rect.setAttribute("width", "50");
            rect.setAttribute("height", "50");
            rect.setAttribute("fill", "blue");
            svgCanvas.appendChild(rect);
        } else if (selectedTool === "draw-circle") {
            // Example: Drawing a circle
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("cx", event.clientX);
            circle.setAttribute("cy", event.clientY);
            circle.setAttribute("r", "25");
            circle.setAttribute("fill", "red");
            svgCanvas.appendChild(circle);
        } else if (selectedTool === "draw-path") {
            // Example: Drawing a path (using D3.js or SVG.js for more complex paths)
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", `M ${event.clientX} ${event.clientY} L ${event.clientX + 50} ${event.clientY + 50}`);
            path.setAttribute("stroke", "green");
            path.setAttribute("stroke-width", "2");
            path.setAttribute("fill", "none");
            svgCanvas.appendChild(path);
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
