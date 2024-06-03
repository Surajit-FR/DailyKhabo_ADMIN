// API.interceptors.response.use(
//     (response) => new Promise((resolve, reject) => resolve(response)),
//     (error) => new Promise((resolve, reject) => {
//         if (error.response.status === 401 && !error.response.data.success && error.response.data.error === "jwt expired") {
//             reject("/admin/signin");
//         } else {
//             new Promise((resolve, reject) => reject(error));
//         };
//     })
// );

// if (err?.payload) {
// toast.error(error.response.data, {
//     duration: 4000,
//     style: {
//         background: "#000",
//         color: "#fff"
//     },
//     iconTheme: {
//         primary: "#f00",
//         secondary: "#fff"
//     }
// });
// };