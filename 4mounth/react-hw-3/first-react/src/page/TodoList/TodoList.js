import { useState, useRef } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import classes from './todolist.module.css';
import Modal from "../../components/Modal/Modal";
import List from "../../components/List/List";

const TodoList = () => {
    const [isShow, setIsShow] = useState(false);
    const newTitleRef = useRef(''); // Changed to useRef
    const [search, setSearch] = useState('');
    const [list, setList] = useState([
        { id: 1, title: 'coding', completed: false },
        { id: 2, title: 'eat', completed: false },
        { id: 3, title: 'sleep', completed: false }
    ]);

    const deleteTodo = (id) => {
        const newList = list.filter(todo => todo.id !== id);
        setList(newList);
    };

    const handleShow = () => setIsShow(!isShow);
    
    const handleAdd = () => {
        setList(prevList => [...prevList, { id: prevList.length + 1, title: newTitleRef.current.value, completed: false }]);
        newTitleRef.current.value = ''; // Clear the input
        handleShow();
    };

    const handleDone = (id) => {
        const newList = list.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        setList(newList);
    };

    const searchs = () => {
        return list.filter(item => item.title.toLowerCase().includes(search.toLowerCase()));
    };
    const handleSearchs = searchs();

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    return (
        <div className={classes.wrapper}>
            <Button onClick={handleShow}>Добавить</Button>
            <Input placeholder={'search...'} onChange={handleSearch} value={search} name={'search'} />
            {isShow && (
                <Modal handleShow={handleShow}>
                    <p>{newTitleRef.current.value}</p>
                    <Input placeholder={'Добавить'} ref={newTitleRef} name={'add'} /> {/* Updated to use ref */}
                    <Button onClick={handleAdd}>Добавить</Button>
                    <button onClick={handleShow}>Close</button>
                </Modal>
            )}
            <List list={list} handleDone={handleDone} deleteTodo={deleteTodo} handleSearchs={handleSearchs} />
        </div>
    );
};

export default TodoList;
