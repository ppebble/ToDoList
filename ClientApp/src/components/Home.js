import React, { Component } from 'react';
import TodoListTemplate from './TodoListTemplate/TodoListTemplate';
import Form from './Form/Form';
import TodoItemList from './TodoItemList/TodoItemList';
import Palette from './Palette/Palette';

const colors = ['#343a40', '#f03e3e', '#12b886', '#228ae6']; //color 종류

export class Home extends Component {
  static displayName = Home.name;
  

  id = 1
  state = {
    input : '',
    todos: [
      { id : 0, text:'TESTTESTTESTTESTTESTTESTTESTTESTTESTTEST', checked: true},
    ], color: '#343a40'
  }
  handleChange = (e) => {
    this.setState({
      input: e.target.value //input의 다음 바뀔 값
    });
  }
  handleCreate = () => {
    const {input, todos, color} = this.state;
    this.setState({
      input : '', //1. input값 초기화
      todos: todos.concat({//concat을 이용하여 배열에 추가 :: React에선 push를 사용하면 안된다!
        id : this.id++,             //배열에 값이 추가되긴 하지만 가르키고 있는 배열이 똑같기 때문, concat은 새로운 배열을 생성하는 방법
        text: input,
        checked: false,
        color
      })
    });
  }

  handleKeyPress = (e) => {
    //눌러진 키가 Enter 면 HandleCreate 호출
    if(e.key ==='Enter'){
      this.handleCreate();
    }
  }
  handleToggle = (id) =>{
    const {todos} = this.state;

    //파라미터로 받은 id를 가지고 몇번째 아이템인지 찾는 구문
    const idx = todos.findIndex(todo => todo.id === id);
    const selected = todos[idx]; // 선택한 객체
    
    const nextTodos = [...todos];// 배열을 복사

    nextTodos[idx] = {
      ...selected,
      checked: !selected.checked
    };//기존의 값들을 복사하고 checked값을 덮어쓰기
    this.setState({
      todos: nextTodos
    });
  }
  handleRemove = (id) => {
    const {todos} = this.state;
    this.setState({
      todos: todos.filter(todo=>todo.id !== id)
    });
  }
  handleSelectColor = (color) =>{
    this.setState({
      color
    })
  }
  
  render () {
    const { input, todos, color } = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove,
      handleSelectColor
    } = this;
    return (
      <TodoListTemplate form={(
        <Form 
          value={input}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          onCreate={handleCreate}
          color={color}
        />
      )}
        palette={(
          <Palette colors={colors} selected={color} onSelect={handleSelectColor}/>
        )}>
        <TodoItemList todos={todos} onToggle={handleToggle} onRemove={handleRemove}/>
      </TodoListTemplate>
    );
  }
}
