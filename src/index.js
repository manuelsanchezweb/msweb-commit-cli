import {
  confirm,
  intro,
  isCancel,
  multiselect,
  outro,
  select,
  text,
} from "@clack/prompts";

import { trytm } from "@bdsqqq/try";
import colors from "picocolors";

import { COMMIT_TYPES } from "./commit-types.js";
import { getChangedFiles, getStagedFiles, gitAdd, gitCommit } from "./git.js";
import { LANGUAGES, LANGUAGES_TEXT } from "./languages.js";
import { exitProgram } from "./utils.js";

let languageSelected = "en";

languageSelected = await select({
  message: "Select your language:",
  options: Object.entries(LANGUAGES).map(([key, value]) => ({
    value: key,
    label: `${value.emoji} ${key.padEnd(8, " ")}`,
  })),
});

if (isCancel(languageSelected))
  exitProgram({ message: "No language was chosen" });

intro(LANGUAGES_TEXT[languageSelected].intro);

const [changedFiles, errorChangedFiles] = await trytm(getChangedFiles());
const [stagedFiles, errorStagedFiles] = await trytm(getStagedFiles());

// ?? chequea null o undefined
if (errorChangedFiles ?? errorStagedFiles) {
  outro(LANGUAGES_TEXT[languageSelected].errorGit);
  process.exit(1);
}

const isEverythingUpdated = await confirm({
  initialValue: true,
  message: `${LANGUAGES_TEXT[languageSelected].checkIfConflict}
    ${colors.cyan(LANGUAGES_TEXT[languageSelected].confirmQuestion)}`,
});

if (isCancel(isEverythingUpdated))
  exitProgram({ message: LANGUAGES_TEXT[languageSelected].exitDefault });

if (!isEverythingUpdated) {
  outro(colors.yellow(LANGUAGES_TEXT[languageSelected].exitDefault));
  process.exit(0);
}

if (stagedFiles.length === 0 && changedFiles.length > 0) {
  const files = await multiselect({
    message: colors.cyan(LANGUAGES_TEXT[languageSelected].filesToAdd),
    options: changedFiles.map((file) => ({
      key: file,
      value: file,
    })),
  });

  if (isCancel(files))
    exitProgram({ message: LANGUAGES_TEXT[languageSelected].exitNoFiles });

  await gitAdd({ files });
}

// DEBUG: console.log(changedFiles, stagedFiles);

const commitType = await select({
  message: LANGUAGES_TEXT[languageSelected].commitType,
  options: Object.entries(COMMIT_TYPES).map(([key, value]) => ({
    value: key,
    label: `${value.emoji} ${key.padEnd(8, " ")} • ${value.description}`,
  })),
});

if (isCancel(commitType))
  exitProgram({ message: LANGUAGES_TEXT[languageSelected].exitNoCommitType });

// DEBUG: console.log(commitType);

const commitMessage = await text({
  message: colors.cyan(LANGUAGES_TEXT[languageSelected].commitText),
  validate: (value) => {
    if (value.length === 0)
      return colors.red(LANGUAGES_TEXT[languageSelected].commitValidationEmpty);
    if (value.length > 50)
      return colors.red(LANGUAGES_TEXT[languageSelected].commitValidation50);
  },
});

if (isCancel(commitMessage))
  exitProgram({
    message: LANGUAGES_TEXT[languageSelected].exitNoCommitMessage,
  });

const { emoji, release } = COMMIT_TYPES[commitType];

let breakingChange = false;

if (release) {
  breakingChange = await confirm({
    initialValue: false,
    message: `${colors.cyan(
      LANGUAGES_TEXT[languageSelected].breakingChangeQuestion
    )}
        
    ${colors.gray(LANGUAGES_TEXT[languageSelected].breakingChangeMessage)}  
    `,
  });

  if (isCancel(breakingChange))
    exitProgram({ message: LANGUAGES_TEXT[languageSelected].exitDefault });
}

let commit = `${emoji} ${commitType}: ${commitMessage}`;
commit = breakingChange ? `${commit} [breaking change]` : commit;

const shouldContinue = await confirm({
  initialValue: true,
  message: `${colors.cyan(LANGUAGES_TEXT[languageSelected].lastConfirm)}
    ${colors.green(colors.bold(commit))}
    ${colors.cyan(LANGUAGES_TEXT[languageSelected].confirmQuestion)}`,
});

if (isCancel(shouldContinue))
  exitProgram({ message: LANGUAGES_TEXT[languageSelected].exitDefault });

if (!shouldContinue) {
  outro(colors.yellow(LANGUAGES_TEXT[languageSelected].exitDefault));
  process.exit(0);
}

await gitCommit({ commit });

outro(colors.green(LANGUAGES_TEXT[languageSelected].successMessage));
