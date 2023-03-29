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
  de: {
    emoji: "🇩🇪",
    description: "Deutsch",
    locale: "de",
  },
  ru: {
    emoji: "🇷🇺",
    description: "Русский",
    locale: "ru",
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
    successMessage: "✔️ Commit created successfully",
    exitDefault: "The commit was not created.",
    exitNoFiles: "No files to commit",
    exitNoCommitType: "No commit type chosen",
    exitNoCommitMessage: "Commit message was not completed",
    confirmQuestion: "Confirm?",
    pushQuestion: "Do you want to push the changes to the following branch?: ",
    successPush: "✔️ Pushed successfully",
    finalMessage: "Thanks for using the commit assistant!",
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
    successMessage: "✔️ Commit creado con éxito",
    exitDefault: "No se ha creado el commit",
    exitNoFiles: "No hay archivos para commitear",
    exitNoCommitType: "No se ha elegido un tipo de commit",
    exitNoCommitMessage: "No se ha completado el texto del commit",
    confirmQuestion: "¿Confirmas?",
    pushQuestion: "¿Quieres hacer push de los cambios a la siguiente branch?: ",
    successPush: "✔️ Push realizado con éxito",
    finalMessage: "¡Gracias por usar el asistente!",
  },
  de: {
    intro: colors.inverse(
      `Hallo! Ich bin dein Commit-Assistent! ${colors.yellow(
        "Hoffentlich hilft das"
      )}`
    ),
    errorGit: colors.red(
      "Fehler: Bitte überprüfe, ob du dich in einem Git Repo befindest!"
    ),
    checkIfConflict:
      "Hast du überprüft, ob du nicht ziehen (pullen) musst oder ähnliches? Wir sind Friedensstifter und wollen keine Konflikte...",
    filesToAdd:
      "Du hast noch keine Dateien zur Verfügung gestellt (staged). Willst du einige dieser Dateien hinzufügen?",
    commitType: "Wähle den Commit-Typ aus:",
    commitText: "Gib den Text der Übergabe (Commits) ein:",
    commitValidationEmpty: "Der Commit-Text darf nicht leer sein!",
    commitValidation50: "Commit-Text darf nicht länger als 50 Zeichen sein!",
    breakingChangeQuestion:
      "Enthält dieser Commit Änderungen, die die bisherige Kompatibilität beeinträchtigen (könnten)?",
    breakingChangeMessage:
      "Wenn ja, sollten Sie einen Commit mit dem Typ 'Breaking Change' erstellen",
    lastConfirm: "Willst du den Commit mit der folgenden Nachricht erstellen?",
    successMessage: "✔️ Commit erfolgreich erstellt",
    exitDefault: "Der Commit wurde nicht erstellt.",
    exitNoFiles: "Keine Dateien zu übertragen",
    exitNoCommitType: "Keinen Commit-Typen ausgewählt",
    exitNoCommitMessage: "Commit-Nachricht wurde nicht abgeschlossen",
    confirmQuestion: "Bestätigen?",
    pushQuestion: "Willst du die Änderungen auf den folgenden Branch pushen?: ",
    successPush: "✔️ Push erfolgreich",
    finalMessage: "Danke, dass du den Commit-Assistenten benutzt hast!",
  },
  ru: {
    intro: colors.inverse(
      `Привет! Я твой помощник по коммитам! ${colors.yellow(
        "Надеюсь, это поможет"
      )}`
    ),
    errorGit: colors.red(
      "Ошибка: Пожалуйста, проверьте, находитесь ли вы в репозитории Git!"
    ),
    checkIfConflict:
      "Вы проверили, не нужно ли сначала обновить репозиторий? Мы хотим избежать конфликтов...",
    filesToAdd:
      "Вы еще не добавили никаких файлов. Хотите добавить некоторые файлы?",
    commitType: "Выберите тип коммита:",
    commitText: "Введите текст коммита:",
    commitValidationEmpty: "Текст коммита не может быть пустым!",
    commitValidation50: "Текст коммита не может быть длиннее 50 символов!",
    breakingChangeQuestion:
      "Содержит ли этот коммит изменения, которые могут повлиять на совместимость с предыдущими версиями?",
    breakingChangeMessage:
      "Если да, вам следует создать коммит с типом 'Breaking Change'",
    lastConfirm: "Вы хотите создать коммит с сообщением ниже?",
    successMessage: "✔️ Коммит успешно создан",
    exitDefault: "Коммит не был создан.",
    exitNoFiles: "Нет файлов для коммита",
    exitNoCommitType: "Тип коммита не выбран",
    exitNoCommitMessage: "Сообщение коммита не завершено",
    confirmQuestion: "Подтвердить?",
    pushQuestion: "Вы хотите отправить изменения на следующую ветку?: ",
    successPush: "✔️ Успешно отправлено",
    finalMessage: "Спасибо, что использовали мой помощник по коммитам!",
  },
};
