document.addEventListener('DOMContentLoaded', function () {
    const postListContainer = document.getElementById('post-list');

    const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
        const [key, value] = cookie.split('=');
        acc[key] = value;
        return acc;
    }, {});
    const userName = cookies['username'] || '알 수 없음';

    fetch('/post')
        .then(response => {
            if (!response.ok) {
                throw new Error('게시글을 가져오는 데 실패했습니다.');
            }
            return response.json();
        })
        .then(posts => {
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.className = 'post';
                postElement.innerHTML = `
                    <div class="user">${post.userName}</div>
                    <div class="content">${post.content}</div>
                    <div class="actions">
                        <button class="edit-button">수정</button>
                        <button class="delete-button">삭제</button>
                    </div>
                `;

                postElement.querySelector('.delete-button').addEventListener('click', function () {
                    if (confirm('이 게시글을 삭제하시겠습니까?')) {
                        fetch(`/post/${post.id}`, {
                            method: 'DELETE',
                            body: JSON.stringify({ userName: userName }),
                        }).then(response => {
                            if (response.ok) {
                                alert('게시글이 삭제되었습니다.');
                                postElement.remove(); // 게시글 삭제
                            } else {
                                alert('게시글 삭제에 실패했습니다.');
                            }
                        }).catch(error => {
                            console.error('Error:', error);
                        });
                    }
                });

                // 수정 버튼 동작
                postElement.querySelector('.edit-button').addEventListener('click', function () {
                    const newContent = prompt('새로운 내용을 입력하세요:', post.content);
                    if (newContent !== null) {
                        fetch(`/post/${post.id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                content: newContent,
                                userName: userName
                            }),
                        }).then(response => {
                            if (response.ok) {
                                alert('게시글이 수정되었습니다.');
                                postElement.querySelector('.content').textContent = newContent;
                            } else {
                                alert('게시글 수정에 실패했습니다.');
                            }
                        }).catch(error => {
                            console.error('Error:', error);
                        });
                    }
                });
                postListContainer.appendChild(postElement);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('게시글을 불러오는 중 문제가 발생했습니다.');
        });

    const writeButton = document.getElementById('write-button');
    writeButton.addEventListener('click', function () {
        window.location.href = '/post.html';
    });
});