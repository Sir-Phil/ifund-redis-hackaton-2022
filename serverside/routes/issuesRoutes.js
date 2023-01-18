const express = require('express');
const { getIssues, createIssue, getIssueById, deleteIssue, upDateIssue, getTopIssue, createIssueReview } = require('../controllers/issueController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(getIssues).post(protect, admin, createIssue);
router.route('/:id').get(getIssueById).delete(deleteIssue).put(upDateIssue);
router.route('/top', getTopIssue);
router.route('/:id/reviews').post(createIssueReview);

module.exports = router;