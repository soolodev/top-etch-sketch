const BOX_COUNT = 8;

const randomBackground = (e) =>
{
    // from https://css-tricks.com/snippets/javascript/random-hex-color/
    e.target.style.backgroundColor = "#" + Math.floor(Math.random()*16777215).toString(16);
}

const initSite = () =>
{
    let boxes = document.querySelectorAll(".box");

    boxes.forEach(box => box.addEventListener("mouseenter", e => randomBackground(e)));
}
