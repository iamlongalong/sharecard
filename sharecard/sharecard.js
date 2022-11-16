let msgToken = "__long_share_card_token"

function sharecard(tp, input) {
    // debugger
    let i = window.document.createElement("iframe")
    i.src = input.sharecard_index || "https://static.longalong.cn/sharecard/v1/index.html"
    i.width = "0px"
    i.height = "0px"
    i.allow = "clipboard-write"
    i.style = "position: absolute; top: 50%; margin-top: -20%; left: 50%; margin-left: -20%;z-index: 9999; background: white;"
    
    let view = app.workspace.getActiveFileView()
    let sel = view.editor.getSelection()
    window.document.body.appendChild(i)

    let targetWindow

    window.onmessage = function (e) {
        let msg = e.data
        // console.log("go msg from console : ", e.data)    
        if (msg.token == msgToken) {
            if (msg.type == "ping") {
                targetWindow = e.source
                window.tar = targetWindow
                // targetWindow.postMessage({
                //     token: msgToken,
                //     type: "pong",
                //     data: {}
                // }, '*')

                setTimeout(function() {
                    let d = {
                        sentence: sel,
                        config: input
                    }
                    targetWindow.postMessage({
                        token: msgToken,
                        type: "newpost",
                        data: d
                    }, '*')

                    i.width = "775px"
                    i.height = "565px"
                }, 1000)
                return
            }

            if (msg.type == "remove") {
                setTimeout(function () {
                    window.document.body.removeChild(i)
                }, 1000)
                return
            }

            if (msg.type == "notice") {
                let notice = new window.Notice()
                notice.setMessage(msg.data)
                setTimeout(notice.hide, 1500)
                return
            }
        }
    }

    return sel
}


module.exports = sharecard;
