'use strict';

// YOU KNOW WHAT TO DO //

/**
 * each: Designed to loop over a collection, Array or Object, and applies the action 
 * Function to each value in the collection.
 * 
 * @param {Array or Object} collection The collection over which to iterate.
 * @param {Function} action The Function to be applied to each value in the 
 * collection
 */
function each(collection, action) {
    if(Array.isArray(collection)) {
        for(var i = 0; i < collection.length; i++) {
            action(collection[i], i, collection);
        }
    } else {
        for (var key in collection) {
            action(collection[key], key, collection);
        }
    }
}
module.exports.each = each;

/**
 * identity: Designed to return any value that is given unchanged.
 * 
 * @param {anything} val  The value that is being passed to the function.
 * @return Returns value unchanged.
 * 
 * */
 
function identity(val){
    return val;
}
module.exports.identity = identity;

/**
 * typeOf: Designed to return the type of a value as a string.
 * 
 * @param {string|array|object|undefined|number|boolean|null|function} val The value being checked to find it's type.
 * @return Returns the type of value as a string.
 * 
 * */
 
function typeOf(val){
    if(Array.isArray(val)){
        return 'array';
    } else if (val === null) {
        return 'null';
    } else {
        return typeof(val);
    }
}
module.exports.typeOf = typeOf;

/**
 * first: Designed to return the first value or values of an array depending on the number input.
 * 
 * @param {Array} arr The array being used to find its first index.
 * @param {Number} num The amount that determines how many indexes of the array to return.
 * @return Returns an a new array depending on the input.
 * 
 **/
 
function first(arr, num){
    if(!Array.isArray(arr)){
        return [];
    } 
    if (!num || num === isNaN ){
        return arr[0];
    }
    if (num < 0){
        return [];
    }
    if (num > arr.length){
        return arr;
    }
    else {
        return arr.splice(0, num);
    }
}
module.exports.first = first;

/**
 * last: Designed to return the last value or values of an array depending on the number input.
 * 
 * @param {Array} arr The array being used to find its last index.
 * @param {Number} num The amount that determines how many indexes of the array to return.
 * @return Returns an a new array depending on the input.
 *  
 * */
 
 function last(arr, num){
    if(!Array.isArray(arr)){
        return [];
    } 
    if (!num || num === isNaN ){
        return arr[arr.length - 1];
    }
    if (num < 0){
        return [];
    }
    if (num > arr.length){
        return arr;
    }
    else {
        return arr.splice(arr.length - num, num);
    }
}
module.exports.last = last;


/**
 * indexOf: Designed to return the index of a value's first oucrrance in an array.
 * 
 * @param {Array} arr The array being used to find the first occurance of a value.
 * @param {value} val The value that is being searched for in the array. 
 * @return val Returns a number index.
 * 
 * */
function indexOf(arr, val){
    for(let i = 0; i < arr.length; i++){
       // val === arr[i] ?  i :  -1;
       if(arr[i] === val){
           return i;
       } 
    }
    return -1;
}
module.exports.indexOf = indexOf;

/**
 * filter: Designed to return a new array for which calling the function returned true.  
 * 
 * @param {array} The array the function being used to find its true or truthy values.
 * @param {function} The function that is testing the values from the array to see if they are true.
 * @return Return a new array of all the true values.
 *  
 * */
 
function filter(arr, test){
    let output = [];
    each(arr, function(val, position, collection){
        /**
         * Harvey: anytime you need to do:
         *    if([someExpression] === true) {...
         * you can just do:
         *    if([someExpression]){...
         * because ( [someExpression] === true ) evauluates to true or false, which [someExression] is already a boolean
         */
        if(test(val, position, collection) === true){
            output.push(val); 
        } 
    });
    return output;
}
module.exports.filter = filter;
 
/**
 *reject: Designed to return a new array in which calling the function on an array returned false.   
 * @param {array} The array the function being used to find its false or falsy values.
 * @param {function} The function that is testing the values from the array to see if they are false.
 * @return Return a new array of all the false values.
 * 
 * */ 
function reject(arr, test){
    let output = [];
    filter(arr, function(val, position, collection){if(test(val, position, collection) === false){
      output.push(val); 
    }});
    return output;
 } 
 module.exports.reject = reject;
 
 
/**
 * partition: Designed to return an array made up of two sub arrays, one with all falsy values and the other with true.  
 * 
 * @param {array} The array the being tested to see which values are true and which are false.
 * @param {function} The function that is testing the array to seperate the true values from the false ones.
 * @return The new array being reurned with two sub arrays, one with all of the true values and the other with all of the false values.
 * 
 * */ 
 
 /**
  * Harvey:
  * use filter and reject for this one
  *
  */
