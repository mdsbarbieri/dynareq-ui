function removeSpecialChar(value) {
    if (!value) {
        return;
    }
    return value.replace(/[\s`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
}



export { removeSpecialChar };