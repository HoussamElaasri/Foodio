const initialState = {
  recipes: []
}


export const reducer = (state=initialState,action)=>{
    switch (action.type) {
    case "ajouter": {
      const r = action.payload
      const exists = state.recipes.some(x => x.id === r.id)
      if (exists) return state
      return { ...state, recipes: [...state.recipes, r] }
    }
    case "supprimer": {
      const id = parseInt(action.payload)
      return { ...state, recipes: state.recipes.filter(c => c.id !== id) }
    }
    default:
      return state
  }
}
