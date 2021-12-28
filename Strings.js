/**
 STRINGS
One of the fundamental data types in Computer Science, strings are stored in 
memory as arrays of integers, where each character in a given string is mapped 
to an integer via some character-encoding standard like ASCII.

Strings behave much like normal arrays, with the main distinction being that, 
in most programming languages, strings are immutable, meaning that they can't 
be edited after creation. This also means that simple operations like appending 
a character to a string are more expensive than they might appear.

The canonical example of an operation that's deceptively expensive due to string 
immutability is the following:
*/
const Mystring = "this is a string";
 newstring = '';

for (const character in Mystring) newString += character;

/*
The operation above has a time complexity of O(n²) where n is the length of string, 
because each addition of a character to newstring creates an entirely new string 
and is itself an O(n) operation. Therefore, n O(n) operations are performed, 
leading to an O(n²) time-complexity operation overall.
 */