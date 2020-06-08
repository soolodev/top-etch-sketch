const BOX_COUNT_INIT = 16;
const BOX_COUNT_MAX = 128;
const BOX_COUNT_MIN = 1;

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

const randomBackground = (e) =>
{
    e.target.style.backgroundColor = randomColor();
}

const addOneBox = (currCount) =>
{
    const etchSketch = document.querySelector("#etch-sketch");
    let rows = document.querySelectorAll(".row");

    // Add a new box to each existing row
    rows.forEach(row => {
        let newBox = document.createElement("div");
        newBox.classList.add("box");
        newBox.addEventListener("mouseenter", e => randomBackground(e));
        row.appendChild(newBox);
    })

    // Add a new row with the correct amount of boxes
    let newRow = document.createElement("div");
    newRow.classList.add("row");

    for (let i = 0; i <= currCount; i++)
    {
        let newBox = document.createElement("div");
        newBox.classList.add("box");
        newBox.addEventListener("mouseenter", e => randomBackground(e));
        newRow.appendChild(newBox);
    }

    etchSketch.appendChild(newRow);
}

const minusOneBox = (currCount) =>
{
    const etchSketch = document.querySelector("#etch-sketch");
    let rows = document.querySelectorAll(".row");
    let rowToRemove = Array.from(rows).pop();

    // Remove a box to each existing row
    rows.forEach(row => {
        let boxToRemove = Array.from(row.childNodes).pop();
        boxToRemove.remove();
    })

    rowToRemove.remove();
}

const resetBoxCount = (e) =>
{
    let boxCountObj = document.querySelector("#box-count");

    boxCountObj.textContent = BOX_COUNT_INIT;
}

const incrementBoxCount = (e) =>
{
    let boxCountObj = document.querySelector("#box-count");
    let boxCount = parseInt(boxCountObj.textContent, 10);

    if (boxCount <= BOX_COUNT_MIN)
    {
        addOneBox(boxCount);
        boxCountObj.textContent = BOX_COUNT_MIN + 1;
        return;
    }
    else if (boxCount >= BOX_COUNT_MAX)
    {
        boxCountObj.textContent = BOX_COUNT_MAX;
        return;
    }

    addOneBox(boxCount);
    boxCountObj.textContent = boxCount + 1;
}

const decrementBoxCount = (e) =>
{
    let boxCountObj = document.querySelector("#box-count");
    let boxCount = parseInt(boxCountObj.textContent, 10);

    if (boxCount <= BOX_COUNT_MIN)
    {
        boxCountObj.textContent = BOX_COUNT_MIN;
        return;
    }
    else if (boxCount >= BOX_COUNT_MAX)
    {
        minusOneBox(boxCount);
        boxCountObj.textContent = BOX_COUNT_MAX - 1;
        return;
    }

    minusOneBox(boxCount);
    boxCountObj.textContent = boxCount - 1;
}

const initPage = () =>
{
    const boxCountObj = document.querySelector("#box-count");
    const etchSketch = document.querySelector("#etch-sketch");
    let rows = [];
    let boxes = [];

    for (let i = 0; i < BOX_COUNT_INIT; i++)
    {
        let newRow = document.createElement("div");
        newRow.classList.add("row");

        for (let j = 0; j < BOX_COUNT_INIT; j++)
        {
            let newBox = document.createElement("div");
            newBox.classList.add("box");
            newBox.addEventListener("mouseenter", e => randomBackground(e));
            newRow.appendChild(newBox);
        }

        rows.push(newRow);
    }

    rows.forEach(row => etchSketch.appendChild(row));
    boxCountObj.textContent = BOX_COUNT_INIT;
}

const touchEnd = (e) =>
{
    e.preventDefault();

    e.target.removeEventListener("touchmove", touchMove);
    e.target.removeEventListener("touchend", touchEnd);
}

const touchMove = (e) =>
{
    e.preventDefault();

    let touch = e.touches[0];
    let posX = touch.pageX;
    let posY = touch.pageY;

    console.log(e);

    let selectedBox = document.elementFromPoint(posX, posY);

    console.log(selectedBox);

    if (selectedBox != null && selectedBox.classList.contains("box"))
        selectedBox.style.backgroundColor = randomColor();
}

const touchStart = (e) =>
{
    e.preventDefault();
    e.target.addEventListener("touchmove", e => touchMove(e));
    e.target.addEventListener("touchend", e => touchEnd(e));
}
