export function numerosCompteEquals(s1: string, s2: string){

    // console.log('%s - %s', s1, s2);    

    if(s1.length > s2.length){
        s1 = s1.substring(0, s2.length);
    }
    
    if(s1.length < s2.length){
        s2 = s2.substring(0, s1.length);
    }

    // console.log('%s - %s', s1, s2);

    if(s1 == s2) return true;

    return false;

}
