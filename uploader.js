const SUPABASE_URL = "https://qoavukwvllqyqkcyzgos.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvYXZ1a3d2bGxxeXFrY3l6Z29zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4Mzk3MTgsImV4cCI6MjA1NjQxNTcxOH0.8yYt5GZEHBMiTW8AGWCvfzbk1iKNgffdD1J-elFyrew";  // Use a valid anon key
const BUCKET_NAME = "pdf-files";

const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

// ✅ Define deleteFile before calling it
async function deleteFile(fileName) {
    const { error } = await supabaseClient.storage.from(BUCKET_NAME).remove([fileName]);

    if (error) {
        console.error("Delete Failed:", error);
        alert("Delete Failed!");
    } else {
        console.log(`File ${fileName} deleted successfully.`);
        alert("File Deleted!");
        listFiles();  // Refresh the file list after deletion
    }
}


// ✅ Ensure listFiles() is properly defined
async function listFiles() {
    const { data, error } = await supabaseClient.storage.from(BUCKET_NAME).list();

    if (error) {
        console.error("Error listing files:", error);
        return;
    }

    console.log("Files Retrieved:", data);

    const fileList = document.getElementById("fileList");
    fileList.innerHTML = "";

    data.forEach(file => {
        const li = document.createElement("li");
        li.innerHTML = `${file.name} <button onclick="deleteFile('${file.name}')">Delete</button>`;
        fileList.appendChild(li);
    });
}

// ✅ Ensure uploadFile() uses correct supabaseClient
async function uploadFile() {
    const file = document.getElementById("fileInput").files[0];
    if (!file) return alert("Please select a file!");

    const { data, error } = await supabaseClient.storage.from(BUCKET_NAME).upload(file.name, file);

    if (error) {
        console.error("Upload Failed:", error);
        alert("Upload Failed! Check console.");
    } else {
        console.log("Upload Successful:", data);
        alert("Upload Successful!");
        listFiles();
    }
}

// ✅ Load files when page opens
listFiles();