import comment from './comment.js';
function showComments(comments, currentUser) {
  const commentsWrapper = document.querySelector('.comments-wrapper');

  comments.forEach((commentAuthor) => {
    const commentBlock = document.createElement('div');
    const commentMain = document.createElement('div');

    commentBlock.classList.add('comment__block');
    commentMain.classList.add('comment__main', 'comment');

    commentMain.setAttribute('comment-id', commentAuthor.id);
    commentMain.innerHTML = comment(commentAuthor, currentUser);

    commentsWrapper.append(commentBlock);
    commentBlock.append(commentMain);

    if (commentAuthor.replies.length > 0) {
      const repliesComment = document.createElement('div');

      repliesComment.classList.add('comment__reply', 'reply');
      commentBlock.append(repliesComment);

      commentAuthor.replies.forEach((replyEl) => {
        const replyBlock = document.createElement('div');
        replyBlock.classList.add('reply__block', 'comment');
        replyBlock.setAttribute('comment-id', replyEl.id);
        replyBlock.innerHTML = comment(replyEl, currentUser);

        repliesComment.append(replyBlock);
      });
    }
  });
}
export default showComments;
