document.addEventListener('DOMContentLoaded', function () {
    const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
        const [key, value] = cookie.split('=');
        acc[key] = value;
        return acc;
    }, {});

    const username = cookies['username'] || '알 수 없음'; // 쿠키에 username 없으면 기본값

    // div에 username 표시
    const usernameDiv = document.querySelector('#new-post-form > div');
    usernameDiv.textContent = `작성자: ${username}`;

    // 폼 제출 이벤트 처리
    const form = document.getElementById('new-post-form');
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // 기본 폼 동작 막기

        const content = document.getElementById('content').value.trim();

        if (!content) {
            alert('내용을 입력해주세요.');
            return;
        }

        fetch('/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: username,
                content: content
            }),
        }).then(response => {
            console.log(username, content);
            if (response.status === 201) {
                window.location.href = '/postboard.html'; // 성공 시 게시판으로 이동
            } else {
                alert('게시글 작성에 실패했습니다.');
            }
        }).catch(error => {
            console.error('Error:', error);
            alert('서버 오류가 발생했습니다.');
        });
    });
});