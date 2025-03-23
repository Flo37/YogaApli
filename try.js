
const main = document.querySelector('main')
let basicFit = [
    { pic: 0, min: 1 },
    { pic: 1, min: 1 },
    { pic: 2, min: 1 },
    { pic: 3, min: 1 },
    { pic: 4, min: 1 },
    { pic: 5, min: 1 },
    { pic: 6, min: 1 },
    { pic: 7, min: 1 },
    { pic: 8, min: 1 },
    { pic: 9, min: 1 },
]
let fitPic = [];
(() => {
    if (localStorage.sport) {
        fitPic = localStorage.sport
    } else {
        fitPic = basicFit
    }
})()


class Exercice {
    constructor() {
        this.index = 0;
        this.minutes = fitPic[this.index].min;
        this.seconds = 0
    }
    run() {
        this.seconds = this.seconds < 10 ? "0" + this.seconds : this.seconds
        setTimeout(() => {
            if (this.minutes === 0 && this.seconds === "00") {
                this.index++;
                if (this.index < fitPic.length) {
                    this.seconds = 0
                    this.minutes = fitPic[this.index].min
                    this.run()
                } else {
                    page.finish()
                }
            }
            else if (this.seconds === "00") {
                this.minutes--;
                this.seconds = 59;
                this.run()
            }
            else {
                this.seconds--;
                this.run()
            }
        }, 100)

        return main.innerHTML =
            `
        <div class="exercice-container">
        <p>${this.minutes}:${this.seconds}</p>
        <img src="./img/${fitPic[this.index].pic}.png"/>
        <span>${this.index + 1}/${fitPic.length}</span>
        </div>
        
        `
    }


}

const touls = {
    pageContent(title, content, btn) {
        document.querySelector('h1').innerHTML = title;
        main.innerHTML = content;
        document.querySelector('.btn-container').innerHTML = btn
    },
    addMin() {
        document.querySelectorAll('input').forEach((input) => {
            input.addEventListener('input', (e) => {
                fitPic.map((exo) => {
                    if (e.target.id == exo.pic) {
                        exo.min = parseInt(e.target.value)
                    }
                    this.store()
                    page.start()
                })
            })
        })
    },
    arrow() {
        document.querySelectorAll('.arrow').forEach((arrow) => {
            arrow.addEventListener('click', (e) => {
                let position = 0
                fitPic.map((exo) => {
                    if (e.target.dataset.pic == exo.pic && position != 0) {
                        [fitPic[position], fitPic[position - 1]] = [fitPic[position - 1], fitPic[position]]
                    } else {
                        position++
                        page.start()
                        this.store()
                    }
                })
            })
        })
    },
    delePic() {
        document.querySelectorAll('.deleteBtn').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                let cancer = [];
                fitPic.map((exo) => {
                    if (exo.pic != e.target.dataset.pic) {
                        cancer.push(exo)
                    }
                    fitPic = cancer
                    page.start()
                    this.store()
                })
            })
        })
    },
    reboot() {
        fitPic = basicFit
        page.start()
        this.store()
    },
    store() {
        localStorage.sport = JSON.stringify(fitPic)
    }
}

// ---------------------------------
const page = {
    start() {
        const display = fitPic.map((exo) =>
            `
        <li>
        <div class="card-header">
        <input type ="number" id=${exo.pic} min ="1" max="10"  value =${exo.min}      
        <span>min</span>
        </div>
        <img src="./img/${exo.pic}.png"/>
        <i class="fa-solid fa-left-long arrow" data-pic=${exo.pic}></i>
        <i class="fa-solid fa-xmark deleteBtn" data-pic =${exo.pic}></i>
        </li>
        `

        ).join('')
        touls.pageContent(
            'Parameter <i id="reboot" class="fa-solid fa-arrows-rotate"></i>',
            `<ul>${display}</ul>`,
            '<button id="start">Start <i class="fa-solid fa-play"></i></button'

        )
        touls.arrow()
        touls.delePic()
        touls.addMin()
        reboot.addEventListener('click', () => touls.reboot())
        start.addEventListener('click', () => this.routine())
    },
    routine() {
        let exercice = new Exercice()
        touls.pageContent(
            'Routine <i id="reboot"class="fa-solid fa-arrows-rotate"></i>', exercice.run(), null)
    },
    finish() {
        touls.pageContent("Finish !", "<button id='start'>Begin</button>",
            "<button id='redo' class='btn-reboot'>Reset <i class='fa-solid fa-arrows-rotate'></i></button>"
        )
        redo.addEventListener('click', () => this.start())
    }
}
page.start()