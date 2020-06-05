const BOX_COUNT = 8;

const adjustBoxCount = (e) =>
{
    e.preventDefault();

    let currCount = document.getElementById("box-count");
    let scrollVal = parseInt(currCount.textContent);

    if (e.deltaY > 0)
    {
        decrementBoxCount(scrollVal);

        currCount.textContent = scrollVal - 1;
    }
    else if (e.deltaY < 0)
    {
        incrementBoxCount(scrollVal);

        currCount.textContent = scrollVal + 1;
    }
}

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

            // newBox.style.width = `${6}%`;
            newBox.style.width = `${(99.2 / BOX_COUNT) - 0.2}%`;
            // newBox.style.height = `${5.3}%`;
            newBox.style.height = `${(88 / BOX_COUNT) - 0.2}%`;
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

const changeBoxCount = (newCount) =>
{
    let boxes = document.querySelectorAll(".box");
    const boxContainer = document.querySelector("#box-container");

    boxes.forEach(box => box.remove());
    boxes = [];

    for (let i = 0; i < newCount; i++)
    {
        for (let j = 0; j < newCount; j++)
        {
            let newBox = document.createElement("div");
            newBox.classList.add("box");
            newBox.addEventListener("mouseenter", e => changeBox(e));

            newBox.style.width = `${(99.2 / newCount) - 0.2}%`; // 0.2 is the margin total
            newBox.style.height = `${(88 / newCount) - 0.2}%`;
            newBox.style.margin = `${0.1}%`;
            boxes.push(newBox);
        }
    }

    for (let i = 0; i < newCount; i++)
    {
        for (let j = 0; j < newCount; j++)
        {
            boxContainer.appendChild(boxes.pop());
        }
    }
}

const incrementBoxCount = (currCount) =>
{
    changeBoxCount(currCount + 1);
}

const decrementBoxCount = (currCount) =>
{
    changeBoxCount(currCount - 1);
}
