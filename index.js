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
        boxCountObj.textContent = BOX_COUNT_MIN + 1;
        return;
    }
    else if (boxCount >= BOX_COUNT_MAX)
    {
        boxCountObj.textContent = BOX_COUNT_MAX;
        return;
    }

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
        boxCountObj.textContent = BOX_COUNT_MAX - 1;
        return;
    }

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
