// import styled from "@emotion/styled";
// import { useNavigate, useParams } from "react-router-dom";
// import useSWR from "swr";
// import { SearchDetailHeader } from "@/features/search/ui";
// import { useEffect } from "react";
// import { searchDetailPlaceQuery } from "@/features/search/services/searchDetailPlaceQuery";
// import SearchDetailInfo from "@/features/search/ui/detail/SearchDetailInfo";
// import ContactFavoritePanel from "@/features/search/ui/detail/ContactFavoritePanel";

// export default function SearchDetailPage() {
//   const navigate = useNavigate();

//   const { id } = useParams();

//   const { data, error } = useSWR(`/${id}`, searchDetailPlaceQuery, {
//     dedupingInterval: 1000 * 60 * 60, // 1시간
//   });

//   // 에러 예외 처리
//   useEffect(() => {
//     if (error) {
//       alert("An error occurred while fetching the data.");
//       navigate(-1);
//     }
//   }, [error]);

//   return (
//     <>
//       {data && (
//         <Container>
//           <SearchDetailHeader>{data.displayName.text}</SearchDetailHeader>
//           <SearchDetailInfo {...data} />
//           <ContactFavoritePanel tel={data.nationalPhoneNumber} />
//         </Container>
//       )}
//     </>
//   );
// }

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;
