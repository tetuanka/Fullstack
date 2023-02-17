import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const w = Number(req.query.weight);
  const h = Number(req.query.height);
  if(isNaN(w)==true || isNaN(h)==true){
  res.send({
      error: "malformatted parameters"
      });
  return;
  }
  res.send({
    weight: w,
    height: h,
    bmi: calculateBmi(h,w)
  });
});

app.post('/exercises', (request, response) => {

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = request.body;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!target || !daily_exercises) {
    response.send({error: "parameters missing"});
  }
  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(target, daily_exercises);
  
  if(typeof(target)!='number' || isNaN(result.average)==true){
    response.send({
        error: "malformatted parameters"
        });
    }

  response.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});