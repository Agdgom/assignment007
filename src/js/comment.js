export default function comment(commentAuthor, currentUser) {
  return `
    <div class="comment__score">
      <button>+</button>
      <span>${commentAuthor.score}</span>
      <button>-</button>
    </div>
    <div class="comment__content">
      <div class="comment__header">
        <div class="comment__avatar">
          <img src=${commentAuthor.user.image.png} alt="Avatar" />
        </div>
        <h2>
          ${commentAuthor.user.username} 
          <span>${commentAuthor.user.username === currentUser.username ? 'You' : ''}</span> 
          <span class="comment__date">${commentAuthor.createdAt}</span>
        </h2>
        ${
          currentUser.username === commentAuthor.user.username
            ? `
          
            <div class="control-btn">
              <button class="delete-btn">Delete</button>
              <button class="edit-btn">Edit</button>
            </div>
          `
            : `<div class="control-btn"><button class="comment__reply-btn">Reply</button></div>`
        }
      </div>
      <p class="comment__text">
        ${commentAuthor.content}
      </p>
    `;
}
