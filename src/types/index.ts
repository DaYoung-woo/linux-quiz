type categoryType = {
  id: string;
  order: string | number;
  year: string | number;
};

interface quizBasicType {
  category: string;
  quizNum: string;
  title: string;
  distractor1: string;
  distractor2: string;
  distractor3: string;
  distractor4: string;
  desc: string;
  answer: string;
}

interface quizType extends quizBasicType {
  id: string;
  year: string | number;
  order: string | number;
  photo: string;
}
