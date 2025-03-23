const main = document.querySelector('main')

let pict =[
    {pic:0,min:1},
    {pic:1,min:1},
    {pic:2,min:1},
    {pic:3,min:1},
    {pic:4,min:1},
    {pic:5,min:1},
    {pic:6,min:1},
    {pic:7,min:1},
    {pic:8,min:1},
    {pic:9,min:1}
]


const utils={
    pagecontent(title,content,btn){
        document.querySelector('h1').innerHTML=title,
        main.innerHTML=content,
        document.querySelector('.btn-container').innerHTML=btn
    },
    arrow(){
        document.querySelectorAll('.arrow').forEach((arrow)=>{
            arrow.addEventListener('click',(e)=>{
                let position = 0
                pict.map((exo)=>{
                    if(e.target.dataset.pic==exo.pic && position != 0){
                    [pict[position-1],pict[position]]=[pict[position],pict[position-1]]
                    }
                    page.lobby()
                    position++
                }
                )
            })
        })
    }
}

const page ={
    lobby(){
        let maper = pict.map((exo)=>
            `
            <li>
            <div class="card-header">
            <input type="number" id=${exo.pic} min="1" max="10" value = ${exo.min}>
            <span>min</span>
            </div>
            <img src="./img/${exo.pic}.png"/>
            <i class="fa-solid fa-circle-left arrow" data-pic=${exo.pic}></i>
            <i class="fa-solid fa-circle-xmark deleteBtn" data-pic=${exo.pic}></i>
            </li>
            `
        ).join('')
        utils.pagecontent(
            'Parametre',
            `<ul>${maper}</ul>`,
            '<button id="start"> Commencer </button>'
        )

        utils.arrow()
    }
}
page.lobby()