function partition(arr, test){
    let truthyOutput = [];
    let falseyOutput = [];
    let joinedArray = [];
    each(arr, function(val, position, collection){
        if(test(val, position, collection) === true){
            truthyOutput.push(val); 
        } 
    });
    filter(arr, function(val, position, collection){if(test(val, position, collection) === false){
      falseyOutput.push(val); 
    }});
    joinedArray.push(truthyOutput, falseyOutput);
    
    return joinedArray;
} 
module.exports.partition = partition; 
 
/**
 * unique: Designed to return a new array with all duplicates removed.
 * 
 * @param {array} arr The array being tested to see if there are any duplicates. 
 * @return {array} Returns a new array without any duplicates, if there were any.
 * 
 * */ 
function unique(arr){
    let output = [];
    each(arr, function(val, pos, collection){
       if(indexOf(output, val) === -1){
           output.push(val);
       } 
    });
    
    return output;
}
module.exports.unique = unique;


/**
 * map: Designed to loop over a collection and return an array with all of the saved values.
 * 
 * @param {array|object} collection The array or object that is being looped over to apply the function to and be returned.
 * @param {function} The function that is being applied to all of the values in an array or object.
 * @return Returns an array with all of the saved values.
 * 
 * */
function map(collection, test){
    let output = [];
    each(collection, function(val, position, collection) {
        output.push(test(val, position, collection));
    });
    return output;
}
module.exports.map = map;

 
/**
 * pluck: Designed to return an array with all of the values of the properties in an array.   
 * 
 * @param {array} arr The collection being mapped to return all of its properties.
 * @param property The properties being accessed to retrieve its values.
 * @return Returns an array of all of the values accesed from their properties.
 * 
 * */ 
function pluck(arr, property){
    let output = [];
    /**
     * Harvey: don't mutuate parameters in functional programming i.e: don't push() to collection.
     * map already retuns an array. use that instead.
     *
     */
    map(arr, function(val, position, collection){
        output.push(collection[position][property]);
    });
    return output;
} 
module.exports.pluck = pluck;


/**
 * contains: Designed to check if an array contains a specific value.    
 * 
 * @param {array} arr The array that is being checked for the value.
 * @param {value} val The value that is being checked for in an array.
 * @return Returns true if theh value is in the array and false if it isn't.
 * 
 * */
function contains(arr, val){
    // if (arr.includes(val) === true){
    //     return true;
    // } else {
    //     return false;
    // }
    /**
     * Harvey: use your .indexOf() function here 
     *
     */
    return arr.includes(val) === true ? true : false;
}
module.exports.contains = contains;


/**
 * every: Designed to loop over a collection and check if it's values evaluate to true or false, and return true if all are true and false otherwise.   
 * 
 * @param {array|object} collection The collection being looped over to test it's values to see if they are true or false.
 * @param {function} test The function that is being applied to test all values in the collection.
 * @return Returns true if all values evaluated to true and false otherwise.
 * 
 * */
function every(collection, test){
    let output = true;
    if(test === undefined){
        test = identity;
    }
    each(collection, function(val, position, collection) {
         if(test(val, position, collection) === false){
            output = false;
        }
    });
    return output;
}
module.exports.every = every;

/**
 * some: Designed to loop over a collection and check if it's values evaluate to true or false, and return true if at least one value is true and false otherwise.   
 * 
 * @param {array|object} collection The collection being looped over to test it's values to see if they are true or false.
 * @param {function} test The function that is being applied to test all values in the collection.
 * @return Returns true if at least one value evaluates to true and false otherwise.  
 * 
 * */
function some(collection, test){
    let output = false;
    if(test === undefined){
        test = identity;
    }
    each(collection, function(val, position, collection){
        if(test(val, position, collection)){
            output = true;
        }
    });
    return output;
}
module.exports.some = some;


/**
 * reduce: Designed to loop over an array, apply a function and return a combined value.
 * 
 * @param {array} arr The collection being looped over to apply the function to.
 * @param {function} test The function that you are applying to the vales of your collection.
 * @param {number} seed The number, if given, that you start with to start calling your function on.
 * 
 * */
function reduce(arr, test, seed){
    let reduced;
    if(seed === undefined){
        reduced = arr[0];
        
        each(arr, function(val, position, collection){
            //position === 0 ? reduced = reduced : reduced = test(reduced, val, position);
            if(position === 0){
                reduced = reduced;
            } else {
                reduced = test(reduced, val, position);
            }
        });
    }
    else { 
        reduced = seed;
        each(arr, function(val, position, collection){
            reduced = test(reduced, val, position);
        });
    }
    return reduced;
}
module.exports.reduce = reduce ;


/**
 * extend: Designed to return an updated object after the function is called on all of its values.  
 * 
 * @param {object} object1 The initial collection to be updated.
 * @param {object} object2 The collection that is used to overwrite the initial collection.
 * @return Returns the updated collection.
 * 
 * */
function extend(object1, object2){
    each(arguments, function(obj, position, collection){
        each(obj, function(val, key, obj){
            object1[key] = val;  
        });
    });
    return object1;
}
module.exports.extend = extend;






 
 
 
 