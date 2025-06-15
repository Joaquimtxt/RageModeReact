import React, { useEffect, useState } from "react";

const Perfil = () => {
  const [posts, setPosts] = useState([]);
  const userEmail = localStorage.getItem("UserEmail");
  useEffect(() => {
    // Carregar posts do localStorage
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(storedPosts);
  }, []);

  return (
    <div className="container py-5 text-light">
      {/* Seção do Topo */}
      <div className="d-flex align-items-center mb-4">
        <img
          src={`https://ui-avatars.com/api/?name=${userEmail}`}
          alt="Imagem Perfil"
          className="rounded-circle border border-3 border-light me-4"
        />
        <div>
          <h3 className="mb-1">usuario_nome</h3>
          <p className="text-muted mb-1"></p>
          <div className="d-flex gap-4">
            <span>
              <strong>24</strong> posts
            </span>
            <span>
              <strong>3.2k</strong> seguidores
            </span>
            <span>
              <strong>180</strong> seguindo
            </span>
          </div>
          <button className="btn btn-outline-light btn-sm mt-2">
            Editar Perfil
          </button>
        </div>
      </div>

      <hr className="border-secondary" />

      {/* Grid de Postagens */}
      <div className="row g-3">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div className="col-4" key={index}>
              <div className="card bg-dark border-light shadow-sm">
                <img
                  src={post.image}
                  alt={`Post ${index + 1}`}
                  className="card-img-top rounded"
                />
                <div className="card-body">
                  <h5 className="card-title text-light">{post.title}</h5>
                  <p className="card-text text-muted">{post.description}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">Nenhum post disponível.</p>
        )}
      </div>
    </div>
  );


// ----------- Usar este código quando a api estiver com o ENDPOINT GetUsuarioLogado NO WEBSITE -----------------------
//  (
//     <div className="container py-5 text-light">
//       {/* Seção do Topo */}
//       <div className="d-flex align-items-center mb-4">
//         <img
//           src="https://placehold.co/120x120"
//           alt="Imagem Perfil"
//           className="rounded-circle border border-3 border-light me-4"
//         />
//         <div>
//           <h3 className="mb-1">{userInfo.usuarioNome}</h3>
//           <p className="text-muted mb-1"></p>
//           <div className="d-flex gap-4">
//             <span>
//               <strong>{userInfo.postCount}</strong> posts
//             </span>
//             <span>
//               <strong>{userInfo.followerCount}</strong> seguidores
//             </span>
//           </div>
//           <button className="btn btn-outline-light btn-sm mt-2">
//             Editar Perfil
//           </button>
//         </div>
//       </div>

//       <hr className="border-secondary" />

//       {/* Grid de Postagens */}
//       <div className="row g-3">
//         {posts.length > 0 ? (
//           posts.map((post, index) => (
//             <div className="col-4" key={index}>
//               <div className="card bg-dark border-light shadow-sm">
//                 <img
//                   src={post.image}
//                   alt={`Post ${index + 1}`}
//                   className="card-img-top rounded"
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title text-light">{post.title}</h5>
//                   <p className="card-text text-muted">{post.description}</p>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-center">Nenhum post disponível.</p>
//         )}
//       </div>
//     </div>
//   );

};

export default Perfil;
