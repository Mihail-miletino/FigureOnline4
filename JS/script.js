const body = document.querySelector("body"); 
const list = document.querySelector(".choose-list");
const forms = document.querySelector(".forms");
const formsContainer = document.querySelector(".forms-container");
const buttons = document.querySelectorAll(".draw");
const inputs = document.querySelectorAll(".to-input");
const asyncioInput = document.querySelector(".asyncio-input");
const speedInput = document.querySelector(".to-input-speed");
let figure = "";
let figureInscr = "";
let k = 0;

[...forms.children].forEach((form) => form.style.display = "none");

const sp = new Proxy({
    speed: 2000,
    defaultValue: 2000,
}, {
    set(target, prop, newValue){
        (document.querySelector(".warning-inscription") != null) ? document.querySelector(".warning-inscription").remove() : true;
        if (Number.isNaN(newValue) || newValue <= 0){
            const warningInscr = document.createElement("div");
            warningInscr.className = "warning-inscription";
            warningInscr.innerHTML = "Поле не должно содержать никаких символов, кроме чисел. Дробные числа вводите через точку.";
            warningInscr.style.cssText = "display: block; width: 180px; margin: 0px 0px 0px 20px; font-size: 14px; font-weight: 700; font-family: Arial; color: red;";
            if (speedInput.value != ""){
                speedInput.parentElement.after(warningInscr);
            };
            target[prop] = target["defaultValue"];
            return false;
        } else{
            target[prop] = newValue * 1000;
            return true;
        };
    },
});

speedInput.addEventListener("change", (event) => {
    sp.speed = Number(speedInput.value);
});

class Robot{
    constructor(options){
        this.headSizeRobot = options.headSizeRobot;
        this.widthBodyRobot = options.widthBodyRobot;
        this.heightBodyRobot = options.heightBodyRobot;
        this.lengthHandsRobot = options.lengthHandsRobot;
        this.widthHandsRobot = options.widthHandsRobot;
        this.legsSizeRobot = options.legsSizeRobot;
        this.colorRobot = options.colorRobot;
        this.id = k;
        this.inscription = "";
        this.asyncio = true;
    };
    sumHeight(){
        return parseInt(this.headSizeRobot) + parseInt(this.heightBodyRobot) + parseInt(this.legsSizeRobot) + 40;
    };
};

class Snowman{
    constructor(options){
        this.headSizeSnowman = options.headSizeSnowman;
        this.middleSizeSnowman = options.middleSizeSnowman;
        this.lowSizeSnowman = options.lowSizeSnowman;
        this.colorSnowman = options.colorSnowman;
        this.id = k;
        this.inscription = "";
        this.asyncio = true;
    };
    sumHeight(){
        return parseInt(this.headSizeSnowman) + parseInt(this.middleSizeSnowman) + parseInt(this.lowSizeSnowman) + 40;
    };
};

class Kub{
    constructor(options){
        this.kubSize = options.kubSize;
        this.colorKub = options.colorKub;
        this.id = k;
        this.inscription = "";
        this.asyncio = true;
    };
    sumHeight(){
        return parseInt(this.kubSize) + 40;
    }
};

class Bird{
    constructor(options){
        this.headSizeBird = options.headSizeBird;
        this.beakSizeBird = options.beakSizeBird;
        this.colorBird = options.colorBird;
        this.id = k;
        this.inscription = "";
        this.asyncio = true;
    };
    sumHeight(){
        return parseInt(this.headSizeBird) + 40;
    };
};

