const BOX_COUNT_INIT = 16;
const BOX_COUNT_MAX = 128;
const BOX_COUNT_MIN = 1;

let brushType = "Rainbow";

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

const randomBackground = e =>
{
    e.target.style.backgroundColor = randomColor();
}

const addOneBox = currCount =>
{
    const etchSketch = document.querySelector("#etch-sketch");
    let rows = document.querySelectorAll(".row");

    if (currCount >= BOX_COUNT_MAX)
    {
        return;
    }

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

    document.querySelector("#box-count").value = currCount + 1;
    document.querySelector("#box-range").value = currCount + 1;
}

const minusOneBox = currCount =>
{
    const etchSketch = document.querySelector("#etch-sketch");
    let rows = document.querySelectorAll(".row");
    let rowToRemove = Array.from(rows).pop();

    if (currCount <= BOX_COUNT_MIN)
    {
        return;
    }

    // Remove a box to each existing row
    rows.forEach(row => {
        let boxToRemove = Array.from(row.childNodes).pop();
        boxToRemove.remove();
    })

    rowToRemove.remove();

    document.querySelector("#box-count").value = currCount - 1;
    document.querySelector("#box-range").value = currCount - 1;
}

const resetBoxCount = () =>
{
    let boxCountObj = document.querySelector("#box-count");
    let boxRangeObj = document.querySelector("#box-range");
    let boxCount = parseInt(boxCountObj.value, 10);

    if (boxCount > BOX_COUNT_INIT)
    {
        while (boxCount != BOX_COUNT_INIT)
        {
            minusOneBox(boxCount);
            boxCount -= 1;
        }
    }
    else if (boxCount < BOX_COUNT_INIT)
    {
        while (boxCount != BOX_COUNT_INIT)
        {
            addOneBox(boxCount);
            boxCount += 1;
        }
    }
}

const incrementBoxCount = () =>
{
    const boxCountObj = document.querySelector("#box-count");
    let boxCount = parseInt(boxCountObj.value, 10);

    addOneBox(boxCount);
}

const decrementBoxCount = () =>
{
    const boxCountObj = document.querySelector("#box-count");
    let boxCount = parseInt(boxCountObj.value, 10);

    minusOneBox(boxCount);
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
    boxCountObj.value = BOX_COUNT_INIT;
    document.querySelector("#box-range").value = (BOX_COUNT_INIT / BOX_COUNT_MAX) * 10;

    document.querySelector("#random-brush").classList.add("active-button");
}

const mouseScroll = e =>
{
    e.preventDefault();

    let boxCount = document.querySelector("#box-count").value;
    let deltaY = e.deltaY;

    if (deltaY > 0 && boxCount > BOX_COUNT_MIN)
    {
        decrementBoxCount();
    }
    else if (deltaY < 0 && boxCount < BOX_COUNT_MAX)
    {
        incrementBoxCount();
    }
}

const boxChange = e =>
{
    return;
}

const rangeChange = e =>
{
    let boxCountObj = document.querySelector("#box-count");
    let boxRangeObj = document.querySelector("#box-range");
    let boxCount = parseInt(boxCountObj.value, 10);
    let rangeValue = e.target.value;

    if (boxCount > rangeValue)
    {
        while (boxCount != rangeValue && boxCount > BOX_COUNT_MIN)
        {
            minusOneBox(boxCount);
            boxCount -= 1;
        }
    }
    else if (boxCount < rangeValue)
    {
        while (boxCount != rangeValue && boxCount < BOX_COUNT_MAX)
        {
            addOneBox(boxCount);
            boxCount += 1;
        }
    }
}

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

    // console.log(e);

    let selectedBox = document.elementFromPoint(posX, posY);

    // console.log(selectedBox);

    if (selectedBox != null && selectedBox.classList.contains("box"))
        selectedBox.style.backgroundColor = randomColor();
}

const touchStart = e =>
{
    e.preventDefault();

    e.target.addEventListener("touchmove", e => touchMove(e));
    e.target.addEventListener("touchend", e => touchEnd(e));
}

/*
    Tool tip
*/
// Swaps text and shows tip
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
    pointerObj.style.setProperty("left", `${hoverPos.left + (hoverPos.width / 2) - (pointerPos.width / 2)}px`);

    if (hoverObject == "black-brush")
    {
        tipText.innerHTML = "Black Brush";
    }
    else if (hoverObject == "white-brush")
    {
        tipText.innerHTML = "White Brush";
    }
    else if (hoverObject == "random-brush")
    {
        tipText.innerHTML = "Rainbow Brush";
    }

}

// remove tip
const moveOut = (e) =>
{
    const containerObj = document.querySelector("#tip-container");

    containerObj.classList.remove("visible", "active");
}
