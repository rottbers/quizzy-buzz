// to prevent getting the same question twice a session token is used
// with each request (expires after 6 hours of inactivity).
const getSession = async () => {
  const session = JSON.parse(localStorage.getItem('session'));

  if (session && session.tokenLastUsed > Date.now() - 18000000) {
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
};

const formatQuestions = (questions) => {
  const decodeHTML = (html) => {
    let text = document.createElement('textarea');
    text.innerHTML = html;
    return text.value;
  };

  const shuffleAnswers = (array) => array.sort(() => Math.random() - 0.5);

  const formatedQuestions = questions.map((q) => {
    const { question, correct_answer, incorrect_answers } = q;

    const decodedQuestion = decodeHTML(question);
    const decodedCorrectAnswer = decodeHTML(correct_answer);
    const decodedIncorrectAnswers = incorrect_answers.map((answer) => decodeHTML(answer));

    const shuffled_answers = shuffleAnswers([ ...decodedIncorrectAnswers, decodedCorrectAnswer ]);

    return {
      ...q,
      question: decodedQuestion,
      correct_answer: decodedCorrectAnswer,
      incorrect_answers: decodedIncorrectAnswers,
      shuffled_answers,
    };
  });

  return formatedQuestions;
};

const getQuestions = async (url) => {
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
};

export { getQuestions };
