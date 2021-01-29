import { UnformattedQuestions, Questions, Difficulty, Type } from '../types';

interface Session {
  token: string;
  tokenLastUsed: number;
}
interface Settings {
  difficulty: Difficulty;
  type: Type;
  rounds: number;
}

function formatQuestions(questions: UnformattedQuestions): Questions {
  function decodeHTML(html: string) {
    const text = document.createElement('textarea');
    text.innerHTML = html;
    return text.value;
  }

  function shuffleAnswers(array: string[]) {
    return array.sort(() => Math.random() - 0.5);
  }

  const formattedQuestions = questions.map((q) => {
    const { question, correct_answer, incorrect_answers } = q;

    const decodedQuestion = decodeHTML(question);
    const decodedCorrectAnswer = decodeHTML(correct_answer);
    const decodedIncorrectAnswers = incorrect_answers.map((answer) =>
      decodeHTML(answer)
    );

    const answers = [...decodedIncorrectAnswers, decodedCorrectAnswer];

    const all_answers =
      answers.length <= 2
        ? answers.sort().reverse() // for boolean type question/answer
        : shuffleAnswers(answers); // for multiple type question/answer

    return {
      ...q,
      question: decodedQuestion,
      correct_answer: decodedCorrectAnswer,
      incorrect_answers: decodedIncorrectAnswers,
      all_answers,
    };
  });

  return formattedQuestions;
}

// to prevent getting the same question twice a session token is used
// with each request (expires after 6 hours of inactivity).
async function getSession(): Promise<Session> {
  const existingSession = localStorage.getItem('session');
  const session: Session = existingSession ? JSON.parse(existingSession) : null;

  if (session !== null && session.tokenLastUsed > Date.now() - 18000000) {
    return session;
  }

  try {
    const tokenURL = 'https://opentdb.com/api_token.php?command=request';

    const response = await fetch(tokenURL);
    const { token }: { token: string } = await response.json();

    const newSession = { token, tokenLastUsed: 0 };
    return newSession;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getQuestions(settings: Settings): Promise<Questions> {
  try {
    const { token } = await getSession();

    const { difficulty, type, rounds } = settings;
    const questionsURL = `https://opentdb.com/api.php?difficulty=${difficulty}&type=${type}&amount=${rounds}&token=${token}`;

    const response = await fetch(questionsURL);
    const { results }: { results: UnformattedQuestions } = await response.json(); // prettier-ignore

    const session = { token, tokenLastUsed: Date.now() };
    localStorage.setItem('session', JSON.stringify(session));

    const questions = formatQuestions(results);
    return questions;
  } catch (error) {
    throw new Error(error);
  }
}

export function capitalizeString(string: string): string {
  return string[0].toUpperCase() + string.slice(1);
}
