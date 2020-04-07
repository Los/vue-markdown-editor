const fs = require('fs-extra');
const path = require('path');
const packageJson = require('../package.json');

const version = process.env.VERSION || packageJson.version;
const tips = '// This file is auto generated by build/build-entry.js';

function buildEntry() {
  const content = `${tips}
import MarkdownEditor from './base-editor.vue';
import markdownItInstance from '@/utils/markdown-it';
import hljs from '@/utils/highlightjs';
import '@/assets/css/font';

const version = '${version}';

const install = (Vue) => {
  Vue.component(MarkdownEditor.name, MarkdownEditor);
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

MarkdownEditor.version = version;
MarkdownEditor.install = install;
MarkdownEditor.markdownIt = markdownItInstance;
MarkdownEditor.hljs = hljs;

export default MarkdownEditor;
`;

  fs.writeFileSync(path.join(__dirname, '../src/index.js'), content);
}

buildEntry();
