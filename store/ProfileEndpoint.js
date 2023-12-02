import { api } from "../store/baseurl";

const profileApi = api.injectEndpoints({
    endpoints: builder => ({
        getProfileDetails: builder.mutation({
            query: (body) => ({
                url: 'user/profile/getData',
                method: 'POST',
                body
            }),
            invalidatesTags: ['NFTCollection']
        }),
     
        
        
      profileDetailsUpdate: builder.mutation({
        query: (formData) => ({
            // url: 'user/profile/update',  // FIXME: change routes
            url: 'user/updateProfile',
            method: 'POST',
            body: formData
        }),
        invalidatesTags: ['']
    }),

    
        // changePasswordUpdate: builder.mutation({
        //     query: (formData) => ({
        //         url: 'user/profile/changePassword',
        //         method: 'POST',
        //         body: formData
        //     }),
        //     invalidatesTags: ['NFTCollection']
        // }),
    })
})

export const { useGetProfileDetailsMutation, useProfileDetailsUpdateMutation, useChangePasswordUpdateMutation } = profileApi