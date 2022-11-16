let monthName = ["Jan.", "Feb.", "Mar.", "Apr.", "May.", "Jun.", "Jul.", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."]
let randomPicturePool = ["landscape", "lake", "mountain", "sky", "forest", "travel", "culture", "arts", "animals", "food", "drink", "architecture", "interiors", "business", "work", "people", "textures", "patterns", "nature"]

let colors = {
    "xx1": [ // 定义渐变颜色的数组
        { offset: 0, color: 'rgb(255, 221, 199)' },
        { offset: 1 / 9, color: 'rgb(255, 216, 199)' },
        { offset: 2 / 9, color: 'rgb(255, 200, 199)' },
        { offset: 3 / 9, color: 'rgb(255, 204, 223)' },
        { offset: 4 / 9, color: 'rgb(255, 204, 245)' },
        { offset: 5 / 9, color: 'rgb(243, 209, 255)' },
        { offset: 6 / 9, color: 'rgb(221, 209, 255)' },
        { offset: 7 / 9, color: 'rgb(209, 214, 255)' },
        { offset: 8 / 9, color: 'rgb(214, 229, 255)' },
        { offset: 1, color: 'rgb(214, 233, 255)' },
    ],
    "xx4": [
        { offset: 1, color: 'rgb(14, 18, 38)' },
        { offset: 1 / 2, color: 'rgb(48, 59, 94)' },
        { offset: 0, color: ' rgb(95, 108, 138)' },
    ],
    "xx5": [
        { offset: 0, color: 'rgb(0, 176, 158)' },
        { offset: 1 / 2, color: 'rgb(19, 77, 93)' },
        { offset: 1, color: 'rgb(16, 23, 31)' },
    ],
    "xx2": [
        { offset: 0, color: 'rgb(255, 219, 219)' },
        { offset: 1 / 6, color: 'rgb(255, 209, 214)' },
        { offset: 2 / 6, color: 'rgb(255, 185, 208)' },
        { offset: 3 / 6, color: 'rgb(255, 154, 218)' },
        { offset: 4 / 6, color: 'rgb(255, 123, 247)' },
        { offset: 5 / 6, color: 'rgb(228, 99, 255)' },
        { offset: 1, color: 'rgb(211, 89, 255)' },
    ],
    "xx3": [ // 定义渐变颜色的数组
        { offset: 0, color: 'rgb(255, 87, 15)' },
        { offset: 8 / 9, color: 'rgb(255, 95, 20)' },
        { offset: 7 / 9, color: 'rgb(255, 115, 33)' },
        { offset: 6 / 9, color: 'rgb(255, 143, 52)' },
        { offset: 5 / 9, color: 'rgb(255, 171, 75)' },
        { offset: 4 / 9, color: 'rgb(255, 197, 98)' },
        { offset: 3 / 9, color: 'rgb(255, 217, 121)' },
        { offset: 2 / 9, color: 'rgb(255, 231, 140)' },
        { offset: 1 / 9, color: 'rgb(255, 239, 153)' },
        { offset: 0, color: 'rgb(255, 242, 158)' },
    ],
}

class SelectPool {
    constructor(pool) {
        if (Array.isArray(pool)) {
            this.pool = pool || []
        } else if (typeof pool == "object") {
            this.pool = []
            for (let i in pool) {
                this.pool.push(i)
            }
        }
    }

    select() {
        let seed = Math.floor(Math.random() * this.pool.length)
        return this.pool[seed]
    }

    add(...pools) {
        this.pool.push(...pools)
    }
}

function getBackgroundColor() {
    new fabric.Rect()
}

async function renderPost(sentence = "", oripost = {}) {
    // 设置元素
    let post = Object.assign({
        avatarUrl: `touxiang.jpeg`,
        logoUrl: `ob.png`,
        sentence: sentence,
        userName: `username`,
        nameID: `@name_id`
    }, oripost)

    // let avatarUrl = `touxiang.jpeg`
    // let logoUrl = `ob.png`
    //     let sentence = `你看不见我，不代表我不存在。你来与不来，我就在这里，讲述我的打工故事。

    // 谁看了不说一句社畜辛苦了呢。`
    let userName = `绿子`
    let nameID = `@Midoriko`

    // 设定大小
    let scale = 3
    // 背景大小
    let bgWidth = 757 * scale
    let bgHeight = 479 * scale
    // 卡片大小
    let cardWidth = 588 * scale
    // let cardHeight = 338 * scale
    // 头像和logo大小
    let avatarWidth = 60 * scale
    let logoWidth = 50 * scale

    // 设置基础属性
    let sentenceFontSize = 20 * scale
    let timeFontSize = 17 * scale
    let nameFontSize = 18 * scale
    let nameIDFontSize = 18 * scale

    let sentenceFontColor = "#3D3D3D"
    let timeFontColor = "#787878"
    let nameFontColor = "#3D3D3D"
    let nameIDFontColor = "#3D3D3D"


    // 处理文字
    let lines = []
    let ss = post.sentence.split("\n")
    let wordCountPerLine = Math.floor((cardWidth - 40 * 2 * scale) / sentenceFontSize)

    for (let l of ss) {
        let lline = splitSentence(l, wordCountPerLine)
        lines.push(...lline)
        // lines.push("\n")
    }

    let sentenceHeight = lines.length * 1.5 * sentenceFontSize
    let cardHeight = sentenceHeight + 200 * scale
    let ajustedBgHeight = cardHeight + 150 * 2
    if (bgHeight < ajustedBgHeight) {
        bgHeight = ajustedBgHeight
    }

    let selector = new SelectPool(randomPicturePool)
    let bgUrl
    async function getImage() {
        return await getRandomImg(selector.select())
    }

    // 设定位置
    let cardPlace = { x: (bgWidth - cardWidth) / 2, y: (bgHeight - cardHeight) / 2 }
    let avatarPlace = { x: cardPlace.x + 40 * scale, y: cardPlace.y + 40 * scale }
    let logoPlace = { x: cardPlace.x + cardWidth - 40 * scale - logoWidth, y: cardPlace.y + 47 * scale }
    let namePlace = { x: avatarPlace.x + avatarWidth + 15 * scale, y: avatarPlace.y + avatarWidth / 2 - 18 * scale }
    let nameIDPlace = { x: avatarPlace.x + avatarWidth + 15 * scale, y: avatarPlace.y + avatarWidth / 2 + 6 * scale }
    let sentencePlace = { x: cardPlace.x + 40 * scale, y: cardPlace.y + 130 * scale }
    let timePlace = { x: cardPlace.x + cardWidth - 210 * scale, y: cardPlace.y + cardHeight - 55 * scale }


    // 正式组装
    var canvas = new fabric.Canvas("longpic")
    canvas.setWidth(bgWidth / scale)
    canvas.setHeight(bgHeight / scale)
    canvas.setZoom(1 / scale)

    let bgCard
    let bgPicture

    bgCard = new fabric.Rect({
        width: bgWidth,
        height: bgHeight,
        // fill: "#ffffff",
        top: 0,
        left: 0,
        rx: 30,
        ry: 30,
    })

    let getColor = function () {
        let color = new SelectPool(colors).select()
        console.log("color", color);

        let cardColor = new fabric.Gradient({
            type: 'linear', // linear or radial
            gradientUnits: 'pencentage', // pixels or pencentage 像素 或者 百分比
            coords: { x1: 0, y1: 0, x2: bgWidth, y2: bgHeight }, // 至少2个坐标对（x1，y1和x2，y2）将定义渐变在对象上的扩展方式
            colorStops: colors[color],
        })

        return cardColor
    }

    bgCard.set("fill", getColor())
    canvas.add(bgCard)

    let colorBtn = document.getElementById("changeColor")
    colorBtn.onclick = function () {
        bgCard.set({
            "width": bgWidth,
            "height": bgHeight
        })
        if (bgPicture) {
            bgPicture.set({
                "width": 0,
                "height": 0
            })
        }
        bgCard.set("fill", getColor())
        canvas.renderAll()
    }

    async function getPicture() {
        await new Promise(async resolve => {
            fabric.Image.fromURL(await getImage(), (bg) => {
                bgPicture = bg

                let bgSize = formatWithOrHeight(bgWidth, bgHeight, bg.width, bg.height)
                bg.scaleToWidth(bgSize.width)
                bg.filters.push(new fabric.Image.filters.Blur({ blur: 0.02 }))
                bg.applyFilters()
                let l = (bgWidth - bgSize.width) / 2
                let t = (bgHeight - bgSize.height) / 2
                bg.set({
                    left: l,
                    top: t,
                    clipPath: new fabric.Rect({
                        width: bgWidth,
                        height: bgHeight,
                        originX: 'center',
                        originY: 'center',
                    })
                })

                canvas.add(bg)
                // canvas.setBackgroundImage(bg)
                canvas.renderAll()
                resolve()
            }, {
                crossOrigin: "anonymous"
            })
        })
    }

    let pictureBtn = document.getElementById("changePicture")
    pictureBtn.onclick = async function () {
        if (bgPicture) {
            let imgURL = await getImage()
            bgPicture.setSrc(imgURL, (bg) => {
                bgPicture = bg
                canvas.renderAll()
            }, {
                crossOrigin: "anonymous"
            })
        }

        if (!bgPicture) {
            await getPicture()
        }

        bgPicture.set({
            "width": bgWidth,
            "height": bgHeight
        })
        if (bgCard) {
            bgCard.set({
                "width": 0,
                "height": 0
            })
        }
        // bgPicture.set("fill", getPicture())
        // bgPicture.
        canvas.sendToBack(bgPicture)
        canvas.sendToBack(bgPicture)
        canvas.renderAll()
    }

    let card = new fabric.Rect({
        width: cardWidth,
        height: cardHeight,
        fill: "#ffffff",
        top: cardPlace.y,
        left: cardPlace.x,
        rx: 20,
        ry: 20,
    })

    let cardColor = new fabric.Gradient({
        type: 'linear', // linear or radial
        gradientUnits: 'pencentage', // pixels or pencentage 像素 或者 百分比
        coords: { x1: card.width * 0.417, y1: card.height * 0.232, x2: card.width, y2: card.height }, // 至少2个坐标对（x1，y1和x2，y2）将定义渐变在对象上的扩展方式
        // coords: { x1: card.width * 0.417, y1: card.height * 0.232, x2: card.width, y2: card.height }, // 至少2个坐标对（x1，y1和x2，y2）将定义渐变在对象上的扩展方式
        colorStops: [ // 定义渐变颜色的数组
            { offset: 0, color: 'rgba(255,255,255,.95)' },
            { offset: 1, color: 'rgba(255,255,255,.5)' },
        ],
    })
    card.set("fill", cardColor)

    canvas.add(card)

    // 处理文字部分
    for (let i in lines) {
        let mainText = new fabric.IText(lines[i], {
            editable: true,
            charSpacing: 0,
            textAlign: "left",
            fontSize: sentenceFontSize,
            top: sentencePlace.y + i * sentenceFontSize * 1.5,
            left: sentencePlace.x,
            fill: sentenceFontColor,
            fontWeight: 400,
        })

        canvas.add(mainText)
    }


    // 处理时间
    let timeTxt = formatTime()
    let timeEle = new fabric.IText(timeTxt, {
        top: timePlace.y,
        left: timePlace.x,
        fontSize: timeFontSize,
        fill: timeFontColor,
    })

    let nameEle = new fabric.IText(post.userName, {
        fontSize: nameFontSize,
        top: namePlace.y,
        left: namePlace.x,
        fontWeight: "normal",
        fontFamily: "SourceHanSansCN",
        fill: nameFontColor
    })

    let nameIDEle = new fabric.IText(post.nameID, {
        fontSize: nameIDFontSize,
        top: nameIDPlace.y,
        left: nameIDPlace.x,
        fill: nameIDFontColor
    })


    await new Promise(reslove => {
        fabric.Image.fromURL(post.logoUrl, ob => {
            ob.scaleToWidth(logoWidth)

            ob.set({
                left: logoPlace.x,
                top: logoPlace.y,
            })

            canvas.add(ob)
            reslove()
        })

    })

    await new Promise(reslove => {
        fabric.Image.fromURL(post.avatarUrl, avatar => {
            avatar.scaleToWidth(avatarWidth)

            avatar.set({
                left: avatarPlace.x,
                top: avatarPlace.y,
                clipPath: new fabric.Circle({
                    radius: avatar.width / 2,
                    originX: 'center',
                    originY: 'center',
                })
            })

            canvas.add(avatar)
            canvas.renderAll()
            reslove()
        })
    })

    canvas.add(timeEle)
    canvas.add(nameEle)
    canvas.add(nameIDEle)

    canvas.renderAll()

    canvas.on("mouse:up", function () {
        canvas.discardActiveObject()
        canvas.renderAll()
    })

    let btn = document.getElementById('downloadBtn')
    btn.onclick = function () {
        canvas.clone(function (c) {
            c.setWidth(bgWidth)
            const dataURL = c.toDataURL({
                width: bgWidth,
                height: bgHeight,
                left: 0,
                top: 0,
                quality: 1,
                format: 'png',
            });

            const link = document.createElement('a');
            let n = new Date()
            link.download = `share_${n.getFullYear()}_${n.getMonth()}_${n.getDate()}_${n.getHours()}_${n.getMinutes()}_${n.getSeconds()}.png`;
            link.href = dataURL;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
    }
    btn.innerText = "点击下载"
    document.body.appendChild(btn)

    async function copyToClipBoard() {
        await new Promise(async (reslove) => {

            canvas.clone(function (c) {
                c.setWidth(bgWidth)
                c.setHeight(bgHeight)
                
                c.toCanvasElement().toBlob(async (blob) => {
                    // debugger
                    await navigator.clipboard.write([new ClipboardItem({
                        [blob.type]: blob
                    })]).then(() => {
                        // 提示框
                        postMsg("notice", "picture copied ~")
                    }).catch(err => {
                        postMsg("notice", "copy picture fail ! please check console")

                        throw new Error(err)
                    })

                    reslove()
                })
            })
        })
    }

    let btnCopy = document.getElementById("copytoClipBoard")
    btnCopy.onclick = async function () {
        await copyToClipBoard()
    }

    let closeBtn = document.getElementById("closeBtn")
    closeBtn.onclick = function (e) {
        console.log("click it : ", window.parent[0])
        postMsg("remove")
    }
}


function formatTime() {
    let n = new Date()

    let str = `${n.getHours()}:${formatMinutes(n.getMinutes())} ${n.getHours() > 12 ? "PM" : "AM"}·${n.getDate()} ${monthName[n.getMonth()]}${n.getFullYear()}`
    return str
}

function formatMinutes(t) {
    let st = String(t).toString()
    if (st.length == 1) {
        return '0' + st
    }

    return st
}

function splitSentence(str, wordCount) {
    let res = []
    for (; str.length > wordCount;) {
        res.push(str.substring(0, wordCount))
        str = str.substring(wordCount, str.length)
    }
    res.push(str)

    return res
}

function formatWithOrHeight(minWidth, minHeight, realWidth, realHeight) {
    let widthScale = minWidth / realWidth
    let heightScale = minHeight / realHeight

    if (widthScale > heightScale) {
        return {
            width: realWidth * widthScale,
            height: realHeight * widthScale
        }
    }

    return {
        width: realWidth * heightScale,
        height: realHeight * heightScale
    }
}

async function getRandomImg(query) {
    // new unspl
    const response = await getRequest(
        `https://api.unsplash.com/photos/random?query=${query ?? ""}`
    );

    const url = response.urls.regular || response.urls.full;
    return url
}

async function getRequest(url) {
    let h = new Headers()
    h.set("authorization", "Client-ID a9eaa85454c8a42a028da28a1de3719b5688e6c8891cb9317dfc8bd124fda16c")
    const response = await fetch(url, {
        headers: h,
    });
    if (!response.ok) {
        throw new Error("Error performing GET request");
    }

    return await response.json()
}

function postMsg(type, data) {
    window.parent.postMessage({
        token: "__long_share_card_token",
        type: type,
        data: data
    }, '*')
}



window.onmessage = (e) => {
    let msg = e.data
    if (msg.token != window.msgToken) {
        console.error("postMessage wrong token err : ", e)
        return
    }

    switch (msg.type) {
        case "pong":
            break;
        case "newpost":
            window.pingLock = true
            renderPost(msg.data.sentence, msg.data.config)
            break;

    }

    console.log("got : ", e)
}
