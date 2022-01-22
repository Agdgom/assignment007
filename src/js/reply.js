export default function reply(currentUser, target, getRandomInRange, commentsData) {
  const commentMain = target.closest('.comment__block').querySelector('.comment__main');
  const commentMainId = +commentMain.getAttribute('comment-id');

  const replyComment = document.createElement('div');
  const commentsBlock = target.closest('.comment__block');
  const replyCommentId = getRandomInRange(1, 100000);

  let repliesBlock = commentsBlock.querySelector('.reply');

  replyComment.classList.add('reply__block', 'comment');
  replyComment.innerHTML = `
        <div class="comment__avatar">
        <img src=${currentUser.image.png} />
        </div>
        <textarea class="comment__content"></textarea>
        <button class="reply-send-btn">Reply</button>
      `;
  if (!repliesBlock) {
    repliesBlock = document.createElement('div');
    repliesBlock.classList.add('comment__reply', 'reply');
    commentsBlock.append(repliesBlock);
  }
  repliesBlock.append(replyComment);
  replyComment.querySelector('.reply-send-btn').addEventListener('click', () => {
    const contentValue = replyComment.querySelector('.comment__content').value;
    replyComment.setAttribute('comment-id', replyCommentId);
    replyComment.innerHTML = `
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
            <span class="comment__date">Now</span>
          </h2>
        
              <div class="control-btn">
                <button class="delete-btn">Delete</button>
                <button class="edit-btn">Edit</button>
              </div>
          </div>
        <p class="comment__text">
          ${contentValue}
        </p>      
        `;

    const newCommentsData = commentsData.map((el) => {
      if (el.id === commentMainId) {
        el.replies.push({
          id: replyCommentId,
          content: contentValue,
          createdAt: 'today',
          score: 0,
          user: {
            image: {
              png: './images/avatars/image-juliusomo.png',
              webp: './images/avatars/image-juliusomo.png',
            },
            username: currentUser.username,
          },
        });
      }
      return el;
    });

    localStorage.setItem('comments', JSON.stringify(newCommentsData));
  });
}
