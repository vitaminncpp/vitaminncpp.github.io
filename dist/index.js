import $ from "../_snowpack/pkg/jquery.js";
import {Converter} from "../_snowpack/pkg/showdown.js";
import {addChapter, addNote, addSection, createNotebook} from "./notebook/notes.js";
import {renderChapterList, renderNotebook, renderNotes} from "./render/Render.js";
import {eraseCookie, getCookie, setCookie} from "./util/util.js";
import {marked} from "../_snowpack/pkg/marked.js";
const converter = new Converter({tables: true});
var notebook = createNotebook("New Notebook");
console.log("hello");
$(".btn-preview").on("click", (event) => {
  parent = event.target.parentElement.id;
  let contentSelection = `#${parent} > .markdown-input > textarea`;
  let content = $(contentSelection).val().toString();
  let previewSelection = `#${parent} > .markdown-preview`;
  let preview = marked(content);
  $(previewSelection).html(preview);
});
const onSectionClick = (event) => {
  $(`#sec-${notebook.currSec.index}`).removeClass("active-section");
  notebook.currSec = notebook.content[event.target.getAttribute("key")];
  $(`#sec-${notebook.currSec.index}`).addClass("active-section");
  notebook.currChapt = notebook.currSec.currChapt;
  renderNotebook(notebook);
  $(".section-list li").on("click", onSectionClick);
  $(".chapter-list li").on("click", onChapterClick);
};
const onChapterClick = (event) => {
  $(`#ch-${notebook.currChapt.index}`).removeClass("active-chapter");
  notebook.currChapt = notebook.currSec.chapters[event.target.getAttribute("key")];
  notebook.currSec.currChapt = notebook.currChapt;
  $(`#ch-${notebook.currChapt.index}`).addClass("active-chapter");
  renderChapterList(notebook);
  renderNotes(notebook);
  $(".chapter-list li").on("click", onChapterClick);
};
export const editNote = (event) => {
  let key = event.target.getAttribute("key");
  let contentBody = $(`li#note-${key} .note-content`);
  let editor = $(`li#note-${key} textarea.note-editor`);
  let editMode = contentBody.attr("contenteditable");
  if (editMode == "true") {
    contentBody.attr("contenteditable", "false");
    contentBody.removeClass("edit-mode");
    contentBody.addClass("view-mode");
    event.target.style.backgroundImage = `url('./../assets/edit-icon.svg')`;
    notebook.currChapt.notes[key].content = editor.val().toString();
    contentBody.html(converter.makeHtml(notebook.currChapt.notes[key].content));
    editor.css({display: "none"});
    contentBody.css({display: "block"});
  } else if (editMode == "false") {
    event.target.style.backgroundImage = `url('./../assets/check-mark.png')`;
    contentBody.attr("contenteditable", "true");
    contentBody.removeClass("view-mode");
    contentBody.addClass("edit-mode");
    editor.val(notebook.currChapt.notes[key].content);
    contentBody.css({display: "none"});
    editor.css({display: "block"});
  }
};
const init = () => {
  $("#btn-save").on("click", (event) => {
    setCookie("notebook", JSON.stringify(notebook), 1);
    renderNotebook(notebook);
    $(".section-list li").on("click", onSectionClick);
    $(".chapter-list li").on("click", onChapterClick);
  });
  $("#btn-load").on("click", (event) => {
    notebook = JSON.parse(getCookie("notebook"));
    if (notebook == null) {
      notebook = createNotebook("Default Notebook");
    }
    renderNotebook(notebook);
    $(".section-list li").on("click", onSectionClick);
    $(".chapter-list li").on("click", onChapterClick);
  });
  $("#btn-delete").on("click", (event) => {
    eraseCookie("notebook");
    notebook = createNotebook("New Notebook");
    renderNotebook(notebook);
    $(".section-list li").on("click", onSectionClick);
    $(".chapter-list li").on("click", onChapterClick);
  });
  $("#btn-add-section").on("click", (event) => {
    addSection(notebook, `Section ${notebook.size + 1}`);
    renderNotebook(notebook);
    $(".section-list li").on("click", onSectionClick);
    $(".chapter-list li").on("click", onChapterClick);
  });
  $("#btn-add-chapter").on("click", (event) => {
    addChapter(notebook.currSec, `Chapter ${notebook.currSec.size + 1}`);
    notebook.currChapt = notebook.currSec.currChapt;
    renderChapterList(notebook);
    renderNotes(notebook);
    $(".chapter-list li").on("click", onChapterClick);
  });
  $("#btn-add-note").on("click", (event) => {
    addNote(notebook.currChapt, "Note Title", "Note Content");
    renderNotes(notebook);
  });
  $("#btn-load").trigger("click");
  $("#btn-go").on("click", (event) => {
    $("#dummy").html($("#xss").val().toString());
  });
};
init();
