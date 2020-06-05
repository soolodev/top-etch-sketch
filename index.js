const BOX_COUNT = 16;

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

            newBox.style.width = `${50}px`;
            newBox.style.height = `${50}px`;
            newBox.style.margin = `${0.25}%`;
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
