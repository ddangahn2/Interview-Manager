const videoPreview = document.getElementById('videoPreview');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const recordingTime = document.getElementById('recordingTime');

let mediaRecorder;
let recordedChunks = [];
let recordingInterval;
let recordingDuration = 0;

const mediaStreamConstraints = {
    video: true,
    audio: true,
};

const mimeType = 'video/webm; codecs=vp8';

// 녹화시간 업데이트 함수
function updateRecordingTime() {
    recordingDuration = 0;
    recordingTime.textContent = '녹화시간: 0초';

    recordingInterval = setInterval(() => {
        recordingDuration++;
        recordingTime.textContent = `녹화시간: ${recordingDuration}초`;
    }, 1000);
}

// 파일 이름 생성
function generateFileName(prefix = 'recording', extension = 'webm') {
    const now = new Date();
    const timestamp = `${now.getFullYear()}-${(now.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}_${now
        .getHours()
        .toString()
        .padStart(2, '0')}-${now.getMinutes().toString().padStart(2, '0')}-${now
        .getSeconds()
        .toString()
        .padStart(2, '0')}`;
    return `${prefix}_${timestamp}.${extension}`;
}

// 브라우저 카메라, 오디오 권한 설정
async function initCameraAudio() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia(mediaStreamConstraints);
        videoPreview.srcObject = stream;
        return stream;
    } catch (error) {
        alert('카메라와 오디오를 켜주세요.' + error.message);
        throw error;
    }
}

// 녹화 시작
async function startRecording() {
    const stream = await initCameraAudio();

    if (!MediaRecorder.isTypeSupported(mimeType)) {
        alert('WebM 형식이 이 브라우저에서 지원되지 않습니다.');
    }

    mediaRecorder = new MediaRecorder(stream, {mimeType : mimeType});

    // 전달받는 데이터를 처리하는 이벤트 핸들러
    mediaRecorder.ondataavailable = (event) => {
        console.log('Data size:', event.data.size);
        if (event.data.size > 0) {
            recordedChunks.push(event.data);
        }
    };

    // 녹화 종료 후 저장 이벤트 핸들러
    mediaRecorder.onstop = saveRecording;

    // 녹화 시작
    mediaRecorder.start();

    // 녹화 시간 업데이트
    updateRecordingTime();

    // 버튼 상태 업데이트
    startBtn.disabled = true;
    stopBtn.disabled = false;
}

// 녹화 저장
function saveRecording() {
    // recordedChunks 배열을 Blob으로 병합
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    recordedChunks = [];

    // 파일 이름 생성
    const fileName = generateFileName();

    // Blob 객체를 URL로 변환
    const url = URL.createObjectURL(blob);

    // 다운로드 링크 생성
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = fileName;
    downloadLink.textContent = '영상 다운로드';
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // 서버로 전송
    // uploadToServer(blob);

    downloadLink.onclick = () => {
        URL.revokeObjectURL(url);
    };
}

// 녹화 종료
function stopRecording() {
    mediaRecorder.stop();
    clearInterval(recordingInterval);

    startBtn.disabled = false;
    stopBtn.disabled = true;
}

// 페이지 로드 후 자동으로 카메라 연결
window.onload = initCameraAudio;

// 버튼 이벤트
startBtn.addEventListener('click', startRecording);
stopBtn.addEventListener('click', stopRecording);