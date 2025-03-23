const main = document.querySelector('main')


const secSport=[

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
];

let Sport=[];

(()=>{
if(localStorage.fit){
    localStorage.fit = Sport
}else{
    Sport = secSport
}
})()


class Exercice{
    ring(){
        let audio = new Audio()
        audio.src="./ring.mp3"
        audio.play()
    }
    constructor(){
        this.index = 0
        this.minutes = Sport[this.index].min;
        this.seconds = 0
    }
    fit(){
        setTimeout(()=>{
            if(this.minutes ==0 && this.seconds == "00"){
                this.index++
                if(this.index < Sport.length){
                    this.minutes = Sport[this.index].min;
                    this.seconds =0
                    this.fit()
                    
                }else{
                    this.ring()
                    page.fin()
                }
            }
        else if(this.seconds == "00"){
                this.minutes --
                this.seconds = 59;
                this.fit()
            }
            else{
                this.seconds --
                this.fit()
            }
        },100)
        this.seconds = this.seconds < 10 ? '0'+ this.seconds :this .seconds;
        return (main.innerHTML=`
        <div class="exercice-container">
        <div>
        <p>${this.minutes}:${this.seconds}</p>
        </>
        <img src="./img/${Sport[this.index].pic}.png"/>
        <span>${this.index+1}/${Sport.length}</span/>
        </div>
        `)
    }
}
const utils ={
    pageContent(title,cont,btn){
        document.querySelector('h1').innerHTML=title;
        main.innerHTML = cont;
        document.querySelector('.btn-container').innerHTML=btn
    },
    arrow(){
        document.querySelectorAll('.arrow').forEach((arrow)=>{
            arrow.addEventListener('click',(e)=>{
                let position =0
                Sport.map((exo)=>{
                    if(exo.pic == e.target.dataset.pic && position != 0){
                        [Sport[position],Sport[position-1]]=[Sport[position-1],Sport[position]]
                    }else{
                        page.lobby()
                        this.store()
                        position ++;
                    }
                })
            })
        })
    },
    deletet(){
        document.querySelectorAll('.deleteBtn').forEach((btn)=>{
            btn.addEventListener('click',(e)=>{
                let doc=[]
                Sport.map((exo)=>{
                    if(exo.pic != e.target.dataset.pic){
                        doc.push(exo)
                    }
                    Sport = doc
                    this.store()
                    page.lobby()
                })
            })
        })
    },
    reboot(){
        Sport = secSport
        this.store()
        page.lobby()
    },
    store(){
        localStorage.fit =JSON.stringify(Sport)
    },
    minutesCalc(){
        document.querySelectorAll('input').forEach((input)=>{
            input.addEventListener('input',(e)=>{
                Sport.map((exo)=>{
                    if(exo.pic == e.target.id){
                        exo.min = parseInt(e.target.value)
                    }
                    this.store()
                    page.lobby()
                })
            })
        })
    }
}

const page={
    lobby(){
        let screen = Sport.map((exo)=>
        `
        <li>
        <div class="card-header">
        <input type = "number" id=${exo.pic} min="1" max="10" value =${exo.min}>
        <span>min</span>
        </div>
        <img src="./img/${exo.pic}.png"/>
        <i class="fa-solid fa-circle-arrow-left arrow" data-pic=${exo.pic}></i>
        <i class="fa-solid fa-circle-xmark deleteBtn"data-pic=${exo.pic}></i>
        </li>
        `
        );
        utils.pageContent(
            'Paramétre <i id="reboot" class="fa-solid fa-arrow-rotate-left"></i>',
            `<ul>${screen}</ul>`,
            '<button id="start">commencer <i class="fa-solid fa-circle-play"></i></button>');
            utils.minutesCalc()
            reboot.addEventListener('click',()=>utils.reboot()),
            start.addEventListener('click',()=>this.routine()),
            utils.arrow()
            utils.deletet()
    },
    routine(){
        const exercice = new Exercice()
        utils.pageContent(
            'Routine <i class="fa-solid fa-arrow-rotate-left"></i>',
             exercice.fit(),
             "<button id='reboot ' class='btn-reboot'>Arreter <i class='fa-solid fa-arrows-rotate stop'></i></button>")
    },
    fin(){
        utils.pageContent( "C'est terimer!",
            "<button id='start'>Recommencer</button>",
        '<button id="secReboot" class="btn-reboot">réunitailiser <i class="fa-solid fa-circle-play"></i></button>')
        secReboot.addEventListener('click',()=>this.lobby())
    }
}
page.lobby()