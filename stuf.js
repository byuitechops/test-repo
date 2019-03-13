const git = require('simple-git');
const prompts = require('prompts');


async function getValidBranches() {
    var branches;
    await git().branch((err, summary) => {
        if (err) console.error(err);
        branches = Object.keys(summary.branches);
    });
    return branches;
}

async function getUserInput(branches) {
    let response = await prompts({
        type: 'text',
        name: 'repo',
        message: 'What is your current repo?',
        validate: value => branches.includes(value) ? true : "That branch doesn't exist"
    })
    return response;
}

async function doGitStuff(branch) {
    await git()
        .add(['stuf.js'], (err) => console.error(err))
        .commit('test2', (err) => console.error(err))
        .push('origin', branch)
        .mergeFromTo(branch, 'master', (err) => console.error(err))

        // .checkoutBranch('master', branch, (err) => console.error(err))
        // .merge()
        .push('origin', 'master')

}

getValidBranches()
    .then((branches) => getUserInput(branches))
    .then((res) => doGitStuff(res.repo))


