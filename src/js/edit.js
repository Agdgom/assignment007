export default function edit(target, commentsData) {
  const editComment = target.closest('.comment');
  const editCommentId = +editComment.getAttribute('comment-id');
  console.log(editCommentId);
  const commentText = editComment.querySelector('.comment__text');
  const updateBtn = document.createElement('button'); // create update button
  const editTextArea = document.createElement('textarea'); // create edit text area, which replace text comment

  // disabled buttons
  editComment.querySelector('.edit-btn').setAttribute('disabled', true);
  editComment.querySelector('.delete-btn').setAttribute('disabled', true);

  editTextArea.classList.add('edit-area');
  editTextArea.innerText = commentText.textContent;

  commentText.style.display = 'none';

  editComment.querySelector('.comment__content').append(editTextArea);

  updateBtn.classList.add('update-btn');
  updateBtn.innerText = 'Update';

  editComment.append(updateBtn);
  updateBtn.addEventListener('click', () => {
    commentText.innerText = editTextArea.value;
    commentText.style.display = 'block';
    editTextArea.remove();

    // enable buttons
    editComment.querySelector('.edit-btn').removeAttribute('disabled', false);
    editComment.querySelector('.delete-btn').removeAttribute('disabled', false);
    updateBtn.remove();
    const newCommentsData = commentsData.map((el) => {
      if (el.id === editCommentId) {
        el.content = editTextArea.value;
        return el;
      } else {
        el.replies = el.replies.map((replyEl) => {
          if (replyEl.id === editCommentId) {
            replyEl.content = editTextArea.value;
          }
          return replyEl;
        });
        return el;
      }
    });
    localStorage.setItem('comments', JSON.stringify(newCommentsData));
  });
}
