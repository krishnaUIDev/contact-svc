console.log("Before");
getUser(1, getuser);
console.log("after");

// Callbacks
// Promises
// Async/await

function getuser(user) {
  getRgetuserepo(user && user.userName, getRepo);
}
function getrepo(repos) {
  getCommits(repos, display);
}
function display(commits) {
  console.log(commits);
}

function getUser(id, callback) {
  setTimeout(() => {
    console.log("reading a user from db");
    callback({ id: id, userName: "krishn" });
  }, 2000);
}

function getRepo(userName, callback) {
  setTimeout(() => {
    callback(["test"]);
  }, 2000);
}

function getCommits(userName, callback) {
  setTimeout(() => {
    callback(["sfasfd"]);
  }, 2000);
}
