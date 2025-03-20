export const initialStore=()=>{
  return{
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ],
    servicios_vet:[
      {
        servicio: "Paseos",
      },
      {
        servicio: "Veterinaria"
      },
      {
        servicio: "Peluquería"
      }
    ],
    token: null || localStorage.getItem('token'),
    profile: null
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'set_hello':
      return {
        ...store,
        message: action.payload
      };
      
    case 'add_task':

      const { id,  color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };

    case 'update_token':
      localStorage.setItem("token", action.payload);
      return {
        ...store,
        token: action.payload
      };

    case 'update_profile':
      return {
        ...store,
        profile: action.payload
      };

    default:
      throw Error('Unknown action.');
  }    
}
