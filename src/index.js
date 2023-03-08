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
import { exitProgram } from "./utils.js";

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

const isEverythingUpdated = await confirm({
  initialValue: true,
  message: `${colors.cyan(
    "¿Has procurado que no vaya a ver un conflicto después de este commit? (Si no, prueba a hacer un pull)"
  )}
    ${colors.cyan("¿Confirmas?")}`,
});

if (isCancel(isEverythingUpdated))
  exitProgram({ message: "No se ha creado el commit" });

if (!isEverythingUpdated) {
  outro(colors.yellow("No se ha creado el commit"));
  process.exit(0);
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

  if (isCancel(files))
    exitProgram({ message: "No hay archivos para commitear" });

  await gitAdd({ files });
}

// DEBUG: console.log(changedFiles, stagedFiles);

const commitType = await select({
  message: "Selecciona el tipo de commit:",
  options: Object.entries(COMMIT_TYPES).map(([key, value]) => ({
    value: key,
    label: `${value.emoji} ${key.padEnd(8, " ")} • ${value.description}`,
  })),
});

if (isCancel(commitType))
  exitProgram({ message: "No se ha elegido un tipo de commit" });

// DEBUG: console.log(commitType);

const commitMessage = await text({
  message: colors.cyan("Introduce el texto del commit:"),
  validate: (value) => {
    if (value.length === 0)
      return colors.red("El mensaje no puede estar vacio");
    if (value.length > 100)
      return colors.red("El mensaje no puede tener mas de 50 caracteres");
  },
});

if (isCancel(commitMessage))
  exitProgram({ message: "No se ha completado el mensaje del commit" });

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

  if (isCancel(breakingChange)) exitProgram();
}

let commit = `${emoji} ${commitType}: ${commitMessage}`;
commit = breakingChange ? `${commit} [breaking change]` : commit;

const shouldContinue = await confirm({
  initialValue: true,
  message: `${colors.cyan("¿Quieres crear el commit con el siguiente mensaje?")}
    ${colors.green(colors.bold(commit))}
    ${colors.cyan("¿Confirmas?")}`,
});

if (isCancel(shouldContinue))
  exitProgram({ message: "No se ha creado el commit" });

if (!shouldContinue) {
  outro(colors.yellow("No se ha creado el commit"));
  process.exit(0);
}

await gitCommit({ commit });

outro(
  colors.green("✔️ Commit creado con éxito. ¡Gracias por usar el asistente!")
);
