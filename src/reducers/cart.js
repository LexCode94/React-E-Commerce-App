const initialState = () => {
    if(localStorage.getItem('items')){
        return JSON.parse(localStorage.getItem('items'))
    } else {
        return []
    } 
}



const cartReducer = (state = initialState(), action) => {
    switch(action.type){
        case 'ADD':
            return [...state, action.payload]
        case 'REMOVE':
            const index = state.indexOf(action.payload)
            if(index > -1) {state.splice(index, 1)}
            return state
        case 'CLEAR':
            state = []
            return state
        default:
            return state
    }
}

export default cartReducer;