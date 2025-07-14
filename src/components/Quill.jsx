// src/components/BasicQuillEditor.jsx
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Quill = () => {
  const [value, setValue] = useState('');

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],         // formatting
      [{ list: 'ordered' }, { list: 'bullet' }], // lists
      ['link'],                                // links
      ['clean']                                // clear formatting
    ],
  };

  const formats = [
    'bold', 'italic', 'underline',
    'list', 'bullet',
    'link'
  ];

  return (
    <div className="max-w-2xl mx-auto p-4 border rounded shadow mt-6">
      <h2 className="text-lg font-semibold mb-2">Basic Rich Text Editor</h2>
      
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
        formats={formats}
        placeholder="Start writing here..."
      />

      <h3 className="mt-6 font-medium">Preview:</h3>
      <div className="mt-2 p-3 border bg-gray-100 rounded" dangerouslySetInnerHTML={{ __html: value }} />
    </div>
  );
};

export default Quill;
