document.addEventListener("keydown", (key) => {
    if (key.ctrlKey && key.key == 'f') {
        document.getElementById("search").focus()
    }
    if (key.ctrlKey && key.key == 'd') {
        if (!document.getElementById("prompt"))
            add()
    }
})