var rows = 3;
var col = 3;

var currTile;
var otherTile;

var turns = 0;

var imgOrder = ["image_part_004","image_part_006","image_part_008","image_part_003","image_part_002","image_part_001","image_part_005","image_part_009","image_part_007"]

window.onload=function()
{
    for(let r=0;r<rows;r++)
    {
        for(let c=0;c<col;c++)
        {
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = imgOrder.shift()+".jpg";

            tile.addEventListener("dragstart",dragStart);
            tile.addEventListener("dragover",dragOver);
            tile.addEventListener("dragenter",dragEnter);
            tile.addEventListener("dragleave",dragLeave);
            tile.addEventListener("drop",dragDrop);
            tile.addEventListener("dragend",dragEnd);

            document.getElementById("board").append(tile);
            
        }
    }
}
function dragStart()
{
    currTile=this;
}
function dragOver(e)
{
    e.preventDefault();
}
function dragEnter(e)
{
    e.preventDefault();
}
function dragLeave()
{

}
function dragDrop()
{
    otherTile=this;
}
function dragEnd()
{
if(!otherTile.src.includes("image_part_009.jpg"))
{
    return;
}

    let currCoords=currTile.id.split("-");
    let r=parseInt(currCoords[0]);
    let c=parseInt(currCoords[1]);

    let otherCoords=otherTile.id.split("-");
    let r2=parseInt(otherCoords[0]);
    let c2=parseInt(otherCoords[1]);

    let moveLeft = r == r2 && c2 == c-1;
    let moveRight = r ==r2 && c2 ==c+1;

    let moveUp = c == c2 && r2 ==r-1;
    let moveDown = c == c2 && r2 == r+1;
    
    let isAdjacent = moveLeft || moveRight || moveDown || moveUp;

    if(isAdjacent)
    {
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src= otherImg;
        otherTile.src=currImg;

        turns+=1;
        document.getElementById("turns").innerText=turns;
    }



    let currImg=currTile.src;
    let otherImg=otherTile.src;

    currTile=otherImg;
    otherTile=currImg;
}