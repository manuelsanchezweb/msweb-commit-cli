import { exec } from "node:child_process";
import { promisify } from "node:util";

const execAsync = promisify(exec);

function cleanStdout(stdout) {
  return stdout.trim().split("\n").filter(Boolean);
}

// filter(Boolean) te remueve todo lo falsy: empty strings, null o undefined

export async function getChangedFiles() {
  const { stdout } = await execAsync("git status --porcelain");
  return cleanStdout(stdout).map((line) => line.split(" ").at(-1));
}

export async function getStagedFiles() {
  const { stdout } = await execAsync("git diff --cached --name-only");
  return cleanStdout(stdout);
}

export async function gitCommit({ commit } = {}) {
  const { stdout } = await execAsync(`git commit -m "${commit}"`);
  return cleanStdout(stdout);
}

export async function gitAdd({ files = [] } = {}) {
  const filesLine = files.join(" ");
  const { stdout } = await execAsync(`git add ${filesLine}`);
  return cleanStdout(stdout);
}

async function getCurrentBranch() {
  const { stdout } = await execAsync("git symbolic-ref --short HEAD");
  return cleanStdout(stdout);
}

export async function gitPush({ branch = "origin" }) {
  try {
    const { stdout, stderr } = await execAsync(`git push ${branch}`);
    if (stderr) throw new Error(stderr);
    return stdout;
  } catch (error) {
    // Check if the error is due to no upstream branch
    if (error.message.includes("no upstream branch")) {
      const currentBranch = await getCurrentBranch();
      const { stdout, stderr } = await execAsync(
        `git push --set-upstream ${branch} ${currentBranch}`
      );
      if (stderr) throw new Error(stderr);
      return stdout;
    } else {
      throw error;
    }
  }
}
