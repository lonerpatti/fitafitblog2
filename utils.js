exports.checaIdade = (idade) =>{
    return new Promise((resolve, reject) => {
        setTimeout(() => idade >= 18 ? resolve(true) : reject(false), 2000);
    });
}