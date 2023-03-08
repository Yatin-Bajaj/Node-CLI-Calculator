#!/usr/bin/env node
const yargs = require('yargs/yargs');

const { argv } = yargs(process.argv.slice(2))
    .coerce('_', args => {
        return args.map(arg => {
            const num = Number(arg);
            if (isNaN(num)) {
                console.error('Numbers must be provided and must be numeric');
                process.exit(1)
            }
            return num;
        })

    })
    .usage('Usage: --operation <operation name> <values>')
    .example("node index.js --operation addition 1 2 3","\nReturns Result = 6")
    .option("operation", {
        describe: "Operations available", type: "string",
        choices: ['addition', 'subtraction', 'multiply', 'division'],
        demandOption: true
    })


printWelcome();
const operation = argv.operation;
const operand = argv._;


if (operation === "addition") {
    let result = operand.reduce((sum, currentNum) => sum + currentNum, 0);
    printResult(result)

} else if (operation === "subtraction") {

    if (operand.length > 2) {
        printError("Subtraction Only accept 2 numbers")
        return;
    }
    const result = operand[0] - operand[1]
    printResult(result)

} else if (operation === "multiply") {
    let result = operand.reduce((multiply, currentNum) => multiply * currentNum, 1);
    printResult(result)

} else if (operation === "division") {

    if (operand.length > 2) {
        printError("Division Only accept 2 numbers")
        return;
    }
    if (operand[1] == 0) {
        printError("Denominator should not be zero")
        return;
    }
    let result = (operand[0] / operand[1]).toPrecision(4)
    printResult(result)

} else {
    printError(`Invalid Operation`);
}


async function printWelcome(result) {
    let chalk = await getChalk()
    let welcomeTemplate = `
        Hi there!,  Node CLI Calculator this side...........
                Computing.......................\n
    `
    process.stdout.write(chalk.bgYellow.gray.bold(welcomeTemplate))
}

async function printResult(result) {
    let chalk = await getChalk()
    process.stdout.write(chalk.blue.bold(`Result = ${result}`))
}

async function printError(errorMsg) {
    let chalk = await getChalk()
    const error = chalk.bold.red;
    process.stdout.write(error(`Error = ${errorMsg}`))
}
async function getChalk() {
    return (await import('chalk')).default;

}
// https://developer.okta.com/blog/2019/06/18/command-line-app-with-nodejs
// https://alexewerlof.medium.com/node-shebang-e1d4b02f731d

