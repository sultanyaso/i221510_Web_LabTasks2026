const checkPass = (marks) => {
    if (marks.some(m => m >= 50))
        return "Pass";
    else
        return "Fail";
};

console.log(checkPass([20, 30, 40]));