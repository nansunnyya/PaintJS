const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const INITIAL_COLOR = "balck";
canvas.width = 500;
canvas.height= 500;

ctx.strokeStyle= INITIAL_COLOR;
ctx.fillStyle= INITIAL_COLOR;

ctx.fillStyle = "white";
ctx.fillRect(0,0,canvas.width,canvas.height);

ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }
    else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function handleColorClick(event){
    console.log(event);
    const currColor = event.target.style.backgroundColor;
    ctx.strokeStyle = currColor;
    ctx.fillStyle = currColor;
}

function handleRangeClick(event)
{
    const currRange = event.target.value;
    ctx.lineWidth = currRange;
}

function handleModeClick(){
    if(filling == true){
        filling = false;
        mode.innerText = "Fill";
    }else{
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
    
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveBtn(){
    
    //const image = canvas.toDataURL("image/jpeg");
    //default:PNG
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "panitJS[👌]";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}


Array.from(colors).forEach(color =>
    color.addEventListener("click",handleColorClick));

if(range){
range.addEventListener("input", handleRangeClick);
}

if(mode){
    mode.addEventListener("click",handleModeClick);
}

if(save){
    save.addEventListener("click", handleSaveBtn);
}