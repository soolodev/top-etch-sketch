const BOX_COUNT = 8;

const randomBackground = (e) =>
{
    // from https://css-tricks.com/snippets/javascript/random-hex-color/
    e.target.style.backgroundColor = "#" + Math.floor(Math.random()*16777215).toString(16);
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
            newBox.addEventListener("mouseenter", e =>  randomBackground(e));
            newRow.appendChild(newBox);
        }

        rows.push(newRow);
    }

    rows.forEach(row => etchSketch.appendChild(row));
}
