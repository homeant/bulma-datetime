import "bulma"
import dateTime from "../src/index";

new dateTime(document.getElementById("input"),{
    type:"datetime",
    format:"YYYY-MM-DD HH:mm:ss"
})