const createFigure = (event) => {
    k += 1;
    let obj = {};
    if (figure === "robot"){
        obj = new Robot({});
        for (let index = 0; index < (event.target.parentElement.children.length - 1); index++){
            obj[event.target.parentElement.children[index].firstElementChild.id] = event.target.parentElement.children[index].firstElementChild.value;
        };
        obj.id = k;
        obj.inscription = figureInscr;
        obj.asyncio = event.target.previousElementSibling.firstElementChild.checked;
        createWrapper(obj);
        paintRobot(obj);
    };
    if (figure === "snowman"){
        obj = new Snowman({});
        for (let index = 0; index < (event.target.parentElement.children.length - 1); index++){
            obj[event.target.parentElement.children[index].firstElementChild.id] = event.target.parentElement.children[index].firstElementChild.value;
        };
        obj.id = k;
        obj.inscription = figureInscr;
        obj.asyncio = event.target.previousElementSibling.firstElementChild.checked;
        createWrapper(obj);
        paintSnowman(obj);
    };
    if (figure === "kub"){
        obj = new Kub({});
        for (let index = 0; index < (event.target.parentElement.children.length - 1); index++){
            obj[event.target.parentElement.children[index].firstElementChild.id] = event.target.parentElement.children[index].firstElementChild.value;
        };
        obj.id = k;
        obj.inscription = figureInscr;
        obj.asyncio = event.target.previousElementSibling.firstElementChild.checked;
        createWrapper(obj);
        paintKub(obj);
    };
    if (figure === "bird"){
        obj = new Bird({});
        for (let index = 0; index < (event.target.parentElement.children.length - 1); index++){
            obj[event.target.parentElement.children[index].firstElementChild.id] = event.target.parentElement.children[index].firstElementChild.value;
        };
        obj.id = k;
        obj.inscription = figureInscr;
        obj.asyncio = event.target.previousElementSibling.firstElementChild.checked;
        createWrapper(obj);
        paintBird(obj);
    };
};

const paintRobot = (robot) => {
    let wrapperRobot = "";
    const wrappers = document.querySelectorAll(".figure-wrapper");
    for (let index = 0; index < wrappers.length; index++){
        if (wrappers[index].id === String(robot.id)){
            wrapperRobot = wrappers[index];
            break;
        };
    };
    const prom = new Promise((resolve, reject) => {
        setTimeout(() => {
            const wrapperRobot2 = document.createElement("div");
            wrapperRobot2.style.cssText = "display: flex; flex-direction: column; align-items: center; width: 100%;";
            wrapperRobot.append(wrapperRobot2);
            const inscr = document.createElement("div");
            inscr.innerHTML = `Сейчас будет ${robot.inscription}!`;
            inscr.style.cssText = "display: block; font-size: 15px; font-weight: 700; font-family: Arial; text-align: center; margin: 0px 0px 15px 0px;";
            wrapperRobot2.append(inscr);
            resolve(wrapperRobot2);
        }, 500);
    }).then((wrapperRobot2) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const headRobot = document.createElement("div");
                headRobot.style.cssText = `display: block; width: ${robot.headSizeRobot}px; height: ${robot.headSizeRobot}px; background: ${robot.colorRobot}; border: 1px solid #000;`;
                wrapperRobot2.append(headRobot);
                resolve(wrapperRobot2);
            }, sp.speed);
        });
    }).then((wrapperRobot2) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const bodyRobotWrapper = document.createElement("div");
                bodyRobotWrapper.style.cssText = "display: flex; align-items: center; justify-content: center; width: 100%;";
                wrapperRobot2.append(bodyRobotWrapper);
                const bodyRobot = document.createElement("div");
                bodyRobot.style.cssText = `display: block; width: ${robot.widthBodyRobot}px; height: ${robot.heightBodyRobot}px; background: ${robot.colorRobot}; border: 1px solid #000;`;
                bodyRobotWrapper.append(bodyRobot);
                resolve([wrapperRobot2, bodyRobotWrapper]);
            }, sp.speed);
        });
    }).then(([wrapperRobot2, bodyRobotWrapper]) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const handRobot1 = document.createElement("div");
                const handRobot2 = document.createElement("div");
                handRobot1.style.cssText = `display: block; width: ${robot.lengthHandsRobot}px; height: ${robot.widthHandsRobot}px; background: ${robot.colorRobot}; border: 1px solid #000; position: relative; bottom: ${String((parseInt(robot.heightBodyRobot) * 1.2) - parseInt(robot.heightBodyRobot))}px;`;
                handRobot2.style.cssText = `display: block; width: ${robot.lengthHandsRobot}px; height: ${robot.widthHandsRobot}px; background: ${robot.colorRobot}; border: 1px solid #000; position: relative; bottom: ${String((parseInt(robot.heightBodyRobot) * 1.2) - parseInt(robot.heightBodyRobot))}px;`;
                bodyRobotWrapper.append(handRobot1);
                bodyRobotWrapper.prepend(handRobot2);
                resolve(wrapperRobot2);
            }, sp.speed);
        });
    }).then((wrapperRobot2) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const legsRobotWrapper = document.createElement("div");
                legsRobotWrapper.style.cssText = "display: flex; justify-content: center; width: 100%;";
                wrapperRobot2.append(legsRobotWrapper);
                const legRobot1 = document.createElement("div");
                const legRobot2 = document.createElement("div");
                legRobot1.style.cssText = `display: block; width: ${robot.legsSizeRobot}px; height: ${robot.legsSizeRobot}px; background: ${robot.colorRobot}; border: 1px solid #000; margin: 0px ${String((parseInt(robot.widthBodyRobot) * 1.15) - parseInt(robot.widthBodyRobot))}px 0px 0px;`;
                legRobot2.style.cssText = `display: block; width: ${robot.legsSizeRobot}px; height: ${robot.legsSizeRobot}px; background: ${robot.colorRobot}; border: 1px solid #000;`;
                legsRobotWrapper.append(legRobot1);
                legsRobotWrapper.append(legRobot2);
                resolve(wrapperRobot2);
            }, sp.speed);
        });
    }).then((wrapperRobot2) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (robot.asyncio){
                    wrapperRobot2.remove();
                    paintRobot(robot);
                };
                resolve();
            }, sp.speed);
        });
    });
};

