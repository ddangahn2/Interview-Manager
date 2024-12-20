document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const usernameInput = document.getElementById('id');
    const passwordInput = document.querySelector('input[name="password"]');

    form.addEventListener('submit', function (e) {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (username === '' || password === '') {
            e.preventDefault();
            alert('아이디와 비밀번호를 모두 입력해주세요.');
            return;
        }

        e.preventDefault();
        const formData = new FormData(form);

        fetch('/login/signup', {
            method: 'POST',
            body: formData,
        }).then(response => {
            if (response.status === 201) {
                window.location.href = '/';
            } else {
                alert('회원가입에 실패했습니다. 다시 시도해주세요.');
            }
        }).catch(() => {
            alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        });
    });
});