function numerosCompteEquals(s1, s2) {
    // console.log('%s - %s', s1, s2);    
    if (s1.length > s2.length) {
        s1 = s1.substring(0, s2.length);
    }
    if (s1.length < s2.length) {
        s2 = s2.substring(0, s1.length);
    }
    if (s1 == s2)
        return true;
    return false;
}
exports.numerosCompteEquals = numerosCompteEquals;
