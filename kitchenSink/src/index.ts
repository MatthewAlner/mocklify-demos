import { mocklify, modify, omit, override, where, Limiter } from 'mocklify';

enum House {
  GRYFFINDOR = 'Gryffindor',
  SLYTHERIN = 'Slytherin',
  RAVENCLAW = 'Ravenclaw',
  HUFFLEPUFF = 'Hufflepuff'
}

const isGryffindor: Limiter<IStudent> = student => student.house === House.GRYFFINDOR;
const isSlytherin: Limiter<IStudent> = student => student.house === House.SLYTHERIN;
const isHarry: Limiter<IStudent> = student => student.firstName === 'Harry' && student.lastName === 'Potter';

function prettyPrintStudents(students: IStudent[]) {
  const appDiv: HTMLElement | null = document.getElementById('app');
  if (appDiv) {
    appDiv.innerHTML = `<pre>${JSON.stringify(students, null, 2)}</pre>`;
  }
}

function randomHouse(): House {
  const randNum = Math.floor(Math.random() * 2);
  switch(randNum) {
    case 0: {
      return House.GRYFFINDOR;
    }
    case 1: {
      return House.SLYTHERIN;
    }
    default: {
      return House.GRYFFINDOR
    }
  }
}

const MOCK_STUDENT_FACTORY = (index: number): IStudent => {
  return {
    id: `generated-student-${index}`,
    firstName: "Generated",
    lastName: "Student",
    house: randomHouse(),
    points: 32,
    tags: [],
    gender: ''
  }
};

export interface IStudent {
  id: string;
  firstName: string;
  lastName: string;
  house: House;
  points: number;
  tags: string[];
  gender: string;
}

export const MOCK_MIXED_HOUSE_STUDENTS: IStudent[] = [
  {
    id: "harry_potter",
    firstName: "Harry",
    lastName: "Potter",
    house: House.GRYFFINDOR,
    points: 256,
    tags: [],
    gender: 'male'
  },
  {
    id: "ron_weasley",
    firstName: "Ron",
    lastName: "Weasley",
    house: House.GRYFFINDOR,
    points: 64,
    tags: [],
    gender: 'male'
  },
  {
    id: "luna_lovegood",
    firstName: "Luna",
    lastName: "Lovegood",
    house: House.RAVENCLAW,
    points: 256,
    tags: [],
    gender: 'female'
  }
];

export const MOCK_SLYTHERIN_STUDENTS: IStudent[] = [
  {
    id: "draco_malfoy",
    firstName: "Draco",
    lastName: "Malfoy",
    house: House.SLYTHERIN,
    points: 128,
    tags: [],
    gender: 'male'
  },
  {
    id: "vincent_crabbe",
    firstName: "Vincent",
    lastName: "Crabbe",
    house: House.SLYTHERIN,
    points: 1,
    tags: [],
    gender: 'male'
  }
];

const students = mocklify<IStudent>()
    .addAll(MOCK_MIXED_HOUSE_STUDENTS)
    .filter(isGryffindor)
    .add(1, MOCK_SLYTHERIN_STUDENTS)
    .generate(7, MOCK_STUDENT_FACTORY)
    .transform(
        omit(['gender']),
        where(isGryffindor, modify(student => (student.points += 1000))),
        where(isSlytherin, override({ points: 0 })),
        where( isHarry, override({ points: 9999, isAdmin: true })),
        override({tags: ['student']}),
        modify((student, index, allStudents) => {
          student.id = `student_${index}`;
        })
    )
    .getAll();

prettyPrintStudents(students);
