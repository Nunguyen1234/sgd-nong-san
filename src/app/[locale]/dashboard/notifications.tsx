// "use client";

// import React from "react";
// import { useNotifications } from "../../hook/useNotifications"; // hoặc đường dẫn đúng với dự án của bạn
// import { List, ListItem, Typography } from "@mui/material";

// export default function NotificationsPage() {
//   const { data: notifications = [], isLoading } = useNotifications();

//   if (isLoading) {
//     return <Typography>Đang tải thông báo...</Typography>;
//   }

//   return (
//     <div>
//       <Typography variant="h6">Tất cả thông báo</Typography>
//       {notifications.length === 0 ? (
//         <Typography>Không có thông báo nào.</Typography>
//       ) : (
//         <List>
//           {notifications.map((note) => (
//             <ListItem key={note.id}>{note.message}</ListItem>
//           ))}
//         </List>
//       )}
//     </div>
//   );
// }
