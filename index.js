const BOX_COUNT = 16;

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

const incrementBoxCount = (e) =>
{
    let boxCount = document.querySelector("#box-count");

    boxCount.textContent = parseInt(boxCount.textContent, 10) + 1;
}

const decrementBoxCount = (e) =>
{
    let boxCount = document.querySelector("#box-count");

    boxCount.textContent = parseInt(boxCount.textContent, 10) - 1;
}

const initPage = () =>
{
    const etchSketch = document.querySelector("#etch-sketch");
    let rows = [];
    let boxes = [];

    for (let i = 0; i < BOX_COUNT; i++)
    {
        let newRow = document.createElement("div");
        newRow.classList.add("row");

        for (let j = 0; j < BOX_COUNT; j++)
        {
            let newBox = document.createElement("div");
            newBox.classList.add("box");
            newBox.addEventListener("mouseenter", e => randomBackground(e));
            newRow.appendChild(newBox);
        }

        rows.push(newRow);
    }

    rows.forEach(row => etchSketch.appendChild(row));
}