const paintSnowman = (snowman) => {
    let wrapperSnowman = "";
    const wrappers = document.querySelectorAll(".figure-wrapper");
    for (let index = 0; index < wrappers.length; index++){
        if (wrappers[index].id === String(snowman.id)){
            wrapperSnowman = wrappers[index];
            break;
        };
    };
    const prom = new Promise((resolve, reject) => {
        setTimeout(() => {
            const wrapperSnowman2 = document.createElement("div");
            wrapperSnowman2.style.cssText = "display: flex; flex-direction: column; align-items: center; width: 100%;";
            wrapperSnowman.append(wrapperSnowman2);
            const inscr = document.createElement("div");
            inscr.innerHTML = `Сейчас будет ${snowman.inscription}!`;
            inscr.style.cssText = "display: block; font-size: 15px; font-weight: 700; font-family: Arial; text-align: center; margin: 0px 0px 15px 0px;";
            wrapperSnowman2.append(inscr);
            resolve(wrapperSnowman2);
        }, 500);
    }).then((wrapperSnowman2) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const headSnowman = document.createElement("div");
                headSnowman.style.cssText = `display: block; width: ${snowman.headSizeSnowman}px; height: ${snowman.headSizeSnowman}px; background: ${snowman.colorSnowman}; border: 1px solid #000; border-radius: 50%;`;
                wrapperSnowman2.append(headSnowman);
                resolve(wrapperSnowman2);
            }, sp.speed);
        });
    }).then((wrapperSnowman2) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const middleSnowman = document.createElement("div");
                middleSnowman.style.cssText = `display: block; width: ${snowman.middleSizeSnowman}px; height: ${snowman.middleSizeSnowman}px; background: ${snowman.colorSnowman}; border: 1px solid #000; border-radius: 50%;`;
                wrapperSnowman2.append(middleSnowman);
                resolve(wrapperSnowman2);
            }, sp.speed);
        });
    }).then((wrapperSnowman2) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const lowSnowman = document.createElement("div");
                lowSnowman.style.cssText = `display: block; width: ${snowman.lowSizeSnowman}px; height: ${snowman.lowSizeSnowman}px; background: ${snowman.colorSnowman}; border: 1px solid #000; border-radius: 50%;`;
                wrapperSnowman2.append(lowSnowman);
                resolve(wrapperSnowman2);
            }, sp.speed);
        });
    }).then((wrapperSnowman2) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (snowman.asyncio){
                    wrapperSnowman2.remove();
                    paintSnowman(snowman);
                };
                resolve();
            }, sp.speed);
        });
    });
};

