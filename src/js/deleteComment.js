export default function deleteComment(target, commentsData) {
  const removeComment = target.closest('.comment');
  const removeCommentId = +removeComment.getAttribute('comment-id');

  const modal = document.createElement('div');
  modal.innerHTML = `
        <h2></h2>
        <p>
          Are you sure to want to delete this comment? 
          This will remove the comment and can't be undone.
        </p>
        <div>
          <button class="cancel-btn">No, cancel</button>
          <button class="modal-delete-btn">Yes, Delete</button>
        </div>
      `;
  modal.classList.add('modal');
  document.body.append(modal);
  modal.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal-delete-btn')) {
      removeComment.remove();
      modal.style.display = 'none';
      let newCommentsData = commentsData.filter((el) => el.id !== removeCommentId);

      if (JSON.stringify(newCommentsData) === JSON.stringify(commentsData)) {
        let mainElementIdx;
        let deleteElIdx;
        commentsData.forEach((el, idx) => {
          el.replies.forEach((replyEl, replyIdx) => {
            if (replyEl.id === removeCommentId) {
              mainElementIdx = idx;
              deleteElIdx = replyIdx;
            }
          });
        });
        newCommentsData = commentsData;
        newCommentsData[mainElementIdx].replies.splice(deleteElIdx, 1);
      }

      localStorage.setItem('comments', JSON.stringify(newCommentsData));
    } else if (event.target.classList.contains('cancel-btn')) {
      modal.style.display = 'none';
    }
  });
}
