function toggle(store) {
    store.dispatch('TOGGLE')
}
function setUser({dispatch},userName){
    dispatch('SETUSER',userName)
}

function pop({dispatch},para) {
    dispatch('POP',para)
}

export {
  toggle,setUser, pop
}