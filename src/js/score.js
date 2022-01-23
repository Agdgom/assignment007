export default function score(target, commentsData) {
  const parentComment = target.closest('.comment');
  const parentCommentId = +parentComment.getAttribute('comment-id');
  const parrentCommentScore = parentComment.querySelector('.comment-score');
  if (parentComment.classList.contains('comment__main')) {
    const commentObjIndex = commentsData.findIndex((comment) => comment.id === parentCommentId);
    if (target.classList.contains('score-btn-plus')) {
      commentsData[commentObjIndex].score++;
      parrentCommentScore.innerHTML = +parrentCommentScore.textContent + 1;
    }
    if (target.classList.contains('score-btn-minus')) {
      commentsData[commentObjIndex].score--;
      parrentCommentScore.innerHTML = +parrentCommentScore.textContent - 1;
    }
  }
  if (parentComment.classList.contains('reply__block')) {
    let commentObjIndex = [];
    commentsData.forEach((el, idx) => {
      el.replies.forEach((reply, replyIdx) => {
        if (reply.id === parentCommentId) {
          commentObjIndex[0] = idx;
          commentObjIndex[1] = replyIdx;
        }
      });
    });
    if (target.classList.contains('score-btn-plus')) {
      commentsData[commentObjIndex[0]].replies[commentObjIndex[1]].score++;
      parrentCommentScore.innerHTML = +parrentCommentScore.textContent + 1;
    }
    if (target.classList.contains('score-btn-minus')) {
      commentsData[commentObjIndex[0]].replies[commentObjIndex[1]].score--;
      parrentCommentScore.innerHTML = +parrentCommentScore.textContent - 1;
    }
  }
  //Update Comments Data
  localStorage.setItem('comments', JSON.stringify(commentsData));
}
