import { isReadable } from "stream";

const App = () => {
  const courseName = "Half Stack application development";

  interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
  }

  interface CourseDPart extends CoursePartBase {
    description: string;
  }
  
  interface CourseNormalPart extends CourseDPart {
    type: "normal";
  }
  
  interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
  }

  interface CourseSubmissionPart extends CourseDPart {
    type: "submission";
    exerciseSubmissionLink: string;
  }

  interface CourseSpecialPart extends CourseDPart {
    type: "special";
    requiredSkils: string[];
  }
  
  type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart ;
  
  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
    {
      //normalpart
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the easy course part",
      type: "normal"
    },
    {
      //normalpart
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the hard course part",
      type: "normal"
    },
    {
      //projectpart
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      //submissionpart
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      //special
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requiredSkils: ["nodejs", "jest"],
      type: "special"
    }
  ]


  const Header = ({name}: {name:string}) => {
    return <h1>{name}</h1>
  }

  const Content = ({parts}: {parts:CoursePart[]}):JSX.Element => {
    return <div>{parts.map(part => <p key={part.name} >
      <Part part={part}/></p>
      )}</div>
  }

  const Total = ({parts}: {parts:CoursePart[]}):JSX.Element => {
    let total = 0
    for(let i=0; i<parts.length; i++){
      total = total + parts[i].exerciseCount
    }
    return <div>Number of exercises {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}</div>
  }


  const Part = ({part}: {part:CoursePart}):JSX.Element => {
    
      switch(part.type) {
        case "normal":
          return <div><p key={part.name} >
            <strong>{part.name} {part.exerciseCount}</strong><br></br>
            <i>{part.description}</i></p>
            </div>
        case "groupProject":
          return <div><p key={part.name} >
          <strong>{part.name} {part.exerciseCount}</strong><br></br>
          project exercises {part.groupProjectCount}</p>
          </div>
        case "submission":
          return <div><p key={part.name} >
          <strong>{part.name} {part.exerciseCount}</strong><br></br>
          <i>{part.description}</i><br></br>
          submit to <i>{part.exerciseSubmissionLink}</i></p>
          </div>
        case "special":
          return <div><p key={part.name} >
          <strong>{part.name} {part.exerciseCount}</strong><br></br>
          <i>{part.description}</i><br></br>
          required skils: {part.requiredSkils.join(', ')}</p>
          </div>
        default:
          return assertNever(part);
      }
  }

  /**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};


  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;
