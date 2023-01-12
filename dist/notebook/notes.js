export const addSection = (notebook, title) => {
  let section = {
    index: notebook.size,
    title,
    chapters: new Array(),
    size: 0,
    currChapt: null
  };
  addChapter(section, "Chapter 1");
  notebook.content.push(section);
  notebook.size++;
  notebook.currSec = section;
  notebook.currChapt = section.currChapt;
};
export const addChapter = (section, title) => {
  let chapter = {
    index: section.size,
    title,
    notes: new Array(),
    size: 0
  };
  section.chapters.push(chapter);
  section.size++;
  section.currChapt = chapter;
};
export const addNote = (chapter, title, content) => {
  let note = {
    index: chapter.size,
    title,
    content
  };
  chapter.notes.push(note);
  chapter.size++;
};
export const createNotebook = (name) => {
  let notebook = {
    title: name,
    content: new Array(),
    currSec: null,
    currChapt: null,
    size: 0
  };
  addSection(notebook, "Section 1");
  return notebook;
};
