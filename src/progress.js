/**
 * PTS Progress Tracking — localStorage-based completion tracking
 */
const PREFIX = 'pts-ch-';
const SUFFIX = '-complete';

export function isChapterComplete(num) {
  try { return localStorage.getItem(PREFIX + num + SUFFIX) === 'true'; } catch { return false; }
}

export function markChapterComplete(num) {
  try { localStorage.setItem(PREFIX + num + SUFFIX, 'true'); } catch { /* noop */ }
}

export function getCompletedCount() {
  let count = 0;
  for (let i = 1; i <= 7; i++) {
    if (isChapterComplete(i)) count++;
  }
  return count;
}

export function getStudentName() {
  try { return localStorage.getItem('pts-student-name') || ''; } catch { return ''; }
}

export function setStudentName(name) {
  try { localStorage.setItem('pts-student-name', name.trim()); } catch { /* noop */ }
}
