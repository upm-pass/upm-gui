function search ()
{
    let search_key_word = document.getElementById("search").value
    
    if (search_key_word) {
        if (config.get(`passwords.${search_key_word}`)) {
            document.getElementById("passwords").innerHTML = ""
            document.getElementById("passwords").innerHTML += CreatePasswordElement(search_key_word)
        } else {
            notification("red", "error", "no domain with the name: " + search_key_word)
        }
    } else {
        notification("red", "error", "search form is empty!")
    }
}