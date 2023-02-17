const calculateBmi = (a: number, a1: number) => {
    const bmi = a1/((a/100)*(a/100));
    if (bmi<16) return "Underweight (Severe thinness)";
    else if(bmi<16.9) return "Underweight (Moderate thinness)";
    else if(bmi<18.4) return "Underweight (Mild thinness)";
    else if(bmi<24.9) return "Normal (Healthy weight)";
    else if(bmi<29.9) return "Overweight (Pre-obese)";
    else if(bmi<34.9) return "Obese (Class I)";
    else if(bmi<39.9) return "Obese (Class II)";
    return "Obese (Class III)";
};

const a = Number(process.argv[2]);
const b = Number(process.argv[3]);

console.log(calculateBmi(a, b));

export default calculateBmi;
