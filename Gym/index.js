function escapeHTML(value){
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

function tag(name){
    return function(...args){
        let attrs = {};

        if (typeof args[0] === "object" && args[0] !== null && !Array.isArray(args[0])) {
            attrs = args.shift();
        }

        const attributes = Object.entries(attrs).map(([key, value]) => `${key}: ${escapeHTML(value)}; `).join("");

        let content = args.join("");
        
        if (name === "td") {
            content = `<input type="text" value="${escapeHTML(content)}" style="${attributes}">`;
        }

        return `<${name}>${content}</${name}>`;
    };
}

const tbody = tag("tbody");
const tr = tag("tr");
const td = tag("td");

const geid = document.getElementById.bind(document);
const myTable = geid("myTable");

geid("jsonFile").addEventListener("change", async function() {
    const file = this.files[0];
    if (!file) return;

    try {
        const data = JSON.parse(await file.text());

        myTable.innerHTML = tbody(...data.map(row => tr(...row.map(cell => td(cell.style, cell.value)))));
    } catch (error) {
        console.error("Could not load JSON:", error);
    }
});

geid("saveBtn").addEventListener("click", function() {
    
    const data = [...myTable.querySelectorAll("tr")].map(row =>
        [...row.querySelectorAll('input[type="text"]')].map(input => ({
            value: input.value,
            style: {
                "font-weight": input.style.fontWeight,
                "font-style": input.style.fontStyle,
                "background-color": input.style.backgroundColor,
                "color": input.style.color
            }
        }))
    );

    const json = JSON.stringify(data, null, 4);

    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "gym_program_schedule.json";
    a.click();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
});

let selectedCell = null;

myTable.addEventListener("click", function(event) {
    const cell = event.target.closest("td");

    if (!cell || !myTable.contains(cell)) return;

    if (selectedCell) {
        selectedCell.classList.remove("selected-cell");
    }

    selectedCell = cell;
    selectedCell.classList.add("selected-cell");
});

const boldBtn = geid("boldBtn");
const italicBtn = geid("italicBtn");
const bgColor = geid("bgColor");
const textColor = geid("textColor");

boldBtn.addEventListener("click", function() {
    if (!selectedCell || !myTable.contains(selectedCell)) return;

    saveUndoState();

    const input = selectedCell.querySelector('input[type="text"]');
    if (!input) return;

    const weight = parseInt(getComputedStyle(input).fontWeight);

    input.style.fontWeight = weight >= 600 ? "normal" : "bold";
});

italicBtn.addEventListener("click", function() {
    if (!selectedCell || !myTable.contains(selectedCell)) return;

    saveUndoState();

    const input = selectedCell.querySelector('input[type="text"]');
    if (!input) return;

    const style = getComputedStyle(input).fontStyle;

    input.style.fontStyle = style === "italic" ? "normal" : "italic";
});

function colorChange(type, save = false) {
    if (!selectedCell || !myTable.contains(selectedCell)) return;

    if (save) saveUndoState();

    const input = selectedCell.querySelector('input[type="text"]');
    if (!input) return;

    if (type === "bg") {
        input.style.backgroundColor = bgColor.value;
    } 
    else if (type === "text") {
        input.style.color = textColor.value;
    }
}

bgColor.addEventListener("input", () => colorChange("bg"));
bgColor.addEventListener("click", () => colorChange("bg", true));
textColor.addEventListener("input", () => colorChange("text"));
textColor.addEventListener("click", () => colorChange("text", true));

function createEmptyCell() {
    const cell = document.createElement("td");
    const input = document.createElement("input");

    input.type = "text";
    input.value = "";

    cell.appendChild(input);

    return cell;
}

function insertRow(cell, side) {
    const row = cell.parentElement;
    const section = row.parentElement;

    saveUndoState();

    const newRow = document.createElement("tr");


    for (const oldCell of row.cells) {
        newRow.appendChild(createEmptyCell());
    }

    section.insertBefore(newRow, side === "top" ? row : row.nextSibling);
}

function insertColumn(cell, side) {
    const index = cell.cellIndex + (side === "right" ? 1 : 0);

    saveUndoState();

    for (const row of myTable.rows) {
        const newCell = createEmptyCell();

        row.insertBefore(newCell, row.cells[index] ?? null);
    }
}

const borderSize = 5;
const dragThreshold = 25;

let drag = null;

function getBorder(event) {
    const cell = event.target.closest("td");
    if (!cell || !myTable.contains(cell)) return null;

    const rect = cell.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        return null;
    }

    const edges = [
        { side: "left", distance: x },
        { side: "right", distance: rect.width - x },
        { side: "top", distance: y },
        { side: "bottom", distance: rect.height - y }
    ];

    const nearest = edges.reduce((a, b) => a.distance < b.distance ? a : b);

    if (nearest.distance > borderSize) return null;

    return {cell, side: nearest.side, axis: ["left", "right"].includes(nearest.side) ? "column" : "row"};
}

