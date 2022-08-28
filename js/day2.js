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
    {q: `ナナホがもらったプレゼントで一番嬉しかったのは?` , c:[`ダイソンのドライヤー`,`Apple Watch`,`スチーマー`] , i:`../img/day2-1.png`},
    {q: `ナナホが好きなお寿司のネタはどれ` , c:[`納豆巻き`,`ネギとろ`,`いくら`], i:`../img/day2-2.png`},
    {q: `ナナホの好物は？` , c:[`梨`,`メロン`,`ガルボ`], i:`../img/day1-3.png`},
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
  function checkAnswer(li,quizSet, currentNum){
    if(isAnswered){
      return;
    }
    isAnswered = true;
    if(li.textContent === quizSet[currentNum].c[0]){
      li.classList.add(`correct`);
      score++;
    }else{
      li.classList.add(`wrong`);
    }
    btn.classList.remove(`disabled`);
  }

  function setQuiz(quizSet, currentNum, qimg){
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
        checkAnswer(li,quizSet, currentNum);
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
        perfectMessage.textContent = `全問正解おめでとう！キーワードは「235」メモしてね`
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