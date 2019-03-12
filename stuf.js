const git = require('simple-git');
const prompt = require('prompts');

async function getValidBranches() {
    var branches;
    await git().branch((err, summary) => {
        if (err) console.error(err);
        branches = Object.keys(summary.branches);
    });
    return branches;
}

async function getUserInput(branches) {
    const response = await prompt({
        type: '',
        name: 'repo',
        message: 'What is your current repo?',
        validate: value => branches.includes(value) ? true : "That branch doesn't exist"
    })
    return response;
}

async function doGitStuff(branch) {
    await git()
        .push('origin', branch)
        .checkoutBranch('master', branch, (err) => console.error(err))
        .mergeFromTo(branch, 'master', (err) => console.error(err))
}

getValidBranches().then((stuff) => getUserInput(stuff)).then((branch) => doGitStuff(branch))