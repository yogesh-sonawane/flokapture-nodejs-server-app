module.exports = [
    ["api/home/get-status", "home#getStatus", "get"],
    ["api/language-master/get-all-languages", "language-master#getAllLanguages", "get"],
    ["api/language-master/add-language", "language-master#addLanguage", "post"],
    ['api/language-master/find-by-id', "language-master#findById", "get"],
    ['api/file-reader/get-file-content', "file-content-reader#readFileContent", "get"]
];