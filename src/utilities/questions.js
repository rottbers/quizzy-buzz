const readSession = () => JSON.parse(localStorage.getItem('session'));

const writeSession = session =>
  localStorage.setItem('session', JSON.stringify(session));

const getJson = url =>
  fetch(url).then(response => {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  });

// to prevent users from getting the same question twice back from the API a session token
// is used with each request. A session token expires after 6 hours inactivty
const getSession = () => {
  return new Promise((resolve, reject) => {
    // check for currect session
    let session = readSession();

    // if not found or expired fetch new session token
    if (!session || session.tokenLastUsed < Date.now() - 18000000) {
      getJson('https://opentdb.com/api_token.php?command=request')
        .then(data => {
          // create session object
          session = {
            token: data.token,
            tokenLastUsed: null
          };

          resolve(session);
        })
        .catch(error => reject(error));
    } else {
      resolve(session);
    }
  });
};

const getQuestions = url => {
  return new Promise((resolve, reject) => {
    getSession().then(session =>
      getJson(`${url}&token${session.token}`)
        .then(data => {
          // update session date
          session.tokenLastUsed = Date.now();
          writeSession(session);

          resolve(data.results);
        })
        .catch(error => reject(error))
    );
  });
};

const formatQuestions = questions => {
  const shuffleAnswers = array => array.sort(() => Math.random() - 0.5);

  const decodeHTML = html => {
    let text = document.createElement('textarea');
    text.innerHTML = html;
    return text.value;
  };

  // TODO: consider a clearner solution
  questions.map(question => {
    // decode strings
    question.question = decodeHTML(question.question);
    question.correct_answer = decodeHTML(question.correct_answer);
    question.incorrect_answers = question.incorrect_answers.map(
      item => (item = decodeHTML(item))
    );

    // shuffle array
    question.shuffled_answers = shuffleAnswers([
      ...question.incorrect_answers,
      question.correct_answer
    ]);
  });

  return questions;
};

export { getQuestions, formatQuestions };
