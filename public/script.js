document.addEventListener('DOMContentLoaded', () => {
  const messageForm = document.getElementById('messageForm');
  const messageList = document.getElementById('messageList');
  const clearButton = document.getElementById('clearButton');

  // 加載留言
  const loadMessages = () => {
    fetch('/messages')
      .then(response => response.json())
      .then(messages => {
        messageList.innerHTML = '';
        messages.forEach(msg => {
          const li = document.createElement('li');
          li.innerHTML = `${msg.text} <span>${msg.timestamp}</span>`;
          messageList.appendChild(li);
        });
      });
  };

  // 提交留言
  messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(messageForm);
    fetch('/submit', {
      method: 'POST',
      body: JSON.stringify({ message: formData.get('message') }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(result => {
      if (result.success) {
        loadMessages();  // 重新加載留言
        messageForm.reset();  // 清空表單
      } else {
        alert(result.error);  // 顯示錯誤消息
      }
    });
  });

  // 清空留言
  clearButton.addEventListener('click', () => {
    fetch('/clear', { method: 'POST' })
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          loadMessages();  // 重新加載留言
        }
      });
  });

  // 初始化加載留言
  loadMessages();
});
