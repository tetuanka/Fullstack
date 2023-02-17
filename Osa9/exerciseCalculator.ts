interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = ( a1: number, a: Array<number>): Result => {
    const target = a1;
    let counter = 0;
    let count = 0;
    for (const obj of a) {
        console.log(obj);
        count = count+obj;
      if (obj != 0) counter++;
    }
    let success = true;
    if(count/a.length<target) success = false;
    let rate = 0;
    if((count/a.length)/target < 0.8) rate = 1;
    else if((count/a.length)/target < 1) rate = 2;
    else if((count/a.length)/target >= 1) rate = 3;
    let description = "";
    if (rate === 1) description = 'need to improve';
    if (rate === 2) description = 'not too bad but could be better';
    if (rate === 3) description = 'very good';
    
    return {
        periodLength: a.length,
        trainingDays: counter,
        success: success,
        rating: rate,
        ratingDescription: description,
        target: target,
        average: count/a.length
    };
};

const c = Number(process.argv[2]);

const hours = [];

const len = process.argv.length;
for(let i=3; i<len; i++){
    hours.push(parseInt(process.argv[i]));
}
const d: Array<number> = hours;

console.log(calculateExercises(c, d));

export default calculateExercises;