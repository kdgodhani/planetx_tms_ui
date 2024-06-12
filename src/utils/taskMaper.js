export const mapData = (tasks, chef) => {
  const cards = tasks.map(
    ({
      id,
      debut,
      deadLine,
      etat,
      projet,
      responsable,
      titre,
      avancement,
      commentaires,
    }) => {
      return {
        id: `${id}`,
        title: titre,
        description: chef
          ? `assignée à : ${responsable.nom.toUpperCase()}`
          : `projet : ${projet.nom}`,
        label: `${deadLine.substring(0, 10)}`,
        draggable: true,
        debut,
        projet,
        avancement,
        commentaires,
        etat,
      };
    }
  );

  const enAttente = cards.filter((card) => card.etat == "En_ATTENTE");
  const enCours = cards.filter((card) => card.etat == "EN_COURS");
  const attenteValidation = cards.filter(
    (card) => card.etat == "ATTENTE_VALIDATION"
  );
  const validee = cards.filter((card) => card.etat == "VALIDEE");

  const taskData = {
    lanes: [
      {
        id: "1",
        title: "En attente",
        label: `${enAttente.length} taches`,
        cards: enAttente,
        style: { backgroundColor: "#d1d8e0" }, // Style of Lane
        //cardStyle: { backgroundColor: 'blue' }
        disallowAddingCard: true,
      },
      {
        id: "2",
        title: "En cours",
        label: `${enCours.length} taches`,
        cards: enCours,
        disallowAddingCard: true,
        style: { backgroundColor: "#74b9ff" },

        //cardStyle: { backgroundColor: 'blue' }
      },
      {
        id: "3",
        title: "attente validation",
        label: `${attenteValidation.length} taches`,
        cards: attenteValidation,
        style: { backgroundColor: "#81ecec" }, // Style of Lane
        disallowAddingCard: true,
        boxShadow: "2px 2px 4px 0px rgba(0,0,0,0.75)",
      },
      {
        id: "4",
        title: "achevées",
        label: `${validee.length} taches`,
        cards: validee,
        style: { backgroundColor: "#55efc4" },
        disallowAddingCard: true,
      },
    ],
  };
  return taskData;
};



// export const mapData = (tasks, manager) => {
//   const cards = tasks.map(
//     ({
//       id,
//       startDate,
//       deadline,
//       status,
//       project,
//       responsible,
//       title,
//       progress,
//       comments,
//     }) => {
//       return {
//         id: `${id}`,
//         title: title,
//         description: manager
//           ? `assigned to: ${responsible.name.toUpperCase()}`
//           : `project: ${project.name}`,
//         label: `${deadline.substring(0, 10)}`,
//         draggable: true,
//         startDate,
//         project,
//         progress,
//         comments,
//         status,
//       };
//     }
//   );

//   const pending = cards.filter((card) => card.status === "PENDING");
//   const inProgress = cards.filter((card) => card.status === "IN_PROGRESS");
//   const waitingForValidation = cards.filter(
//     (card) => card.status === "WAITING_FOR_VALIDATION"
//   );
//   const completed = cards.filter((card) => card.status === "COMPLETED");

//   const taskData = {
//     lanes: [
//       {
//         id: "1",
//         title: "Pending",
//         label: `${pending.length} tasks`,
//         cards: pending,
//         style: { backgroundColor: "#d1d8e0" }, // Style of Lane
//         disallowAddingCard: true,
//       },
//       {
//         id: "2",
//         title: "In Progress",
//         label: `${inProgress.length} tasks`,
//         cards: inProgress,
//         disallowAddingCard: true,
//         style: { backgroundColor: "#74b9ff" },
//       },
//       {
//         id: "3",
//         title: "Waiting for Validation",
//         label: `${waitingForValidation.length} tasks`,
//         cards: waitingForValidation,
//         style: { backgroundColor: "#81ecec" }, // Style of Lane
//         disallowAddingCard: true,
//       }
   
//     ]
//   }
//   return taskData;
// };
