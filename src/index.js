function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {


    function StringToArray(str){
        if(/\s/.test(str)){
            var arr = str.split(' ');
            arr.forEach(element => {
                if(!/^\d*$/.test(element) && element != '+' && element != '-' && element != '*' && element != '/' && element != ')' && element != '(' ){
                throw new Error("ExpressionError: Brackets must be paired");
                }
            });
        } else{
            var arr = str.split('');
        }
        arr = arr.filter(function(element) {
            return !(element == '');
        });
        return arr;
    }

    function myMath(numFirst, numSecond, char){
        if(char == '*'){
            return numSecond * numFirst;
        }else if(char == '/'){
            if(numFirst == 0){
                throw new Error("TypeError: Division by zero.")
            }
            return numSecond / numFirst;
        }else if(char == '+'){
            return +numSecond + +numFirst;
        }else if(char == '-'){
            return numSecond - numFirst;
        }
    }

    var exprArr = StringToArray(expr);

    var stackNumber = [], stackSign = [];
    var Priority ={
        '-': 1,
        '+': 1,
        '*': 2,
        '/': 2
    }

    for(var i = 0; i < exprArr.length; i++){
        if(Number(exprArr[i])>= 0){
            stackNumber.push(exprArr[i])
        }else if(exprArr[i] == '('){
            stackSign.push(exprArr[i]);
        }else{
                if(stackSign[stackSign.length-1] == '('){
                    if(exprArr[i] == ')'){
                        stackSign.pop();
                    }else{
                    stackSign.push(exprArr[i]);
                    }
                }else if(exprArr[i] == ')'){
                    var first = stackNumber.pop();
                    var second = stackNumber.pop();
                    var sign = stackSign.pop();
                    i--;
                    stackNumber.push(myMath(first, second, sign));
                }else if(stackSign.length == 0){
                    stackSign.push(exprArr[i]);
                }else if(Priority[exprArr[i]] > Priority[stackSign[stackSign.length-1]]){
                    stackSign.push(exprArr[i]);
                }else{
                    var first = stackNumber.pop();
                    var second = stackNumber.pop();
                    var sign = stackSign.pop();
                    stackNumber.push(myMath(first, second, sign));
                    i--;
                }
        }
    }
    if(stackNumber.length > 1){
        for(var j = 0; j < stackNumber.length; j++){
            var first = stackNumber.pop();
            var second = stackNumber.pop();
            var sign = stackSign.pop();
            stackNumber.push(myMath(first, second, sign));
        }
    }
    
    if(stackNumber.length == 1){

        var result = parseFloat(stackNumber[0]);
        return result;
    }else{
        throw new ExpressionError("ExpressionError: Brackets must be paired");
    }
    

}

module.exports = {
    expressionCalculator
}