const paintKub = (kub) => {
    let wrapperKub = "";
    const wrappers = document.querySelectorAll(".figure-wrapper");
    for (let index = 0; index < wrappers.length; index++){
        if (wrappers[index].id === String(kub.id)){
            wrapperKub = wrappers[index];
            break;
        };
    };
    const prom = new Promise((resolve, reject) => {
        setTimeout(() => {
            const wrapperKub2 = document.createElement("div");
            wrapperKub2.style.cssText = "display: flex; flex-direction: column; align-items: center; width: 100%;";
            wrapperKub.append(wrapperKub2);
            const inscr = document.createElement("div");
            inscr.innerHTML = `Сейчас будет ${kub.inscription}!`;
            inscr.style.cssText = "display: block; font-size: 15px; font-weight: 700; font-family: Arial; text-align: center; margin: 0px 0px 15px 0px;";
            wrapperKub2.append(inscr);
            resolve(wrapperKub2);
        }, 500);
    }).then((wrapperKub2) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const bodyKub = document.createElement("div");
                bodyKub.style.cssText = `display: flex; flex-direction: column; align-items: center; width: ${kub.kubSize}px; height: ${kub.kubSize}px; background: ${kub.colorKub}; border: 1px solid #000;`;
                wrapperKub2.append(bodyKub);
                resolve([wrapperKub2, bodyKub]);
            }, sp.speed);
        });
    }).then(([wrapperKub2, bodyKub]) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const eyesKubWrapper = document.createElement("div");
                eyesKubWrapper.style.cssText = `display: flex; align-items: center; justify-content: space-around; width: 100%; position: relative; top: ${String((parseInt(kub.kubSize) * 1.3) - parseInt(kub.kubSize))}px;`;
                bodyKub.append(eyesKubWrapper);
                const eyesKub1 = document.createElement("div");
                eyesKub1.style.cssText = `display: flex; align-items: center; justify-content: center; width: ${String((parseInt(kub.kubSize) * 1.1) - parseInt(kub.kubSize))}px; height: ${String((parseInt(kub.kubSize) * 1.05) - parseInt(kub.kubSize))}px; background: #000;`;
                const eyesKub2 = document.createElement("div");
                eyesKub2.style.cssText = `display: flex; align-items: center; justify-content: center;  width: ${String((parseInt(kub.kubSize) * 1.1) - parseInt(kub.kubSize))}px; height: ${String((parseInt(kub.kubSize) * 1.05) - parseInt(kub.kubSize))}px; background: #000;`;
                const redDotKub1 = document.createElement("div");
                redDotKub1.style.cssText = `display: block; width: ${String((parseInt(kub.kubSize) * 1.02) - parseInt(kub.kubSize))}px; height: ${String((parseInt(kub.kubSize) * 1.02) - parseInt(kub.kubSize))}px; background: red; border-radius: 50%;`;
                const redDotKub2 = document.createElement("div");
                redDotKub2.style.cssText = `display: block; width: ${String((parseInt(kub.kubSize) * 1.02) - parseInt(kub.kubSize))}px; height: ${String((parseInt(kub.kubSize) * 1.02) - parseInt(kub.kubSize))}px; background: red; border-radius: 50%;`;
                eyesKubWrapper.append(eyesKub1);
                eyesKubWrapper.append(eyesKub2);
                eyesKub1.append(redDotKub1);
                eyesKub2.append(redDotKub2);
                resolve([wrapperKub2, bodyKub]);
            }, sp.speed);
        });
    }).then(([wrapperKub2, bodyKub]) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const mouthKub = document.createElement("div");
                mouthKub.style.cssText = `display: block; width: ${String((parseInt(kub.kubSize) * 1.5) - parseInt(kub.kubSize))}px; height: ${String((parseInt(kub.kubSize) * 1.2) - parseInt(kub.kubSize))}px; background: red; border: 1px solid #000; position: relative; top: ${String((parseInt(kub.kubSize) * 1.5) - parseInt(kub.kubSize))}px;`;
                bodyKub.append(mouthKub);
                resolve(wrapperKub2);
            }, sp.speed);
        });
    }).then((wrapperKub2) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (kub.asyncio){
                    wrapperKub2.remove();
                    paintKub(kub);
                };
                resolve();
            }, sp.speed);
        });
    });
};

