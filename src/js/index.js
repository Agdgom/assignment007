import data from '../data.json';
import '../styles/style.css'; // styles
import showComments from './showComments.js';
import addComment from './addComment.js';
import deleteComment from './deleteComment.js';
import reply from './reply.js';
import edit from './edit.js';
import score from './score.js';
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || data.currentUser;
let commentsData = JSON.parse(localStorage.getItem('comments')) || data.comments;

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

showComments(commentsData, currentUser);

document.body.addEventListener('click', (e) => {
  const target = e.target;
  if (target.classList.contains('add-block__btn')) {
    addComment(currentUser, getRandomInRange, commentsData);
  }
  if (target.classList.contains('delete-btn')) {
    deleteComment(target, commentsData);
  }
  if (target.classList.contains('comment__reply-btn')) {
    reply(currentUser, target, getRandomInRange, commentsData);
  }
  if (target.classList.contains('edit-btn')) {
    edit(target, commentsData);
  }
  if (target.classList.contains('score-btn-plus') || target.classList.contains('score-btn-minus')) {
    score(target, commentsData);
  }
});
