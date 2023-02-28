import { trytm } from "@bdsqqq/try";
import {
  confirm,
  intro,
  multiselect,
  outro,
  select,
  text,
} from "@clack/prompts";

import colors from "picocolors";
import { COMMIT_TYPES } from "./commit-types.js";
import { getChangedFiles, getStagedFiles, gitAdd, gitCommit } from "./git.js";

intro(
  colors.inverse(
    `Asistente para la creacion de commits para ${colors.yellow(
      "manuelsanchezweb"
    )}`
  )
);

const [changedFiles, errorChangedFiles] = await trytm(getChangedFiles());
const [stagedFiles, errorStagedFiles] = await trytm(getStagedFiles());

// ?? chequea null o undefined
if (errorChangedFiles ?? errorStagedFiles) {
  outro(colors.red("Error: Comprueba que estas en un repositorio de Git"));
  process.exit(1);
}

if (stagedFiles.length === 0 && changedFiles.length > 0) {
  const files = await multiselect({
    message: colors.cyan(
      "No tienes nada seleccionado todavía. ¿Quieres agregar algo de esto?"
    ),
    options: changedFiles.map((file) => ({
      key: file,
      value: file,
    })),
  });
  await gitAdd({ files });
}

// console.log(changedFiles, stagedFiles);

const commitType = await select({
  message: "Selecciona el tipo de commit:",
  options: Object.entries(COMMIT_TYPES).map(([key, value]) => ({
    value: key,
    label: `${value.emoji} ${key.padEnd(8, " ")} • ${value.description}`,
  })),
});

// console.log(commitType);

const commitMessage = await text({
  message: colors.cyan("Introduce el texto del commit:"),
  validate: (value) => {
    if (value.length === 0)
      return colors.red("El mensaje no puede estar vacio");
    if (value.length > 100)
      return colors.red("El mensaje no puede tener mas de 50 caracteres");
  },
});

const { emoji, release } = COMMIT_TYPES[commitType];

let breakingChange = false;

if (release) {
  breakingChange = await confirm({
    initialValue: false,
    message: `${colors.cyan(
      "¿Tiene este commit cambios que rompen la compatibilidad anterior?"
    )}
        
    ${colors.gray(
      "Si la respuesta es sí, deberias crear un commit con el tipo de Breaking change"
    )}  
    `,
  });
}

let commit = `${emoji} ${commitType}: ${commitMessage}`;
commit = breakingChange ? `${commit} [breaking change]` : commit;

const shouldContinue = await confirm({
  initialValue: true,
  message: `${colors.cyan("¿Quieres crear el commit con el siguiente mensaje?")}
    ${colors.green(colors.bold(commit))}
    ${colors.cyan("¿Confirmas?")}`,
});

if (!shouldContinue) {
  outro(colors.yellow("No se ha creado el commit"));
  process.exit(0);
}

await gitCommit({ commit });

outro(
  colors.green("✔️ Commit creado con éxito. ¡Gracias por usar el asistente!")
);
