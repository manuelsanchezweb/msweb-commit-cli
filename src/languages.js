import colors from "picocolors";

export const LANGUAGES = {
  en: {
    emoji: "🇺🇸",
    description: "English",
    locale: "en",
  },
  es: {
    emoji: "🇪🇸",
    description: "Español",
    locale: "es",
  },
};

export const LANGUAGES_TEXT = {
  en: {
    intro: colors.inverse(
      `Hi! I am your commit assistant! ${colors.yellow("Hope this helps")}`
    ),
    errorGit: colors.red("Error: Please check that you are in a Git Repo"),
    checkIfConflict:
      "Did you check that you do not need to pull or sth? We are peacemakers here, do not want conflicts...",
    filesToAdd:
      "You have not staged files yet. Do you want to add some of these files?",
    commitType: "Select the commit type:",
    commitText: "Enter the text of the commit:",
    commitValidationEmpty: "Commit text cannot be empty",
    commitValidation50: "Commit text cannot be longer than 50 characters.",
    breakingChangeQuestion:
      "Does this commit have changes that (could) break previous compatibility?",
    breakingChangeMessage:
      "If yes, you should create a commit with type breaking change",
    lastConfirm: "Do you want to create the commit with the following message?",
    successMessage:
      "✔️ Commit created successfully. Thanks for using the commit assistant!",
    exitDefault: "The commit was not created.",
    exitNoFiles: "No files to commit",
    exitNoCommitType: "No commit type chosen",
    exitNoCommitMessage: "Commit message was not completed",
    confirmQuestion: "Confirm?",
  },
  es: {
    intro: colors.inverse(
      `¡Buenas! Este es tu asistente para la creacion de commits. ${colors.yellow(
        "¡Espero que te sirva!"
      )}`
    ),
    errorGit: colors.red("Error: Comprueba que estas en un repositorio de Git"),
    checkIfConflict:
      "¿Has procurado que no vaya a ver un conflicto después de este commit? (Si no, prueba a hacer un pull)",
    filesToAdd:
      "No tienes nada seleccionado todavía. ¿Quieres agregar algo de esto?",
    commitType: "Selecciona el tipo de commit:",
    commitText: "Introduce el texto del commit:",
    commitValidationEmpty: "El texto del commit no puede estar vacío",
    commitValidation50:
      "El texto del commit no puede tener mas de 50 caracteres",
    breakingChangeQuestion:
      "¿Tiene este commit cambios que rompen la compatibilidad anterior?",
    breakingChangeMessage:
      "Si la respuesta es sí, deberias crear un commit con el tipo de Breaking change",
    lastConfirm: "¿Quieres crear el commit con el siguiente mensaje?",
    successMessage:
      "✔️ Commit creado con éxito. ¡Gracias por usar el asistente!",
    exitDefault: "No se ha creado el commit",
    exitNoFiles: "No hay archivos para commitear",
    exitNoCommitType: "No se ha elegido un tipo de commit",
    exitNoCommitMessage: "No se ha completado el texto del commit",
    confirmQuestion: "¿Confirmas?",
  },
};
