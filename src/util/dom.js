const find =(selector)=>{

}

const createElement = html => {
    const tempContainer = document.createElement('div')
    tempContainer.innerHTML = html
    return tempContainer.firstElementChild
}

export default {
    find,
    createElement
}

export {
    find,
    createElement
}
