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
        description:"¡Que tu engreído conecte con su entorno! Un momento fuera de casa, acompañado de nuestro staff de paseadores permitirá que tu canino camine, olfatee y logre un adecuado desgaste físico y mental. Paseos de 1 hora, individuales o grupales (con un máximo de 3 caninos por turno).",
        image: "https://cdn-icons-png.freepik.com/256/7924/7924590.png?ga=GA1.1.1432144542.1742526992&semt=ais_hybrid"
      },
      {
        servicio: "Veterinaria",
        description:"Nuestros profesionales se encuentran capacitados para realizar todo tipo de cirugías generales, desde esterilizaciones, hasta extracción de tumores.",
        image:"https://cdn-icons-png.freepik.com/256/11008/11008496.png?ga=GA1.1.1432144542.1742526992&semt=ais_hybrid"
      },
      {
        servicio: "Peluquería",
        description:"Con nuestro servicio a domicilio, ya no tendrás que preocuparte por bañar a tu mascota. ¡NOSOTROS lo hacemos por ti! Contamos con personal profesional en el cuidado y manejo de mascotas, por lo que puedes estar tranquilo que tu mascota estará en buenas manos.",
        image: "https://cdn-icons-png.freepik.com/256/8672/8672697.png?ga=GA1.1.1432144542.1742526992&semt=ais_hybrid"
      }
    ],
    services_company:[],
    token: null || localStorage.getItem('token'),
    profile: null,
    pets: [],
    profileCompany: null
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

      case 'update_tokenCompany':
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

    case 'pet_info':
      return {
        ...store,
        pets: action.payload
      };
      
      case '1pet_info':
      return {
        ...store,
        pet: action.payload // Actualiza un solo pet
      };

    case 'update_profileCompany':
      return {
        ...store,
        profileCompany: action.payload
      };

    case 'add_services':
      // const companyWithServices = store.company;
      // companyWithServices.post = [ action.payload, ...store.user.post];

      // return {
      //   ...store,
      //   services_company: [ action.payload, ...store.posts],
      //   user: companyWithServices
      // };

    default:
      throw Error('Unknown action.');
  }    
}
