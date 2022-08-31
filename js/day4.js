'use strict';
{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.getElementById('p1');
  const perfectMessage = document.getElementById('p2');
  const qimg = document.getElementById('qimage');

  const quizSet = shuffle([
    {q: `二人で最初に商品をGETしたクレーンゲームの場所は?` , c:[`豊洲`,`池袋`,`川越`] , i:`../img/day4-1.png`},
    {q: `二人で初めて同棲したのは?` , c:[`リシュブール四つ木`,`リシュプール四ツ木`,`リシュブール四ツ木`], i:`../img/day4-2.png`},
    {q: `二人が付き合ったのはどこ` , c:[`横浜`,`伊豆`,`軽井沢`], i:`../img/day4-3.png`},
  ]);
  let currentNum = 0;
  let isAnswered;
  let score = 0;
  

  // 配列をシャッフルする
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  // 正誤判定と結果に応じてクラスを分ける
  function checkAnswer(li) {
    if (isAnswered) {
      return;
    }
    isAnswered = true;

    if (li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add('correct');
      score++;
    } else {
      li.classList.add('wrong');
    }

    btn.classList.remove('disabled');
  }

  function setQuiz() {
    isAnswered = false;

    question.textContent = quizSet[currentNum].q;
    qimg.src = quizSet[currentNum].i;

    while (choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }

    // 選択肢と正誤判定の埋め込み
    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    shuffledChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAnswer(li);
      });
      choices.appendChild(li);
    });

    if (currentNum === quizSet.length - 1) {
      btn.textContent = '採点へ';
    }
  }

  setQuiz();
  //ボタンクリック
  btn.addEventListener('click', () => {
    if (btn.classList.contains('disabled')) {
      return;
    }
    btn.classList.add('disabled');

    if (currentNum === quizSet.length - 1) {
      scoreLabel.textContent = `結果は: ${score} / ${quizSet.length}`;

      if(score === quizSet.length){
        perfectMessage.textContent = `全問正解おめでとう！最後のキーワードは「263」メモしてね`
      }else{
        perfectMessage.textContent = 'はずれがあるのでキーワードはGETできず。残念！';
      };

      result.classList.remove('hidden');
    } else {
      currentNum++;
      setQuiz();
    }
  });
}