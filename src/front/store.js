export const initialStore = () => {
  return {
    servicios_vet: [
      {
        servicio: "Paseos",
        description:
          "¡Que tu engreído conecte con su entorno! Un momento fuera de casa, acompañado de nuestro staff de paseadores permitirá que tu canino camine, olfatee y logre un adecuado desgaste físico y mental. Paseos de 1 hora, individuales o grupales (con un máximo de 3 caninos por turno).",
        image:
          "https://cdn-icons-png.freepik.com/256/7924/7924590.png?ga=GA1.1.1432144542.1742526992&semt=ais_hybrid",
      },
      {
        servicio: "Veterinaria",
        description:
          "Nuestros profesionales se encuentran capacitados para realizar todo tipo de cirugías generales, desde esterilizaciones, hasta extracción de tumores.",
        image:
          "https://cdn-icons-png.freepik.com/256/11008/11008496.png?ga=GA1.1.1432144542.1742526992&semt=ais_hybrid",
      },
      {
        servicio: "Peluquería",
        description:
          "Con nuestro servicio a domicilio, ya no tendrás que preocuparte por bañar a tu mascota. ¡NOSOTROS lo hacemos por ti! Contamos con personal profesional en el cuidado y manejo de mascotas, por lo que puedes estar tranquilo que tu mascota estará en buenas manos.",
        image:
          "https://cdn-icons-png.freepik.com/256/8672/8672697.png?ga=GA1.1.1432144542.1742526992&semt=ais_hybrid",
      },
    ],
    services_company: [],
    token: null || localStorage.getItem("token"),
    profile: null || localStorage.getItem("profile"),
    role: null,
    pets: [],
    profileCompany: null,
    person: [],
    appointments: [],
    statusAppointment: [],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_hello":
      return {
        ...store,
        message: action.payload,
      };

    case "add_task":
      const { id, color } = action.payload;

      return {
        ...store,
        todos: store.todos.map((todo) =>
          todo.id === id ? { ...todo, background: color } : todo
        ),
      };

    case "update_token":
      localStorage.setItem("token", action.payload);
      return {
        ...store,
        token: action.payload,
      };

    case "update_tokenCompany":
      localStorage.setItem("token", action.payload);
      return {
        ...store,
        token: action.payload,
      };

    case "update_profile":
      localStorage.setItem("profile", action.payload);
      return {
        ...store,
        profile: action.payload,
      };

    case "update_role":
      return {
        ...store,
        role: action.payload,
      };

    case "pet_info":
      return {
        ...store,
        pets: action.payload,
      };

    case "1pet_info":
      return {
        ...store,
        pet: action.payload, // Actualiza un solo pet
      };

    case "update_profileCompany":
      return {
        ...store,
        profileCompany: action.payload,
      };

    case "update_person":
      return {
        ...store,
        person: action.payload,
      };

    case "load_services":
      return {
        ...store,
        services_company: action.payload,
      };
    case "load_professionals":
      return {
        ...store,
        professionals: action.payload,
      };
    case "load_appointments":
      return {
        ...store,
        appointments: action.payload,
      };
    case "load_statusAppointment":
      return {
        ...store,
        statusAppointment: action.payload,
      };

    default:
      throw Error("Unknown action.");
  }
}
