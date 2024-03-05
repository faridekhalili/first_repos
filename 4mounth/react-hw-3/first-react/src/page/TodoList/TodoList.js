import { useState, useRef } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import classes from './todolist.module.css';
import Modal from "../../components/Modal/Modal";
import List from "../../components/List/List";

const TodoList = () => {
    const [isShow, setIsShow] = useState(false);
    const newTitleRef = useRef(''); // Use useRef for newTitle
    const searchRef = useRef(''); // Use useRef for search
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
        newTitleRef.current.value = ''; // Clear the input after adding
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
        return list.filter(item => item.title.toLowerCase().includes(searchRef.current.value.toLowerCase())); // Use searchRef.current.value
    };
    const handleSearchs = searchs();

    const handleSearch = (event) => {
        searchRef.current.value = event.target.value; // Update searchRef.current.value
    };

    return (
        <div className={classes.wrapper}>
            <Button onClick={handleShow}>Добавить</Button>
            <Input
                placeholder={'search...'}
                onChange={handleSearch} // Updated to use handleSearch
                ref={searchRef} // Bind ref to Input for search
                name={'search'}
            />
            {isShow && (
                <Modal handleShow={handleShow}>
                    <p>{newTitleRef.current.value}</p> // Display value from newTitleRef
                    <Input placeholder={'Добавить'} ref={newTitleRef} name={'add'} /> // Bind ref to Input for newTitle
                    <Button onClick={handleAdd}>Добавить</Button>
                    <button onClick={handleShow}>Close</button>
                </Modal>
            )}
            <List list={list} handleDone={handleDone} deleteTodo={deleteTodo} handleSearchs={handleSearchs} />
        </div>
    );
};

export default TodoList;
