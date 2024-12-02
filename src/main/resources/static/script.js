const videoPreview = document.getElementById('videoPreview');
const filePathInput = document.getElementById('filePath');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const recordingTime = document.getElementById('recordingTime');

let mediaRecorder;
let recordedChunks = [];
let recordingInterval;
let recordingDuration = 0;

// Access the user's camera and preview the video
async function initCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        videoPreview.srcObject = stream;
        return stream;
    } catch (error) {
        alert('Error accessing camera: ' + error.message);
        throw error;
    }
}

// Start recording the video
async function startRecording() {
    const stream = await initCamera();
    mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm; codecs=vp8',
    });

    // Capture data chunks
    mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
            recordedChunks.push(event.data);
        }
    };

    // Handle the stop event
    mediaRecorder.onstop = saveRecording;

    mediaRecorder.start();
    recordingDuration = 0;
    recordingTime.textContent = 'Recording Time: 0 seconds';

    // Update the recording time every second
    recordingInterval = setInterval(() => {
        recordingDuration++;
        recordingTime.textContent = `Recording Time: ${recordingDuration} seconds`;
    }, 1000);

    startBtn.disabled = true;
    stopBtn.disabled = false;
}

// Stop the recording
function stopRecording() {
    mediaRecorder.stop();
    clearInterval(recordingInterval);

    startBtn.disabled = false;
    stopBtn.disabled = true;
}

// Save the recording as an MP4 file
function saveRecording() {
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);

    // Automatically save the file locally
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;

    const fileName = `${filePathInput.value || 'recording'}.webm`;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();

    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        alert(`Video saved as ${fileName}`);
    }, 100);

    // 전송 후 서버로 업로드
    uploadToServer(blob);

    recordedChunks = []; // Clear recorded data
}

async function uploadToServer(blob) {
    const formData = new FormData();
    formData.append('video', blob, 'recording.mp4'); // 동영상 데이터를 'video' 필드로 첨부

    try {
        const response = await fetch('http://localhost:8080/upload', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            alert('Video successfully uploaded to the server!');
        } else {
            alert('Failed to upload video to the server.');
        }
    } catch (error) {
        console.error('Error uploading video:', error);
        alert('An error occurred while uploading the video.');
    }
}



// Event Listeners
startBtn.addEventListener('click', startRecording);
stopBtn.addEventListener('click', stopRecording);
