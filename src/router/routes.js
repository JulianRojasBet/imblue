import ListadoMascotas from "src/pages/ListadoMascotas.vue";
import RegistroMascota from "src/pages/RegistroMascota.vue";
import HistoriaMedica from "pages/HistoriaMedica.vue";
import MisMascotas from "src/pages/MisMascotas.vue";
import VerMascota from "src/pages/VerMascota.vue";
import FormularioAdopcion from "src/pages/FormularioAdopcion.vue";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", name: "ListadoMascotas", component: ListadoMascotas },
      {
        path: "registro-mascota",
        name: "RegistroMascota",
        component: RegistroMascota
      },
      {
        path: "historia-medica",
        name: "HistoriaMedica",
        component: HistoriaMedica
      },
      {
        path: "mis-mascotas",
        name: "MisMascotas",
        component: MisMascotas
      },
      {
        path: "ver-mascota/:id",
        name: "VerMascota",
        component: VerMascota
      },
      {
        path: "formulario-adopcion/:id",
        name: "FormularioAdopcion",
        component: FormularioAdopcion
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
