import { useState } from 'react';
import './App.css'

// 기본 상태관리
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>현재 카운트: {count}</h2>
      <button onClick={() => setCount((pre) => pre + 1)}> </button>
      <List />
      <CartItem />
      <ToDos />
    </div>
  );
}

// 리스트 그리기
function List() {
  const items = ['사과', '체리', '고구마'];

  const [isSelected, setSelected] = useState(null);

  return (
    <ul>
      {items.map((item, index) => {
        return <li key={index}
          onClick={() => setSelected(item)}
          style={{
            cursor: "pointer",
            fontWeight: isSelected == item ? "bold" : "normal"
          }}
        >
          {item}
        </li>
      })}
    </ul>
  );
}

// 오브젝트 상태관리
function CartItem() {
  const [item, setItem] = useState({ id: 1, name: "껌", price: 500, quantity: 0 });

  return (
    <div>
      <h1>{item.name} (수량: {item.quantity})</h1>

      <button onClick={() => setItem((pre) => {
        return {
          ...pre,
          quantity: pre.quantity + 1
        }
      })}>
        담기
      </button>
    </div>
  );

}

// 리스트 상태관리
function ToDos() {
  const [todos, setTodos] = useState(["운동하기"]);

  return (
    <div>
      <ul>
        {todos.map((index, todo) => {
          return <li key={index}>
            <h4>{todo}</h4>
          </li>

        })}
      </ul>
      <button onClick={() => {
        setTodos([...todos, "dd"])
      }}></button>
      <button onClick={() => {
        setTodos(todos.filter((_, i) => i !== todos.length - 1));
      }}></button>
    </div>

  );


}



function App() {
  return (<Counter></Counter>);
}

export default App
