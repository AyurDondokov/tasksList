
(function () {
    let todolist = document.querySelector('.todo-list');
    let addButton = todolist.querySelector('.task-list__add-button');

    let taskList = todolist.querySelector('task-list');
    let taskForm = todolist.querySelector('.task-form');
    let form = taskForm.querySelector('form')
    let closeButton = taskForm.querySelector('.task-form__close');

    let formAction = '';
    let formItem;

    let editAction = e => {
        let item = btn.closest('.task-list__item');
        let prio = item.querySelector('.task-list__prio');
        let desc = item.querySelector('.task-list__description');
        form.reset();
        form.description.value = desc.textContent;
        form.prio.checked = (prio.textContent !== '');
        taskForm.classList.add('shown');
        formAction = 'edit';
        formItem = item
    }

    form.addEventListener('submit', e => {
        e.preventDefault();
        switch (formAction){
            case 'create':
                // let item = document.createElement('li');
                let item = taskList.firstElementChild.cloneNode(true);
                item.querySelector('.task-list__done').checked = false;
                item.querySelector('.task-description').textContent = form.description.value;
                item.querySelector('.task-list__prio').textContent =
                    form.prio.checked ? '☻' : '';
                taskList.append(item);
                item.addEventListener('click', editAction);
                taskForm.classList.toggle('shown');
                form.reset();
                break;
            case 'edit':
                formItem.querySelector('.task-list__done').checked = false;
                formItem.querySelector('.task-description').textContent = form.description.value;
                formItem.querySelector('.task-list__prio').textContent =
                    form.prio.checked ? '☻' : '';
                taskList.append(item);
                item.addEventListener('click', editAction);
                taskForm.classList.toggle('shown');
                form.reset();
                break;

        }
    });

    addButton.addEventListener('click', e => {
        taskForm.classList.toggle('shown');
        formAction = 'create';
        form.reset();
        formItem = undefined;
    });

    closeButton.addEventListener('click', e => {
        taskForm.classList.remove('shown');
    });

    let editButton = todolist.querySelectorAll('.task-list__edit-button');
    editButton.forEach(btn => {
        btn.addEventListener('click', e => {
            let item = btn.closest('.task-list__item');
            let prio = item.querySelector('.task-list__prio');
            let desc = item.querySelector('.task-list__description');
            form.reset();
            form.description.value = desc.textContent;
            form.prio.checked = (prio.textContent !== '');
            taskForm.classList.add('shown');
            formAction = 'edit';
        });
    });

})();