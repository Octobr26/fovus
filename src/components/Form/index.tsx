import { useState } from "react";
import { nanoid } from "nanoid";

const API_ENDPOINT_BASE =
    "https://62kanni3vi.execute-api.us-west-1.amazonaws.com/dev";
const BUCKET_NAME = "storage-fovus";
const STORE_FORM_DATA_API_ENDPOINT = `${API_ENDPOINT_BASE}/store-form-data`;

const Form = () => {
    const [file, setFile] = useState<File | null>(null);
    const [text, setText] = useState<string>("");
    const [uploadURL, setUploadURL] = useState<string>("");

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (!files || files.length === 0) {
            alert("No file selected.");
            return;
        }
        const selectedFile = files[0];
        if (selectedFile.type !== "text/plain") {
            alert("Only .txt files are allowed!");
            return;
        }
        setFile(selectedFile);
    };

    const handleSubmission = async () => {
        if (file) {
            await uploadFile();
        }
        if (text) {
            await submitForm();
        }
    };

    const uploadFile = async () => {
        if (!file) {
            alert("No file selected or file type is incorrect.");
            return;
        }

        const filename = encodeURIComponent(file.name);
        const url = `${API_ENDPOINT_BASE}/${BUCKET_NAME}/${filename}`;

        try {
            // Upload file
            const result = await fetch(url, {
                method: "PUT",
                body: file,
                headers: {
                    "Content-Type": "text/plain"
                }
            });

            if (result.ok) {
                console.log("File uploaded successfully!");
                setUploadURL(url.split("?")[0]);
            } else {
                throw new Error("Failed to upload file.");
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                alert("Error uploading file: " + error.message);
            }
        }
    };

    const submitForm = async () => {
        const nanoID = nanoid(3); // generate nano ID
        try {
            const response = await fetch(STORE_FORM_DATA_API_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ textInput: text, id: nanoID }) // Include the Nano ID in the submission
            });
            if (response.ok) {
                console.log("Text submitted successfully with ID");
            } else {
                throw new Error("Failed to submit text.");
            }
        } catch (error) {
            if (error instanceof Error) {
                alert("Error submitting text: " + error.message);
            }
        }
    };

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-xs">
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="mb-4">
                        <label
                            htmlFor="text-input"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 text-left"
                        >
                            Your Text
                        </label>
                        <input
                            type="text"
                            id="text-input"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Enter text"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
                            Upload file
                        </label>
                        <input
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600"
                            id="file-input"
                            type="file"
                            onChange={onFileChange}
                            required
                        />
                    </div>
                    <button
                        type="button"
                        className="py-3 px-5 text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        onClick={handleSubmission}
                        disabled={!file && !text}
                    >
                        Submit All
                    </button>
                </form>

                {uploadURL && <p className="pt-3">File uploaded!</p>}
            </div>
        </section>
    );
};

export default Form;
