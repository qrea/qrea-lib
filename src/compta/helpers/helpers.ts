export function numerosCompteEquals(s1: string, s2: string){

    if(s1 == s2) return true;
    
    if(s1.length > s2.length){
        return s1.substring(0, s2.length - 1) === s2;
    }
    
    if(s1.length < s2.length){
        return s2.substring(0, s1.length - 1) === s1;
    }

}
