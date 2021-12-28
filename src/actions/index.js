export const add = (item) => {
    return {
        type: 'ADD',
        payload: item
    }
}

export const remove = (item) => {
    return{
        type: 'REMOVE',
        payload: item
    }
}

export const clear = () => {
    return {
        type: 'CLEAR',
    }
}

export const login = () => {
    return {
        type: 'LOGIN',
    }
}

export const logout = () => {
    return {
        type: 'LOGOUT',
    }
}