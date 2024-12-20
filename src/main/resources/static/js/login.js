document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(form);

        fetch('/login/signin', {
            method: 'POST',
            body: formData,
        }).then(response => {
            if (response.status === 200) {
                window.location.href = '/postboard.html';
            } else {
                alert('로그인에 실패했습니다. 다시 시도해주세요.');
            }
        }).catch(() => {
            alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        })
    })
})