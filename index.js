const BOX_COUNT_INIT = 16;
const BOX_COUNT_MIN = 1;
const BOX_COUNT_MAX = 128;

let ETCH_SKETCH;
let BOX_TEXT_OBJ;
let BOX_RANGE_OBJ;

const BRUSH_BLACK = "black-brush";
const BRUSH_WHITE = "white-brush";
const BRUSH_RAINBOW = "rainbow-brush";

let boxCount = 0;
let brushType;

/* --- Helpers --- */
const isGreaterThanOrEqualToMax = value =>
{
    if (value >= BOX_COUNT_MAX)
    {
        return true;
    }
    else
    {
        return false;
    }
}

const isLessThanOrEqualToMin = value =>
{
    if (value <= BOX_COUNT_MIN)
    {
        return true;
    }
    else
    {
        return false;
    }
}

const applyCountBound = value =>
{
    if (isLessThanOrEqualToMin(value))
    {
        return BOX_COUNT_MIN;
    }
    else if (isGreaterThanOrEqualToMax(value))
    {
        return BOX_COUNT_MAX;
    }
    else
    {
        return value;
    }
}

const updateUI = () =>
{
    BOX_TEXT_OBJ.value = boxCount;
    BOX_RANGE_OBJ.value = boxCount;
}

/* --- Grid Size Modifiers --- */
const updateBoxCount = value =>
{
    boxCount = applyCountBound(value);
    updateUI();
}

/* --- Brush Modifiers --- */
const changeBrush = choice =>
{
    if (choice == BRUSH_BLACK ||
        choice == BRUSH_WHITE ||
        choice == BRUSH_RAINBOW)
    {
        brushType = choice;

        document.querySelector(`#${BRUSH_BLACK}`).classList.remove("active-button");
        document.querySelector(`#${BRUSH_WHITE}`).classList.remove("active-button");
        document.querySelector(`#${BRUSH_RAINBOW}`).classList.remove("active-button");

        document.querySelector(`#${choice}`).classList.add("active-button");
    }
}

/* --- Background Modifiers --- */
const randomColor = () =>
{
    // from https://css-tricks.com/snippets/javascript/random-hex-color/
    let randColor = "FFFFFF";

    // Do not accept white as a color
    while (randColor == "FFFFFF")
    {
        randColor = Math.floor(Math.random()*16777215).toString(16);
    }

    return ("#" + randColor);
}

const blackBackground = elem =>
{
    if (elem instanceof Event)
    {
        elem.target.style.backgroundColor = "#000";
    }
    else
    {
        elem.style.backgroundColor = "#000";
    }
}

const whiteBackground = elem =>
{
    if (elem instanceof Event)
    {
        elem.target.style.backgroundColor = "#FFF";
    }
    else
    {
        elem.style.backgroundColor = "#FFF";
    }
}

const randomBackground = elem =>
{
    if (elem instanceof Event)
    {
        elem.target.style.backgroundColor = randomColor();
    }
    else
    {
        elem.style.backgroundColor = randomColor();
    }
}

const changeBackground = elem =>
{
    if (brushType == BRUSH_BLACK)
    {
        blackBackground(elem);
    }
    else if (brushType == BRUSH_WHITE)
    {
        whiteBackground(elem);
    }
    else if (brushType == BRUSH_RAINBOW)
    {
        randomBackground(elem);
    }
}

/* --- Box Modifiers --- */
const createBox = () =>
{
    let newBox = document.createElement("div");
    newBox.classList.add("box");
    newBox.addEventListener("mouseenter", e => changeBackground(e));

    return newBox;
}

const createRow = rowSize =>
{
    let newRow = document.createElement("div");
    newRow.classList.add("row");

    for (let i = 0; i < rowSize; i++)
    {
        newRow.appendChild(createBox());
    }

    return newRow;
}

const addOneBox = () =>
{
    let rows;
    let newRow;

    if (isGreaterThanOrEqualToMax(boxCount))
    {
        return;
    }

    updateBoxCount(boxCount + 1);

    rows = document.querySelectorAll(".row"); // Get all rows
    rows.forEach(row => row.appendChild(createBox())); // Add box to each row
    ETCH_SKETCH.appendChild(createRow(boxCount)); // Add row to main
}

