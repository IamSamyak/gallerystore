import React, { useState } from 'react';
import './FileUpload.css';

const FileUpload = () => {
  const [FILES, setFILES] = useState({});
  const [customerName, setCustomerName] = useState('');
  const [cost, setCost] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  const fileTempl = React.createRef();
  const imageTempl = React.createRef();
  const empty = React.createRef();

  const addFile = (target, file) => {
    const isImage = file.type.match('image.*');
    const objectURL = URL.createObjectURL(file);

    const clone = isImage
      ? imageTempl.current.content.cloneNode(true)
      : fileTempl.current.content.cloneNode(true);

    clone.querySelector('h1').textContent = file.name;
    clone.querySelector('li').id = objectURL;
    clone.querySelector('.file-upload-delete').dataset.target = objectURL;
    clone.querySelector('.file-upload-size').textContent =
      file.size > 1024
        ? file.size > 1048576
          ? Math.round(file.size / 1048576) + 'mb'
          : Math.round(file.size / 1024) + 'kb'
        : file.size + 'b';

    if (isImage) {
      Object.assign(clone.querySelector('img'), {
        src: objectURL,
        alt: file.name
      });
    }

    empty.current.classList.add('file-upload-hidden');
    target.prepend(clone);

    setFILES((prevFiles) => ({
      ...prevFiles,
      [objectURL]: file
    }));
  };

  const hasFiles = ({ dataTransfer: { types = [] } }) => types.indexOf('Files') > -1;

  let counter = 0;

  const dropHandler = (ev) => {
    ev.preventDefault();
    for (const file of ev.dataTransfer.files) {
      addFile(gallery.current, file);
      overlay.current.classList.remove('file-upload-draggedover');
      counter = 0;
    }
  };

  const dragEnterHandler = (e) => {
    e.preventDefault();
    if (!hasFiles(e)) {
      return;
    }
    ++counter && overlay.current.classList.add('file-upload-draggedover');
  };

  const dragLeaveHandler = (e) => {
    1 > --counter && overlay.current.classList.remove('file-upload-draggedover');
  };

  const dragOverHandler = (e) => {
    if (hasFiles(e)) {
      e.preventDefault();
    }
  };

  const gallery = React.createRef();
  const overlay = React.createRef();

  const handleDelete = (e) => {
    if (e.target.classList.contains('file-upload-delete')) {
      const ou = e.target.dataset.target;
      document.getElementById(ou).remove(ou);
      if (gallery.current.children.length === 1) {
        empty.current.classList.remove('file-upload-hidden');
      }
      setFILES((prevFiles) => {
        const newFiles = { ...prevFiles };
        delete newFiles[ou];
        return newFiles;
      });
    }
  };

  const handleSubmit = () => {
    alert(`Submitted Files:\n${JSON.stringify(FILES)}\nCustomer Name: ${customerName}\nCost: ${cost}\nLocation: ${location}\nDate: ${date}`);
    console.log(FILES);
  };

  const handleCancel = () => {
    while (gallery.current.children.length > 0) {
      gallery.current.lastChild.remove();
    }
    setFILES({});
    empty.current.classList.remove('file-upload-hidden');
    gallery.current.append(empty.current);
    setCustomerName('');
    setCost('');
    setLocation('');
    setDate('');
  };

  return (
    <div className="file-upload-bg-gray-500 file-upload-h-screen file-upload-w-screen file-upload-sm:px-8 file-upload-md:px-16 file-upload-sm:py-8">
      <main className="file-upload-container file-upload-mx-auto file-upload-max-w-screen-lg file-upload-h-full">
        <article
          aria-label="File Upload Modal"
          className="file-upload-relative file-upload-h-full file-upload-flex file-upload-flex-col file-upload-bg-white file-upload-shadow-xl file-upload-rounded-md"
          onDrop={dropHandler}
          onDragOver={dragOverHandler}
          onDragLeave={dragLeaveHandler}
          onDragEnter={dragEnterHandler}
        >
          <section className="file-upload-h-full file-upload-overflow-auto file-upload-p-8 file-upload-w-full file-upload-h-full file-upload-flex file-upload-flex-col">
          <header className="file-upload-form-container">
  <div className="file-upload-form-row">
    <div className="file-upload-form-input-group">
      <label htmlFor="customerName" className="file-upload-form-label">Customer Name</label>
      <input
        id="customerName"
        type="text"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        className="file-upload-form-input"
      />
    </div>
    <div className="file-upload-form-input-group">
      <label htmlFor="cost" className="file-upload-form-label">Cost</label>
      <input
        id="cost"
        type="number"
        value={cost}
        onChange={(e) => setCost(e.target.value)}
        className="file-upload-form-input"
      />
    </div>
  </div>

  <div className="file-upload-form-row">
    <div className="file-upload-form-input-group">
      <label htmlFor="location" className="file-upload-form-label">Location</label>
      <input
        id="location"
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="file-upload-form-input"
      />
    </div>
    <div className="file-upload-form-input-group">
      <label htmlFor="date" className="file-upload-form-label">Date</label>
      <input
        id="date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="file-upload-form-input"
      />
    </div>
  </div>
</header>


            <header className="file-upload-border-dashed file-upload-border-2 file-upload-border-gray-400 file-upload-py-12 file-upload-flex file-upload-flex-col file-upload-justify-center file-upload-items-center">
              <p className="file-upload-mb-3 file-upload-font-semibold file-upload-text-gray-900 file-upload-flex file-upload-flex-wrap file-upload-justify-center">
                <span>Drag and drop your</span>&nbsp;<span>files anywhere or</span>
              </p>
              <input id="hidden-input" type="file" multiple className="file-upload-hidden" />
              <button
                id="button"
                className="file-upload-mt-2 file-upload-rounded-sm file-upload-px-3 file-upload-py-1 file-upload-bg-gray-200 file-upload-hover:bg-gray-300 file-upload-focus:shadow-outline file-upload-focus:outline-none"
                onClick={() => document.getElementById('hidden-input').click()}
              >
                Upload a file
              </button>
            </header>

            <h1 className="file-upload-pt-8 file-upload-pb-3 file-upload-font-semibold file-upload-sm:text-lg file-upload-text-gray-900">To Upload</h1>

            <ul id="gallery" ref={gallery} className="file-upload-flex file-upload-flex-1 file-upload-flex-wrap file-upload--m-1" onClick={handleDelete}>
              <li id="empty" ref={empty} className="file-upload-h-full file-upload-w-full file-upload-text-center file-upload-flex file-upload-flex-col file-upload-items-center file-upload-justify-center">
                <img className="file-upload-mx-auto file-upload-w-32" src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png" alt="no data" />
                <span className="file-upload-text-small file-upload-text-gray-500">No files selected</span>
              </li>
            </ul>
          </section>

          <footer className="file-upload-flex file-upload-justify-end file-upload-px-8 file-upload-pb-8 file-upload-pt-4">
            <button id="submit" className="file-upload-rounded-sm file-upload-px-3 file-upload-py-1 file-upload-bg-blue-700 file-upload-hover:bg-blue-500 file-upload-text-white file-upload-focus:shadow-outline file-upload-focus:outline-none" onClick={handleSubmit}>
              Upload now
            </button>
            <button id="cancel" className="file-upload-ml-3 file-upload-rounded-sm file-upload-px-3 file-upload-py-1 file-upload-hover:bg-gray-300 file-upload-focus:shadow-outline file-upload-focus:outline-none" onClick={handleCancel}>
              Cancel
            </button>
          </footer>
        </article>
      </main>
    </div>
);
};

export default FileUpload;