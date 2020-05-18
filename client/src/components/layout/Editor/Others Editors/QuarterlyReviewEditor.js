import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const QuarterlyReviewEditor = () => {
  return (
    <div>
      <h4 className='text-primary text-center'>Quarterly Review</h4>
      <hr />
      <div className='p-2'>
        <h5 className='text-success pt-4'>Health</h5>
        <div className='border border-secondary rounded py-2 px-4'>
          <h6 className='text-info pb-2'>Mind</h6>
          <CKEditor
            editor={ClassicEditor}
            onInit={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log('Editor is ready to use!', editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ event, editor, data });
            }}
            onBlur={(event, editor) => {
              console.log('Blur.', editor);
            }}
            onFocus={(event, editor) => {
              console.log('Focus.', editor);
            }}
          />

          <h6 className='text-info py-2'>Body</h6>
          <CKEditor
            editor={ClassicEditor}
            onInit={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log('Editor is ready to use!', editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ event, editor, data });
            }}
            onBlur={(event, editor) => {
              console.log('Blur.', editor);
            }}
            onFocus={(event, editor) => {
              console.log('Focus.', editor);
            }}
          />
        </div>
        <br />
        <hr />

        <h5 className='text-success pt-4'>Wealth</h5>
        <div className='border border-secondary rounded py-2 px-4'>
          <h6 className='text-info pb-2'>Carrer</h6>
          <CKEditor
            editor={ClassicEditor}
            onInit={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log('Editor is ready to use!', editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ event, editor, data });
            }}
            onBlur={(event, editor) => {
              console.log('Blur.', editor);
            }}
            onFocus={(event, editor) => {
              console.log('Focus.', editor);
            }}
          />

          <h6 className='text-info py-2'>Business</h6>
          <CKEditor
            editor={ClassicEditor}
            onInit={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log('Editor is ready to use!', editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ event, editor, data });
            }}
            onBlur={(event, editor) => {
              console.log('Blur.', editor);
            }}
            onFocus={(event, editor) => {
              console.log('Focus.', editor);
            }}
          />
        </div>
        <br />
        <hr />

        <h5 className='text-success pt-4'>Social And Leisure</h5>
        <div className='border border-secondary rounded py-2 px-4'>
          <h6 className='text-info pb-2'>Game</h6>
          <CKEditor
            editor={ClassicEditor}
            onInit={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log('Editor is ready to use!', editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ event, editor, data });
            }}
            onBlur={(event, editor) => {
              console.log('Blur.', editor);
            }}
            onFocus={(event, editor) => {
              console.log('Focus.', editor);
            }}
          />

          <h6 className='text-info py-2'>Social</h6>
          <CKEditor
            editor={ClassicEditor}
            onInit={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log('Editor is ready to use!', editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ event, editor, data });
            }}
            onBlur={(event, editor) => {
              console.log('Blur.', editor);
            }}
            onFocus={(event, editor) => {
              console.log('Focus.', editor);
            }}
          />

          <h6 className='text-info py-2'>Hobbies</h6>
          <CKEditor
            editor={ClassicEditor}
            onInit={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log('Editor is ready to use!', editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ event, editor, data });
            }}
            onBlur={(event, editor) => {
              console.log('Blur.', editor);
            }}
            onFocus={(event, editor) => {
              console.log('Focus.', editor);
            }}
          />
        </div>

        <br />
        <hr />
        <h5 className='text-success pt-4'>Quarter Evaluation</h5>
        <div className='border border-secondary rounded pt-2 px-4'>
          <h6 className='text-info pb-2'>Goals Accomplished</h6>
          <CKEditor
            editor={ClassicEditor}
            onInit={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log('Editor is ready to use!', editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ event, editor, data });
            }}
            onBlur={(event, editor) => {
              console.log('Blur.', editor);
            }}
            onFocus={(event, editor) => {
              console.log('Focus.', editor);
            }}
          />

          <h6 className='text-info py-2'>Goals Missed</h6>
          <CKEditor
            editor={ClassicEditor}
            onInit={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log('Editor is ready to use!', editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ event, editor, data });
            }}
            onBlur={(event, editor) => {
              console.log('Blur.', editor);
            }}
            onFocus={(event, editor) => {
              console.log('Focus.', editor);
            }}
          />
        </div>

        <br />
        <hr />
        <h5 className='text-success pt-4'>Next Quarter</h5>
        <div className='border border-secondary rounded pt-2 px-4'>
          <h6 className='text-info pb-2'>Next Quarter Plan</h6>
          <CKEditor
            editor={ClassicEditor}
            onInit={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log('Editor is ready to use!', editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ event, editor, data });
            }}
            onBlur={(event, editor) => {
              console.log('Blur.', editor);
            }}
            onFocus={(event, editor) => {
              console.log('Focus.', editor);
            }}
          />

          <h6 className='text-info py-2'>Next Quarter Goals and Schedule</h6>
          <CKEditor
            editor={ClassicEditor}
            onInit={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log('Editor is ready to use!', editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ event, editor, data });
            }}
            onBlur={(event, editor) => {
              console.log('Blur.', editor);
            }}
            onFocus={(event, editor) => {
              console.log('Focus.', editor);
            }}
          />
        </div>
      </div>
      <div className='clearfix my-4'>
        <button className='float-right btn btn-primary w-25'>Save </button>
      </div>
    </div>
  );
};

export default QuarterlyReviewEditor;
