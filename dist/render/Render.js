import $ from "../../_snowpack/pkg/jquery.js";
import {editNote} from "../index.js";
import {Converter} from "../../_snowpack/pkg/showdown.js";
let converter = new Converter({tables: true});
export const renderNotebook = (notebook) => {
  renderSectionList(notebook);
  renderChapterList(notebook);
  renderNotes(notebook);
};
export const renderSectionList = (notebook) => {
  let htmlString = "";
  notebook.content.forEach((x, i) => {
    htmlString += `<li id="sec-${i}" key="${i}">${x.title}</li>`;
  });
  $("#section-list").html(htmlString);
  $(`#sec-${notebook.currSec.index}`).addClass("active-section");
};
export const renderChapterList = (notebook) => {
  let htmlString = "";
  notebook.currSec.chapters.forEach((x, i) => {
    htmlString += `<li id="ch-${i}" key="${i}">${x.title}</li>`;
  });
  $("#chapter-list").html(htmlString);
  $(`#ch-${notebook.currChapt.index}`).addClass("active-chapter");
};
export const renderNotes = (notebook) => {
  let htmlString = "";
  let chapter = notebook.currChapt;
  chapter.notes.forEach((x, i) => {
    htmlString += `<li id="note-${i}" key="${i}">
                            <div class="note">
                                <div class="note-title">
                                    <div class="title">
                                        ${x.index}. ${x.title}
                                    </div>
                                        <div class="edit">
                                            <button class="note-edit" key="${i}"></button>
                                        </div>
                                    </div>
                                <hr />
                                <div class="note-content markdown view-mode" contenteditable="false">${converter.makeHtml(x.content)}</div>
                                <textarea cols="30" rows="10" class="note-editor"></textarea>
                            </div>
                        </li>`;
  });
  $("#canvas ul").html(htmlString);
  $(".note button").on("click", editNote);
};