function setResizeCursor(axis) {
    myTable.classList.toggle("column-edge", axis === "column");
    myTable.classList.toggle("row-edge", axis === "row");
}

myTable.addEventListener("pointermove", function (event) {
    if (drag) {
        setResizeCursor(drag.axis);
        return;
    }

    const border = getBorder(event);
    setResizeCursor(border?.axis);
});

myTable.addEventListener("pointerdown", function (event) {
    if (event.button !== 0) return;

    const border = getBorder(event);
    if (!border) return;

    drag = {
        ...border,
        x: event.clientX,
        y: event.clientY,
        pointerId: event.pointerId
    };

    myTable.setPointerCapture(event.pointerId);
    event.preventDefault();
});

myTable.addEventListener("pointerup", function (event) {
    if (!drag || event.pointerId !== drag.pointerId) return;

    const current = drag;
    drag = null;

    if (myTable.hasPointerCapture(event.pointerId)) {
        myTable.releasePointerCapture(event.pointerId);
    }

    const dx = event.clientX - current.x;
    const dy = event.clientY - current.y;

    if (myTable.contains(current.cell)) {
        if (current.axis === "column" && Math.abs(dx) >= dragThreshold) {
            insertColumn(current.cell, current.side);
        }

        if (current.axis === "row" && Math.abs(dy) >= dragThreshold) {
            insertRow(current.cell, current.side);
        }
    }

    setResizeCursor(null);
});

myTable.addEventListener("pointercancel", function () {
    drag = null;
    setResizeCursor(null);
});

myTable.addEventListener("pointerleave", function () {
    if (!drag) setResizeCursor(null);
});


geid("deleteRowBtn").addEventListener("click", function () {
    if (!selectedCell || !myTable.contains(selectedCell)) return;

    saveUndoState();

    selectedCell.parentElement.remove();
    selectedCell = null;
});

geid("deleteColBtn").addEventListener("click", function () {
    if (!selectedCell || !myTable.contains(selectedCell)) return;

    saveUndoState();

    const index = selectedCell.cellIndex;

    for (const row of myTable.rows) {
        row.cells[index]?.remove();
    }

    selectedCell = null;
});

const undoStack = [];

function saveUndoState() {
    const copy = myTable.cloneNode(true);

    const originals = myTable.querySelectorAll('input[type="text"]');
    const inputs = copy.querySelectorAll('input[type="text"]');

    inputs.forEach((input, i) => {
        input.setAttribute("value", originals[i].value);
    });

    copy.querySelectorAll(".selected-cell").forEach(cell => {
        cell.classList.remove("selected-cell");
    });

    undoStack.push(copy.innerHTML);

    if (undoStack.length > 50) {
        undoStack.shift();
    }
}

geid("undoBtn").addEventListener("click", function () {
    if (undoStack.length === 0) return;

    myTable.innerHTML = undoStack.pop();
    selectedCell = null;
});