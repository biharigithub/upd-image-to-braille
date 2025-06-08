function ImageUpload({ onImageSelect, selectedLanguage, isProcessing }) {
    try {
        const [dragOver, setDragOver] = React.useState(false);
        const [selectedFile, setSelectedFile] = React.useState(null);
        const [imagePreview, setImagePreview] = React.useState(null);
        const fileInputRef = React.useRef(null);

        const handleDragOver = (e) => {
            e.preventDefault();
            setDragOver(true);
        };

        const handleDragLeave = (e) => {
            e.preventDefault();
            setDragOver(false);
        };

        const handleDrop = (e) => {
            e.preventDefault();
            setDragOver(false);
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleFileSelect(files[0]);
            }
        };

        const handleFileSelect = (file) => {
            if (file && file.type.startsWith('image/')) {
                setSelectedFile(file);
                
                // Create image preview
                const reader = new FileReader();
                reader.onload = (e) => {
                    setImagePreview(e.target.result);
                };
                reader.readAsDataURL(file);
            }
        };

        const handleFileInputChange = (e) => {
            const file = e.target.files[0];
            if (file) {
                handleFileSelect(file);
            }
        };

        const processImage = () => {
            if (selectedFile) {
                onImageSelect(selectedFile);
            }
        };

        return (
            <div data-name="image-upload" data-file="components/ImageUpload.js" className="bg-dark-card rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-200">Upload Image</h2>
                <p className="text-gray-400 mb-6">
                    Select an image containing {selectedLanguage === 'eng' ? 'English' : 'Hindi'} text
                </p>
                
                <div
                    className={`upload-area p-8 rounded-lg text-center cursor-pointer ${dragOver ? 'dragover' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileInputChange}
                        className="hidden"
                        disabled={isProcessing}
                    />
                    
                    {imagePreview ? (
                        <div className="space-y-4">
                            <img 
                                src={imagePreview} 
                                alt="Preview" 
                                className="max-w-full max-h-48 mx-auto rounded-lg border border-gray-600"
                            />
                            <p className="text-lg font-medium text-green-400">Image Preview</p>
                            <p className="text-gray-400">{selectedFile.name}</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <i className="fas fa-cloud-upload-alt text-4xl text-gray-400"></i>
                            <p className="text-lg font-medium text-gray-300">Choose File or Drag & Drop</p>
                            <p className="text-gray-500">PNG, JPG, JPEG files supported</p>
                        </div>
                    )}
                </div>

                {selectedFile && (
                    <button
                        onClick={processImage}
                        disabled={isProcessing}
                        className="w-full mt-6 btn-primary text-white font-medium py-3 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                        {isProcessing ? (
                            <React.Fragment>
                                <i className="fas fa-spinner loading-spinner"></i>
                                <span>Extracting Text...</span>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <i className="fas fa-magic"></i>
                                <span>Extract Text & Convert to Braille</span>
                            </React.Fragment>
                        )}
                    </button>
                )}
            </div>
        );
    } catch (error) {
        console.error('ImageUpload component error:', error);
        reportError(error);
    }
}
