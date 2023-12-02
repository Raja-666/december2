import {api} from "../store/baseurl";
 
const NeuroNFT = api.injectEndpoints({
    endpoints: (builder) => ({


      nftCreate: builder.mutation({
        query: (collData) => ({
          url: "/nft-collection/Createcollection",
          method: "POST",
          body: collData,
          formData:true
        }),
        invalidatesTags: ["NFTCollection"],
      }),


      SubmitKYC: builder.mutation({
        query: (NeuroNFT) => ({
          url: "submitKYC/submitKYC",
          method: "POST",
          body: NeuroNFT,
        }),
        invalidatesTags: ["NFTCollection"],
      }),

      

      collectionList: builder.mutation({
        query: (collData) => ({
          url: "/nft-collection/CollectionList",
          method: "POST",
          body: collData,
          formData:true
        }),
        invalidatesTags: ["NFTCollectionList"],
      }),
      
      createNFT: builder.mutation({
        query: (collData) => ({
          url: "/choosecollection/CreateNft",
          method: "POST",
          body: collData,
          formData:true
        }),
        invalidatesTags: ["NFTCollectionList"],
      }),

    })
  });
  // 
export const {useNftCreateMutation, useSubmitKYCMutation , useCollectionListMutation, useCreateNFTMutation  } = NeuroNFT;