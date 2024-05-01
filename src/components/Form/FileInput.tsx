import { useState } from "react";

const API_ENDPOINT_BASE =
    "https://l1i67jz379.execute-api.us-west-1.amazonaws.com/dev";
const BUCKET_NAME = "file-storage-fovus";

const FileInput = () => {
    const [file, setFile] = useState<File | null>(null);
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

    return (
        <>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
                Upload file
            </label>
            <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600"
                id="file-input"
                type="file"
                onChange={onFileChange}
            />
            <button
                type="button"
                className="mt-2 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
                onClick={uploadFile}
                disabled={!file}
            >
                Upload to S3
            </button>
            {uploadURL && (
                <p>
                    File uploaded:{" "}
                    <a
                        href={uploadURL}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View File
                    </a>
                </p>
            )}
        </>
    );
};
export default FileInput;
