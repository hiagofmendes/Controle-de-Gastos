// exports.authenticateToken = async (req, res, next) => {
//     // Obtém o token do cabeçalho da requisição
//     const authHeader = req.headers["authorization"];
//     const token = authHeader && authHeader.split(" ")[1];
  
//     // Verifica se o token está presente
//     if (!token) {
//       return res
//         .status(401)
//         .json({ message: "Token de autenticação não fornecido" });
//     }
  
//     jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
//       if (err) {
//         return res
//           .status(403)
//           .json({ message: "Token de autenticação inválido" });
//       }
  
//       console.log("Token decodificado:", decodedToken);
//       req.user = { userId: decodedToken.userId };
//       console.log("req.user:", req.user);
  
//       next();
//     });
//   };
  
//   exports.authenticateTokenP = async (req, res, next) => {
//     try {
//       // Obtém o token do cabeçalho da requisição
//       const authHeader = req.headers["authorization"];
//       const token = authHeader && authHeader.split(" ")[1];
  
//       // Verifica se o token está presente
//       if (!token) {
//         return res
//           .status(401)
//           .json({ message: "Token de autenticação não fornecido" });
//       }
  
//       // Verifica se o token é válido
//       jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
//         if (err) {
//           return res
//             .status(403)
//             .json({ message: "Token de autenticação inválido" });
//         }
  
//         // Log para verificar os dados do token decodificado
//         console.log("Token decodificado:", decodedToken);
  
//         // Adiciona os dados do usuário extraídos do token ao objeto de requisição
//         req.user = { userId: decodedToken.userId };
  
//         // Log para verificar os dados do req.user
//         console.log("req.user:", req.user);
//         await exports.updateUserProfile(req, res, next);
  
//         // Chama next() para passar para a próxima função middleware
//         next();
//       });
//     } catch (error) {
//       return next(error);
//     }
//   };