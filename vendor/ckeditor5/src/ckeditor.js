/**
 * @license Copyright (c) 2014-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import WordCount from '@ckeditor/ckeditor5-word-count/src/wordcount';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Comments from '@ckeditor/ckeditor5-comments/src/comments';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation';
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight';

import ContextBase from '@ckeditor/ckeditor5-core/src/context';
import ContextWatchdog from '@ckeditor/ckeditor5-watchdog/src/contextwatchdog';
import CommentsRepository from '@ckeditor/ckeditor5-comments/src/comments/commentsrepository';
import WideSidebar from '@ckeditor/ckeditor5-comments/src/annotations/widesidebar';

import viewToPlainText from '@ckeditor/ckeditor5-clipboard/src/utils/viewtoplaintext';

class Context extends ContextBase {}

Context.builtinPlugins = [
  CommentsRepository, WideSidebar
];

class Editor extends ClassicEditor {}

// Plugins to include in the build.
Editor.builtinPlugins = [
  Bold,
  WordCount,
  Underline,
  Comments,
  Essentials,
  Heading,
  Italic,
  PasteFromOffice,
  TextTransformation,
  Highlight,
];

export default { Context, ContextWatchdog, Editor, viewToPlainText };
