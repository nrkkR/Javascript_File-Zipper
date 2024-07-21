document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.getElementById("file-input");
    const zipBtn = document.getElementById("zip-btn");
    const fileList = document.getElementById("file-list");
    const result = document.getElementById("result");

    let files = [];

    fileInput.addEventListener("change", (event) => {
        files = Array.from(event.target.files);
        displayFiles();
    });

    zipBtn.addEventListener("click", () => {
        if (files.length === 0) {
            alert("Please select files to zip");
            return;
        }

        const zip = new JSZip();
        files.forEach((file) => {
            zip.file(file.name, file);
        });

        zip.generateAsync({ type: "blob" }).then((content) => {
            const zipFileName = "files.zip";
            saveAs(content, zipFileName);
            result.textContent = `Successfully created ${zipFileName}`;
            result.style.display = "block";
        });
    });

    function displayFiles() {
        fileList.innerHTML = "";
        files.forEach((file) => {
            const fileItem = document.createElement("div");
            fileItem.textContent = file.name;
            fileList.appendChild(fileItem);
        });
    }
});
