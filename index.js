const BOX_COUNT = 16;

const changeBox = (e) =>
{
    // from https://css-tricks.com/snippets/javascript/random-hex-color/
    e.target.style.backgroundColor = "#" + Math.floor(Math.random()*16777215).toString(16);
}

const initSite = () =>
{
    let boxes = [];
    const boxContainer = document.querySelector("#box-container");

    for (let i = 0; i < BOX_COUNT; i++)
    {
        for (let j = 0; j < BOX_COUNT; j++)
        {
            let newBox = document.createElement("div");
            newBox.classList.add("box");
            newBox.addEventListener("mouseenter", e => changeBox(e));

            newBox.style.width = `${6}%`;
            newBox.style.height = `${5.3}%`;
            newBox.style.margin = `${0.1}%`;
            boxes.push(newBox);
        }
    }

    for (let i = 0; i < BOX_COUNT; i++)
    {
        for (let j = 0; j < BOX_COUNT; j++)
        {
            boxContainer.appendChild(boxes.pop());
        }
    }
}
