var totalAttempt = 0;
var correctAttempt = 0;

function randomNumberGeneratorMoreThan20(noOfDigits){
    let randomNumber = Math.floor(Math.random()*noOfDigits + 1);
    if(randomNumber < 20 ){
        randomNumber += 10;
    }
    return(randomNumber);
}


function wrongAnswerOperation(correctAnswer){

    //Trial Code using for loop
    let iniArr =[correctAnswer];

    for(let i = 0; i<3; i++){
        function operatorSelector(){
            let operator = Math.floor(Math.random()* 2 + 1);
            return(operator);
        }
    
    
    
        function baseNumberGenerator(){
            let baseNumber = Math.floor(Math.random()* 10 + 1);
            baseNumber = baseNumber* 10;
            return(baseNumber);
        }
    
        function wrongAnswerGenerator(){
    
            let operator = operatorSelector();
            let baseNumber = baseNumberGenerator();
            
    
            if(operator === 1){
                let wrongAnswer = correctAnswer + baseNumber;
                return(wrongAnswer);
            
            }
            else{
                let wrongAnswer = correctAnswer - baseNumber;
                return(wrongAnswer);
                
            }
           
        }
    
        let optionGenerated = wrongAnswerGenerator();
        iniArr.push(optionGenerated);
        
    }
    return(iniArr);
}


function answerSuffle(arr){
    // let arr = initialAnswerArray;
    // console.log("Initail Array: " + arr);
    var newArray = [];
    var count = arr.length;
    for(i=count; i>0; i--){
        let position = Math.floor(Math.random() * i );
        newArray.push(arr[position]);
        arr.splice(position,1);
        // console.log("New Array: " + newArray);
    }

    // console.log("New Array: " + newArray);
    return(newArray);
}

function setAnswerKeys(suffledArray){
    $(".option1").text(suffledArray[0]);
    $(".option2").text(suffledArray[1]);
    $(".option3").text(suffledArray[2]);
    $(".option4").text(suffledArray[3]);

}

function addSelectedClass(){
    $(".answer").click(function(){
        $(".selected").removeClass("selected");
        $(this).addClass("selected");
        
    });
}

function answerCheck(correctAnswer){
    //EventListiner for checking answer
    $(".answer-check-btn").click(function(){

        totalAttempt += 1;
        
        //closes event listiner in answer options
        $(".answer").unbind();

        let selectedAnswer = $(".selected").text();
        console.log("Selected: " + selectedAnswer);
        console.log("Correct Answer: " + correctAnswer);

        //checking if answer is correct
        if(selectedAnswer == correctAnswer){
            correctAttempt += 1;
            $(".selected").addClass("correct-selected");
            $(".answer-check-btn").text("Correct Answer").addClass("result-true");
        }else{
            $(".selected").addClass("wrong-selected");
            $(".answer-check-btn").text("Wrong Answer").addClass("result-false");
        }
        $(".next-question").removeClass("hidden");
        
        $(".total-attempt").text("Total Attempt: " + totalAttempt);
        $(".correct-attempt").text("Correct Attempts: " + correctAttempt);

        $(".answer-check-btn").unbind();
        
    });

}

function nextQuestion(){
    $(".next-question").click(function(){
        //remove class added after the main function was called
        $(".selected").removeClass("selected");
        $(".correct-selected").removeClass("correct-selected");
        $(".wrong-selected").removeClass("wrong-selected");
        $(".answer-check-btn").text("Check Answer").removeClass("result-true");
        $(".answer-check-btn").text("Check Answer").removeClass("result-false");

        //add the class that were removed after the main function was called
        $(".next-question").addClass("hidden");
        $(".next-question").unbind();
        console.log("\nNext Question: ");

        mainFunction();

    });
}

function multiplyGame(){
    let firstNumber = randomNumberGeneratorMoreThan20(99);
    let secondNumer = randomNumberGeneratorMoreThan20(99);
    console.log("First: " + firstNumber);
    console.log("Second: " + secondNumer);
    let correctAnswer = firstNumber * secondNumer;

    // let option2 = wrongAnswerOperation(correctAnswer);
    // let option3 = wrongAnswerOperation(correctAnswer);
    // let option4 = wrongAnswerOperation(correctAnswer);

    console.log("CA: " + correctAnswer);
    // console.log("02: " + option2);
    // console.log("03: " + option3);
    // console.log("04: " + option4);

    //var initialAnswerArray = [correctAnswer, option2, option3, option4];

    let initialAnswerArray = wrongAnswerOperation(correctAnswer);
    console.log("initialArray: " + initialAnswerArray);

    let question = "What is the MULTIPLY result of " + firstNumber + " and " + secondNumer + ".";
    $(".question-section").text(question);
 
    //initalAnswerArray is passed as arr 
    let suffledArray = answerSuffle(initialAnswerArray);
    console.log(suffledArray);
    setAnswerKeys(suffledArray);
    addSelectedClass();
    answerCheck(correctAnswer);
    nextQuestion();
}


// Left to do : 
// 1: Set the question
// 2. Answer selection and checking



//main function for choosing the correct game function depending on the game-type class on HTML doc.
function mainFunction(){
    let gameType = $(".game-type").text();
    switch(gameType){
        case "Multiply":
            multiplyGame();
            console.log("Game Type: " + gameType);
            break;
        default:
            console.log("Default Exit");
            break;
    }
}

mainFunction();