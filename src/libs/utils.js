export const localRead = (key)=>{
    return localStorage.getItem(key) || ''
}
export const localSave = (key, value) => {
    localStorage.setItem(key, value)
}