const minusOneBox = () =>
{
    let rows;
    let rowToRemove;

    if (isLessThanOrEqualToMin(boxCount))
    {
        return;
    }

    updateBoxCount(boxCount - 1);

    rows = document.querySelectorAll(".row");
    rowToRemove = Array.from(rows).pop();

    rows.forEach(row => Array.from(row.childNodes).pop().remove()); // Remove box from each existing row
    rowToRemove.remove(); // Remove last row
}

const resetBoxCount = () =>
{
    if (boxCount > BOX_COUNT_INIT)
    {
        while (boxCount != BOX_COUNT_INIT)
        {
            minusOneBox(boxCount);
        }
    }
    else if (boxCount < BOX_COUNT_INIT)
    {
        while (boxCount != BOX_COUNT_INIT)
        {
            addOneBox(boxCount);
        }
    }
}

/* --- Events --- */
const initPage = () =>
{
    ETCH_SKETCH = document.querySelector("#etch-sketch");
    BOX_TEXT_OBJ = document.querySelector("#box-text");
    BOX_RANGE_OBJ = document.querySelector("#box-range");

    let rows = [];
    let boxes = [];

    for (let i = 0; i < BOX_COUNT_INIT; i++)
    {
        rows.push(createRow(BOX_COUNT_INIT)); // Create initial set of rows
    }

    rows.forEach(row => ETCH_SKETCH.appendChild(row));

    updateBoxCount(BOX_COUNT_INIT);
    changeBrush(BRUSH_BLACK);
}

const boxChange = e =>
{
    let changeValue = e.target.value;

    if (isGreaterThanOrEqualToMax(changeValue))
    {
        changeValue = BOX_COUNT_MAX;
    }
    else if (isLessThanOrEqualToMin(changeValue))
    {
        changeValue = BOX_COUNT_MIN;
    }

    if (boxCount > changeValue)
    {
        while (boxCount != changeValue)
        {
            minusOneBox(boxCount);
        }
    }
    else if (boxCount < changeValue)
    {
        while (boxCount != changeValue)
        {
            addOneBox(boxCount);
        }
    }
}

const rangeChange = e =>
{
    let rangeValue = e.target.value;

    if (boxCount > rangeValue)
    {
        while (boxCount != rangeValue)
        {
            minusOneBox(boxCount);
        }
    }
    else if (boxCount < rangeValue)
    {
        while (boxCount != rangeValue)
        {
            addOneBox(boxCount);
        }
    }
}

const mouseScroll = e =>
{
    e.preventDefault();

    let deltaY = e.deltaY;

    if (deltaY > 0 && !(isLessThanOrEqualToMin(boxCount)))
    {
        minusOneBox();
    }
    else if (deltaY < 0 && !(isGreaterThanOrEqualToMax(boxCount)))
    {
        addOneBox();
    }
}

/* --- Mobile Events --- */
const touchEnd = e =>
{
    e.preventDefault();

    e.target.removeEventListener("touchmove", touchMove);
    e.target.removeEventListener("touchend", touchEnd);
}

const touchMove = e =>
{
    e.preventDefault();

    let touch = e.touches[0];
    let posX = touch.pageX;
    let posY = touch.pageY;

    let selectedBox = document.elementFromPoint(posX, posY);

    if (selectedBox != null && selectedBox.classList.contains("box"))
    {
        changeBackground(selectedBox);
    }
}

const touchStart = e =>
{
    e.preventDefault();

    e.target.addEventListener("touchmove", e => touchMove(e));
    e.target.addEventListener("touchend", e => touchEnd(e));
}

/* --- Tool Tip --- */
const moveIn = (e) =>
{
    const hoverObject = e.target.id;

    const tipText = document.querySelector("#pointer + p");
    const pointerObj = document.querySelector("#pointer");
    const containerObj = document.querySelector("#tip-container");

    const hoverPos = e.target.getBoundingClientRect();
    const pointerPos = pointerObj.getBoundingClientRect();

    containerObj.classList.add("visible");
    containerObj.classList.add("active");
    pointerObj.style.setProperty("left", `${hoverPos.left +
        (hoverPos.width / 2) - (pointerPos.width / 2)}px`);

    if (hoverObject == BRUSH_BLACK)
    {
        tipText.innerHTML = "Black Brush";
    }
    else if (hoverObject == BRUSH_WHITE)
    {
        tipText.innerHTML = "White Brush";
    }
    else if (hoverObject == BRUSH_RAINBOW)
    {
        tipText.innerHTML = "Rainbow Brush";
    }

}

const moveOut = (e) =>
{
    const containerObj = document.querySelector("#tip-container");

    containerObj.classList.remove("visible", "active");
}