const paintBird = (bird) => {
    let wrapperBird = "";
    const wrappers = document.querySelectorAll(".figure-wrapper");
    for (let index = 0; index < wrappers.length; index++){
        if (wrappers[index].id === String(bird.id)){
            wrapperBird = wrappers[index];
            break;
        };
    };
    const prom = new Promise((resolve, reject) => {
        setTimeout(() => {
            const wrapperBird2 = document.createElement("div");
            wrapperBird2.style.cssText = "display: flex; flex-direction: column; align-items: center; width: 100%;";
            wrapperBird.append(wrapperBird2);
            const inscr = document.createElement("div");
            inscr.innerHTML = `Сейчас будет ${bird.inscription}!`;
            inscr.style.cssText = "display: block; font-size: 15px; font-weight: 700; font-family: Arial; text-align: center; margin: 0px 0px 15px 0px;";
            wrapperBird2.append(inscr);
            resolve(wrapperBird2);
        }, 500);
    }).then((wrapperBird2) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const bodyBirdWrapper = document.createElement("div");
                bodyBirdWrapper.style.cssText = "display: flex; align-items: center; justify-content: center; width: 100%;";
                wrapperBird2.append(bodyBirdWrapper);
                const bodyBird = document.createElement("div");
                bodyBird.style.cssText = `display: flex; align-items: center; justify-content: center; width: ${bird.headSizeBird}px; height: ${bird.headSizeBird}px; background: ${bird.colorBird}; border: 1px solid #000; border-radius: 50%; position: relative; z-index: 2;`;
                bodyBirdWrapper.append(bodyBird);
                const eyesBird1 = document.createElement("div");
                const eyesBird2 = document.createElement("div");
                eyesBird1.style.cssText = `display: flex; align-items: center; justify-content: center; width: ${String((parseInt(bird.headSizeBird) * 1.2) - parseInt(bird.headSizeBird))}px; height: ${String((parseInt(bird.headSizeBird) * 1.2) - parseInt(bird.headSizeBird))}px; background: white; border: 1px solid #000; position: relative; bottom: ${String((parseInt(bird.headSizeBird) * 1.15) - parseInt(bird.headSizeBird))}px; left: ${String((parseInt(bird.headSizeBird) * 1.15) - parseInt(bird.headSizeBird))}px; border-radius: 50%;`;
                eyesBird2.style.cssText = `display: block; width: ${String((parseInt(bird.headSizeBird) * 1.05) - parseInt(bird.headSizeBird))}px; height: ${String((parseInt(bird.headSizeBird) * 1.05) - parseInt(bird.headSizeBird))}px; background: #000; border-radius: 50%;`;
                bodyBird.append(eyesBird1);
                eyesBird1.append(eyesBird2);
                resolve([wrapperBird2, bodyBirdWrapper]);
            }, sp.speed);
        });
    }).then(([wrapperBird2, bodyBirdWrapper]) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const beakBird = document.createElement("div");
                beakBird.style.cssText = `display: block; width: 0; height: 0; border-top: ${bird.beakSizeBird}px solid #000; border-left: ${bird.beakSizeBird}px solid transparent; transform: rotate(45deg); position: relative; right: ${String((parseInt(bird.beakSizeBird) * 1.8) - parseInt(bird.beakSizeBird))}px; z-index: 1;`;
                bodyBirdWrapper.append(beakBird);
                resolve(wrapperBird2);
            }, sp.speed);
        });
    }).then((wrapperBird2) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (bird.asyncio){
                    wrapperBird2.remove();
                    paintBird(bird);
                };
                resolve();
            }, sp.speed);
        });
    });
};

const createWrapper = (obj) => {
    const wrapper = document.createElement("div");
    wrapper.id = obj.id;
    wrapper.className = "figure-wrapper";
    const figureHeight = obj.sumHeight();
    wrapper.style.cssText = `display: flex; align-items: center; justify-content: center; width: 100%; height: ${figureHeight}px; margin: 0px 0px 25px 0px;`;
    body.append(wrapper);
};

list.addEventListener("click", (event) => {
    inputs.forEach((input) => input.value = "");
    let arrForms = [...forms.children];
    arrForms.forEach((form) => {
        if (form.classList.contains(event.target.id)){
            figure = event.target.id;
            figureInscr = event.target.textContent.toLowerCase();
            form.style.display = "flex";
            form.lastElementChild.addEventListener("click", createFigure);
        } else{
            form.style.display = "none";
        };
    });
});
