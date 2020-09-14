import { Question } from '../types';

interface Session {
  token: string;
  tokenLastUsed: number;
}

// to prevent getting the same question twice a session token is used
// with each request (expires after 6 hours of inactivity).
async function getSession() {
  const session: Session | null = JSON.parse(localStorage.getItem('session')); // TODO: look into type error

  if (session !== null && session.tokenLastUsed > Date.now() - 18000000) {
    return session;
  }

  try {
    const tokenUrl = 'https://opentdb.com/api_token.php?command=request';

    const response = await fetch(tokenUrl);
    const { token } = await response.json();

    const newSession = { token, tokenLastUsed: null };

    return newSession;
  } catch (error) {
    throw new Error(error);
  }
}

function formatQuestions(questions: Question[]) {
  function decodeHTML(html: string) {
    const text = document.createElement('textarea');
    text.innerHTML = html;
    return text.value;
  }

  function shuffleAnswers(array: string[]) {
    return array.sort(() => Math.random() - 0.5);
  }

  const formatedQuestions = questions.map((q) => {
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

  return formatedQuestions;
}

export async function getQuestions(url: string): Promise<Question[]> {
  try {
    const { token } = await getSession();

    const response = await fetch(`${url}&token=${token}`);
    const { results } = await response.json();

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
