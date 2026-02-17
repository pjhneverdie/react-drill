import { useReducer, useMemo, createContext } from "react";

function todoReducer(state, action) {
    switch (action.type) {
        case "ADD_TODO":
            return { ...state, todos: [...state.todos, action.payload] };
        default:
            return state;
    }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();

function TodoProvider({ children }) {
    const [state, dispatch] = useReducer(todoReducer, { todos: [] });

    const memoizedState = useMemo(() => state, [state]);

    return (
        <TodoStateContext.Provider value={memoizedState}>
            <TodoDispatchContext.Provider value={dispatch}>
                {children}
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    );
}

function useTodoState() {
    const context = useContext(TodoStateContext);
    if (context === undefined) {
        throw new Error("Context must be used within a Provider");
    }
    return context;
}

function useTodoDispatch() {
    const context = useContext(TodoDispatchContext);
    if (context === undefined) {
        throw new Error("Context must be used within a Provider");
    }
    return context;
}