const keys = document.querySelectorAll([".keys .key", ".keys .key-action", ".keys .key-operator"]);
const display_input = document.querySelector(".display .input");
const display_output = document.querySelector(".display .output");

let input = "";

for( let key of keys){
    const value = key.dataset.key; 

    key.addEventListener('click', () =>{
        if (value == 'clear'){
            input = "";
            display_input.innerHTML = ""; 
            display_output.innerHTML = "";  }

            else if (value == "backspace"){
                input = input.slice(0, -1);
                display_input.innerHTML =  cleanInput(input); }

            else if (value == "="){
                let result = eval(PrepareInput(input));

                display_output.innerHTML = cleanOutput(result) ;
            }
            else if(value == "brackets"){
                if(
                input.indexOf("(") == -1 ||
                input.indexOf("(") != -1 &&
                input.indexOf(")") != -1 &&
                input.lastIndexOf("(") < input.lastIndexOf("(") ){
                    input += "(" ;  }

                else if(
                    input.indexOf("(") != -1 &&
                    input.indexOf(")") == -1 ||
                    input.indexOf("(") != -1 &&
                    input.indexOf("(") != -1 &&
                    input.lastIndexOf("(") > input.lastIndexOf(")")
                    )
                        {input += ")"; 
                    }  

                display_input.innerHTML =  cleanInput(input);
            }   else {
                if (ValidateInput(value)){
                    input += value;
                    display_input.innerHTML =  cleanInput(input);
                }
            }
        })
}

function cleanInput(input){
    let input_array = input.split("");
    let input_array_length = input_array.length;

    for(let i=0; i<input_array.length; i++){
        if (input_array[i] == "*"){
            input_array[i] = " × " ; 
        }

        else if(input_array[i] == "/"){
            input_array[i] = " ÷ "; 
        }

        else if(input_array[i] == "-"){
            input_array[i] = " - "; 
        }

        else if(input_array[i] == "+"){
            input_array[i] = " + "; 
        }

        else if(input_array[i] == "("){
            input_array[i] = "("; 
        }

        else if(input_array[i] == ")"){
            input_array[i] = ")"; 
        }

        else if(input_array[i] == "%"){
            input_array[i] = " % "; 
        }
    }

    return input_array.join("");
}

function cleanOutput (output) {
    
    let output_string = output.toString();
    let decimal = output_string.split(".")[1];
    console.log("decimal", output_string.split("."))
    output_string = output_string.split(".")[0];

    let output_array = output_string.split("");
    

    if (output_array.length > 3){
        for(let i = output_array.length -3; i> 0; i-=3){
            output_array.slice( i, 0 , ",");
        }
        
    }

    if (decimal){
        output_array.push(".");
        output_array.push(decimal);
    }

    return output_array.join("");


}

function ValidateInput (value){
    let last_input = input.slice (-1);
    let operator = ["+", "-", "*", "/", "="];

    if( value == "." && last_input == "."){
        return false;
    }

    if (operator.includes(value)) {
        if (operator.includes(last_input)) {
            return false;}
            else { return true; }
    }

    return true;
}

function PrepareInput(input){
    let input_array = input.split("");

    for(let i = 0; i < input_array.length; i++){
        if (input_array[i] == "%"){
            input_array[i] = "/100";0
        }
    }

    return input_array.join("");
}
