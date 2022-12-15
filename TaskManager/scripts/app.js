
(function () {
    let todoList = document.querySelector('.todo-list');
    let addButton = todoList.querySelector('.task-list__add-button');

    let taskList = todoList.querySelector('.task-list');
    let taskForm = todoList.querySelector('.task-form');
    let form = taskForm.querySelector('form');
    let closeButton = taskForm.querySelector('.task-form__close');

    let formAction = 'create';
    let formItem;

    let editAction = e => {
        let btn = e.target;
        let item = btn.closest('.task-list__item');
        let prio = item.querySelector('.task-list__prio')
        let desc = item.querySelector('.task-list__description')
        form.reset();
        form.description.value = desc.textContent;
        form.prio.checked = (prio.textContent !== '');
        taskForm.classList.add('shown');
        formAction = 'edit';
        formItem = item;
    };

    let delAction = e => {
        let btn = e.target;
        let item = btn.closest('.task-list__item');
        item.remove();
    };

    form.addEventListener('submit', e => {
        e.preventDefault();
        switch (formAction){
            case 'create':
                //let item = document.createElement('li');
                let item = taskList.firstElementChild.cloneNode(true);
                item.style.display = '';
                item.querySelector('.task-list__done').checked = false;

                item.querySelector('.task-list__description').textContent = form.description.value;
                item.querySelector('.task-list__prio').textContent = form.prio.checked ? '!!!' : '';
                taskList.append(item);
                item.querySelector('.task-list__edit-button').addEventListener('click', editAction);
                item.querySelector('.task-list__del-button').addEventListener('click', delAction);
                taskForm.classList.toggle('shown');
                form.reset();
                break;
            case 'edit':
                formItem.querySelector('.task-list__done').checked = false;
                formItem.querySelector('.task-list__description').textContent = form.description.value;
                formItem.querySelector('.task-list__prio').textContent = form.prio.checked ? '!!!' : '';
                break;
        }
    })

    addButton.addEventListener('click', e => {
        formAction = 'create';
        form.reset();
        formItem = undefined;
    });

    closeButton.addEventListener('click', e => {
        taskForm.classList.remove('shown');
    });

    let editButtons = todoList.querySelectorAll('.task-list__edit-button');

    editButtons.forEach(btn => {
        btn.addEventListener('click', editAction);
    });

})();