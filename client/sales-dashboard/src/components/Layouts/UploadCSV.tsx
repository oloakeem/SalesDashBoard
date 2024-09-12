import React, { useState, ChangeEvent } from "react";
import Papa from "papaparse";
import axios from "axios";

const FileUpload: React.FC = () => {
  // File state can be either File or null
  const [file, setFile] = useState<File | null>(null);

  // Handle file input change
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null; // Ensure file is either File or null
    setFile(file);
  };

  // Handle file upload
  const handleUpload = () => {
    if (file) {
      Papa.parse(file, {
        complete: async (result) => {
          try {
            await axios.post("http://localhost:4000/api/upload-csv", {
              data: result.data,
            });
            alert("File uploaded successfully");
          } catch (error) {
            console.error("Error uploading file:", error);
            alert("Error uploading file");
          }
        },
        header: true,
        skipEmptyLines: true,
      });
    } else {
      alert("Please select a file first");
    }
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload CSV</button>
    </div>
  );
};

export default FileUpload;
