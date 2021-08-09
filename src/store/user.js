import { localSave, localRead,} from '@/libs/utils'
const state = {
    local: localRead('local'),
}
const mutations = {
    SETLOCAL(state, lang){
        state.local = lang
        localSave('local', lang)
    }
}

const actions = {

}

export default {
    state,
    mutations,
    actions,
}