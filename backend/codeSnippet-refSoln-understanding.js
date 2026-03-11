
// JAVASCRIPT:

// Code Snippet (Starter Template — shown to user)
const fs = require('fs');

function multiplyTwoNumbers(a, b) {
    // Write your code here

}

const input = fs.readFileSync(0, 'utf-8').trim();
const [a, b] = input.split(' ').map(Number);
console.log(multiplyTwoNumbers(a, b));

// Reference Solution (Hidden Correct Answer)
const fs = require('fs');

const input2 = fs.readFileSync(0, 'utf-8').trim();
const [a2, b2] = input2.split(' ').map(Number);

console.log(a2 * b2);




// PYTHON:

// Code Snippet (Starter Template — shown to user)
// def multiply_two_numbers(a, b):
//     # Write your code here


// import sys
// input_line = sys.stdin.read()
// a, b = map(int, input_line.split())
// print(multiply_two_numbers(a, b))


// Reference Solution (Hidden Correct Answer)
// import sys

// input_line = sys.stdin.read()
// a, b = map(int, input_line.split())

// print(a * b)

// JAVA:
// Code Snippet (Starter Template — shown to user)
// import java.util.Scanner;

// public class Main {

//     public static int multiplyTwoNumbers(int a, int b) {
//         // Write your code here
//         // Return the product of a and b
//         return a * b;
//     }

//     public static void main(String[] args) {
//         Scanner sc = new Scanner(System.in);
//         int a = sc.nextInt();
//         int b = sc.nextInt();
//         System.out.println(multiplyTwoNumbers(a, b));
//     }
// }
// Reference Solution (Hidden Correct Answer)
// import java.util.Scanner;

// public class Main {
//     public static void main(String[] args) {
//         Scanner sc = new Scanner(System.in);
//         int a = sc.nextInt();
//         int b = sc.nextInt();
//         System.out.println(a * b);
//     }
// }