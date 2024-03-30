#! /usr/bin/env node 
import inquirer from "inquirer";
import chalk from "chalk";
let currentBalance = 10000;
let pinCode = 2244;
console.log(chalk.greenBright("\t\n//////////// ATM Machine ///////////////// \t\n"));
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: "Enter your pinCode !"
    }
]);
///condition if else 
if (pinAnswer.pin === pinCode) {
    console.log(chalk.italic.yellowBright('Correct! pin code'));
    let operator = await inquirer.prompt({
        name: "operation",
        type: "list",
        message: "choose your option!",
        choices: ["currentBalance", "withDraw", "fastCash", "Exit"]
    });
    /////question 1
    if (operator.operation === "currentBalance") {
        console.log(chalk.italic.magentaBright `your current balance is limited: ${currentBalance}`);
    }
    /////question 2
    else if (operator.operation === "withDraw") {
        let amountAns = await inquirer.prompt({
            name: "amount",
            type: "number",
            message: "Enter your amount withDraw: ",
            transformer: (input) => {
                // Use for changing the color of the user input.
                return chalk.italic.redBright(input);
            }
        });
        if (amountAns.amount < currentBalance) {
            currentBalance -= amountAns.amount,
                console.log(chalk.bgWhiteBright(`your remaining Balance is : ${currentBalance}`));
        }
        else if (amountAns.amount > currentBalance) {
            console.log(chalk.italic.bgMagenta(`your balance does'nt match ! \n your current balance is : ${currentBalance} `));
        }
    }
    /////question 3
    else if (operator.operation === "fastCash") {
        let cashAmount = await inquirer.prompt({
            name: "cash",
            type: "rawlist",
            message: "choose your Account",
            choices: ["1000", "2000", "5000", "10000"]
        });
        currentBalance -= cashAmount.cash;
        console.log(chalk.italic.blueBright(`your remaining balance is : ${currentBalance}`));
    }
    else if (operator.operation === "Exit") {
        console.log(chalk.italic.magentaBright("Ok bye !"));
    }
}
else if (pinAnswer.pin !== pinCode) {
    console.log(chalk.red('Incorrect Pin code please try again !'));
}
;
