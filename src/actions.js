export const ajouter = (recipe)=>{
    return {type:"ajouter",payload:recipe}
}

export const supprimer = (recipe)=>{
    return {type:"supprimer",payload:recipe}
}
