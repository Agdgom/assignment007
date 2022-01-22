function addComment(currentUser, getRandomInRange, commentsArray) {
  const commentContent = document.querySelector('.add-block__comment');

  const commentsWrapper = document.querySelector('.comments-wrapper');
  const newCommentBlock = document.createElement('div');
  const newCommentMain = document.createElement('div');
  newCommentMain.classList.add('comment__main', 'comment');
  newCommentBlock.classList.add('comment__block');
  const commentId = getRandomInRange(1, 1000000);
  newCommentMain.setAttribute('comment-id', commentId);
  newCommentMain.innerHTML = `
    <div class="comment__score">
      <button>+</button>
      <span>0</span>
      <button>-</button>
    </div>
    <div class="comment__content">
      <div class="comment__header">
        <div class="comment__avatar">
          <img src=${currentUser.image.png} alt="Avatar" />
        </div>
        <h2>
          ${currentUser.username} 
          <span>You</span> 
          <span class="comment__date">Today</span>
        </h2>
        <div class="control-btn" >
            <button class="delete-btn">Delete</button>
            <button class="edit-btn">Edit</button>
        </div>
          
      </div>
      <p class="comment__text">
        ${commentContent.value}
      </p>
    `;
  commentsArray.push({
    id: commentId,
    content: commentContent.value,
    createdAt: 'today',
    score: 0,
    user: {
      image: {
        png: './images/avatars/image-juliusomo.png',
        webp: './images/avatars/image-juliusomo.png',
      },
      username: currentUser.username,
    },
    replies: [],
  });
  localStorage.setItem('comments', JSON.stringify(commentsArray));
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  newCommentBlock.append(newCommentMain);
  commentsWrapper.append(newCommentBlock);
}
export default addComment;
