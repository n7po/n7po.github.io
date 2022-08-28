`use strict`;
{
  const question = document.getElementById(`question`);
  const choices = document.getElementById(`choices`);
  const btn = document.getElementById(`btn`);
  const result = document.getElementById(`result`);
  const scoreLabel = document.getElementById(`p1`);
  const perfectMessage = document.getElementById(`p2`);
  const qimg = document.getElementById(`qimage`);

  const quizSet = shuffle([
    {q: `中定佑輔がやってないバイトはどれ?` , c:[`新聞配達`,`塾講師`,`焼肉屋`] , i:`../img/day1-1.png`},
    {q: `中定佑輔と同じ9月28日生まれは誰?` , c:[`オカリナ`,`いとうあさこ`,`森三中の黒沢`], i:`../img/day1-2.png`},
    {q: `中定佑輔の好物は？` , c:[`ガルボ`,`メロン`,`梨`], i:`../img/day1-3.png`},
  ]);
  let currentNum = 0;
  let isAnswered;
  let score = 0;
  

  // 配列をシャッフルする
  function shuffle(arr){
    for( let i = arr.length -1; i>0; i--) {
      const j = Math.floor(Math.random() * (i+1)); //ランダムに選ばれる要素のインデックス
      [arr[j],arr[i]] = [arr[i],arr[j]];
      return arr;
    }
  }

  // 正誤判定と結果に応じてクラスを分ける
  function checkAnswer(li,quizSet, currentNum,btn,score){
    if(isAnswered){
      return;
    }
    isAnswered = true;
    if(li.textContent === quizSet[currentNum].c[0]){
      console.log(score);
      li.classList.add(`correct`);
      score++;
      console.log(score);
    }else{
      li.classList.add(`wrong`);
    }
    btn.classList.remove(`disabled`);
  }

  function setQuiz(quizSet, currentNum, qimg ,score){
    isAnswered = false;

    question.textContent = quizSet[currentNum].q;
    qimg.src = quizSet[currentNum].i;

    while (choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }

    // 選択肢と正誤判定の埋め込み
    const shuffledchoices = shuffle([...quizSet[currentNum].c]);
    shuffledchoices.forEach(choice =>{
      const li = document.createElement(`li`);
      li.textContent = choice;
      li.addEventListener(`click`,() => {
        console.log(score);
        checkAnswer(li,quizSet, currentNum,btn, score);
      })
      choices.appendChild(li);
    });

    if (currentNum === quizSet.length - 1) {
      btn.textContent = '採点へ';
    }
  }

  setQuiz(quizSet, currentNum, qimg);
  //ボタンクリック
  btn.addEventListener('click', () => {
    if (btn.classList.contains('disabled')) {
      return;
    }
    btn.classList.add('disabled');

    if(currentNum === quizSet.length -1){
      scoreLabel.textContent = `結果は： ${score} / ${quizSet.length}`;

      if(score === quizSet.length){
        perfectMessage.textContent = `全問正解おめでとう！キーワードは「212」メモしてね`
      }else{
        perfectMessage.textContent = `はずれがあるのでキーワードはGETできず。残念！`
      }
      ;

      result.classList.remove(`hidden`);
    }else{
      currentNum++;
      setQuiz(quizSet, currentNum, qimg);
    }
  });
}