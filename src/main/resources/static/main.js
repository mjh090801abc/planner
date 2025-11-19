const calendarGrid = document.getElementById('calendarGrid');
const todoList = document.getElementById('todoList');
const todayList = document.getElementById('todayList');
const addTodoBtn = document.getElementById('addTodoBtn');
const todoForm = document.getElementById('todoForm');

const today = new Date();
const currentMonth = today.getMonth();
const currentYear = today.getFullYear();
let selectedDate = `${currentYear}-${currentMonth+1}-${today.getDate()}`;
let todos = []; // Spring 연결 예정

function generateCalendar(month, year) {
    calendarGrid.innerHTML = '';
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
        const dateDiv = document.createElement('div');
        dateDiv.textContent = day;

        // 오늘 날짜 강조
        if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            dateDiv.classList.add('today');
        }

        dateDiv.addEventListener('click', () => {
            document.querySelectorAll('#calendarGrid div').forEach(d => d.classList.remove('selected'));
            dateDiv.classList.add('selected');
            selectedDate = `${year}-${month+1}-${day}`;
            showTodosByDate(selectedDate);
        });

        calendarGrid.appendChild(dateDiv);
    }
}

// 일정 표시
function showTodosByDate(dateStr) {
    todoList.innerHTML = '';
    todayList.innerHTML = '';

    todos.filter(t => t.dueDate.startsWith(dateStr))
        .forEach(todo => {
            const card = document.createElement('div');
            card.className = 'todo-card';
            if (todo.completed) card.classList.add('completed');
            card.innerHTML = `
                 <div>
                     <h3>${todo.title}</h3>
                     <p>${todo.description}</p>
                     <span class="due-date">${todo.dueDate}</span>
                 </div>
                 <div>
                     <button class="complete-btn">${todo.completed ? '취소' : '완료'}</button>
                     <button class="delete-btn">삭제</button>
                 </div>
             `;
            card.querySelector('.complete-btn').onclick = () => {
                todo.completed = !todo.completed;
                showTodosByDate(dateStr);
            };
            card.querySelector('.delete-btn').onclick = () => {
                todos = todos.filter(t => t !== todo);
                showTodosByDate(dateStr);
            };
            todoList.appendChild(card);

            // 오늘 일정 요약에도 표시
            if (dateStr === `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`) {
                const summary = document.createElement('div');
                summary.textContent = `• ${todo.title}`;
                todayList.appendChild(summary);
            }
        });
}

// 초기 캘린더
generateCalendar(currentMonth, currentYear);
showTodosByDate(selectedDate);

// 일정 추가 폼 슬라이드
addTodoBtn.onclick = () => {
    todoForm.classList.toggle('hidden');
};
