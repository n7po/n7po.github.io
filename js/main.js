`use strict`;
{
  const checkbtn = document.getElementById(`checkAnswer`);
  const text = document.getElementById(`inputarea`);
  let answer = `928`;
  const result = document.getElementById(`result`);
  const msg1 = document.getElementById(`p1`);
  const msg2 = document.getElementById(`p2`);
  const link = document.getElementById(`goto`);

// クリック
  checkbtn.addEventListener('click', () => {
    if(text.value === answer){
      msg1.textContent = `おめでとう!`;
      msg2.textContent = `正解です！次のページへ進んでね`;
      link.textContent = `ごほうびをもらう`;
      link.href ="html/goal.html";
      result.classList.remove(`hidden`);
    }else{
      msg1.textContent = `違うよ`
      msg2.textContent = `もう一度やり直してみてね`
      link.textContent = `やり直す`;
      link.href ="#checkAnswer";
      result.classList.remove(`hidden`);
    }
  });


  // クリック
  link.addEventListener('click', () => {
    if(text.value === answer){
    }else{
      result.classList.add(`hidden`);
      text.value = '';
    }
  });
}